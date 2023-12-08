const axios = require("axios");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const { Duration } = require("luxon");

dotenv.config();

const transformRawVideos = (videos) => {
  const result = {};

  videos["total-synthesis"].forEach((video) => {
    result[video.videoId] = {
      episodeNumber: video.episodeNumber,
      category: "Total Synthesis",
      title: video.displayTitle,
    };
  });

  videos["named-reactions"].forEach((video) => {
    result[video.videoId] = {
      episodeNumber: video.episodeNumber,
      category: "Named Reaction",
      title: video.displayTitle,
    };
  });

  videos["research-spotlight"].forEach((video) => {
    result[video.videoId] = {
      episodeNumber: video.episodeNumber,
      category: "Research Spotlight",
      title: video.displayTitle,
    };
  });

  videos["culture-of-chemistry"].forEach((video) => {
    result[video.videoId] = {
      episodeNumber: video.episodeNumber,
      category: "Culture of Chemistry",
      title: video.displayTitle,
    };
  });

  return result;
};

(async () => {
  // Fetch videos.json from old website
  const { data: rawVideos } = await axios.get(
    "https://raw.githubusercontent.com/synthesis-workshop/synthesis-workshop.github.io/master/src/shared/videos.json"
  );
  const videos = transformRawVideos(rawVideos);

  // Get session token for API calls
  const {
    data: {
      data: {
        authenticateUserWithPassword: { sessionToken },
      },
    },
  } = await axios.post(
    "https://synthesis-workshop-backend-97f537f332bd.herokuapp.com/api/graphql",
    {
      query: `
        mutation Mutation($email: String!, $password: String!) {
          authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
              sessionToken
            }
          }
        }
      `,
      variables: {
        email: process.env.ADMIN_PANEL_USERNAME,
        password: process.env.ADMIN_PANEL_PASSWORD,
      },
    }
  );

  // Get metadata from youtube
  const youtube = google.youtube("v3");
  for (let videoId in videos) {
    console.log(`Fetching metadata for videoId: ${videoId}`);

    const { data: youtubeMetadata } = await youtube.videos.list({
      auth: process.env.GOOGLE_API_KEY,
      part: ["contentDetails", "snippet"],
      id: [videoId],
    });

    videos[videoId] = {
      ...videos[videoId],
      runtime: Duration.fromISO(
        youtubeMetadata.items[0].contentDetails.duration
      ).toFormat("m:s"),
      description: [
        {
          type: "paragraph",
          children: [{ text: youtubeMetadata.items[0].snippet.description }],
        },
      ],
      publishedAt: youtubeMetadata.items[0].snippet.publishedAt,
      status: "published",
      youtubeVideoId: videoId,
    };

    // Create video in GraphQL
    console.log(`Sending data to GraphQL for videoId ${videoId}...`);
    const {
      data: {
        data: { createEpisode },
      },
    } = await axios.post(
      "https://synthesis-workshop-backend-97f537f332bd.herokuapp.com/api/graphql",
      {
        query: `
          mutation CreateEpisode($data: EpisodeCreateInput!) {
            createEpisode(data: $data) {
              id
            }
          }
        `,
        variables: {
          data: videos[videoId],
        },
      },
      {
        headers: {
          Cookie: `keystonejs-session=${sessionToken}`,
        },
      }
    );

    console.log(`Successfully created episode ${createEpisode.id}!`);
  }
})();
