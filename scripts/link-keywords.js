const axios = require("axios");
const dotenv = require("dotenv");
const { readFileSync } = require("fs-extra");
const _ = require("lodash");

dotenv.config();

(async () => {
  const csv = readFileSync("./scripts/keyword-seed-data.csv", "utf8");
  const [, ...lines] = csv.split("\n");

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

  const {
    data: {
      data: { keywords: allKeywords },
    },
  } = await axios.post(
    "https://synthesis-workshop-backend-97f537f332bd.herokuapp.com/api/graphql",
    {
      query: `
        query Query {
            keywords {
                id
                name
            }
        }
      `,
    }
  );

  for (line of lines) {
    const [, num] = line.split(",");
    const episodeNumber = parseFloat(num);
    const [, keywordString] = line.split(`"`);
    if (!keywordString) continue;
    const keywords = keywordString
      .split(",")
      .map((keyword) => keyword.trim())
      .map((keyword) => allKeywords.find((k) => k.name === keyword))
      .filter((keyword) => !!keyword)
      .map((keyword) => _.omit(keyword, ["name"]));

    console.log(`Updating episode ${episodeNumber} with keywords`, keywords);
    await axios.post(
      "https://synthesis-workshop-backend-97f537f332bd.herokuapp.com/api/graphql",
      {
        query: `
              mutation Mutation($where: EpisodeWhereUniqueInput!, $data: EpisodeUpdateInput!) {
                updateEpisode(where: $where, data: $data) {
                  id
                }
              }
              `,
        variables: {
          where: {
            episodeNumber: episodeNumber,
          },
          data: {
            keywords: {
              connect: keywords,
            },
          },
        },
      },
      {
        headers: {
          Cookie: `keystonejs-session=${sessionToken}`,
        },
      }
    );
  }
})();
