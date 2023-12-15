const axios = require("axios");
const dotenv = require("dotenv");
const { readFileSync } = require("fs-extra");

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

  const allKeywords = [];

  for (line of lines) {
    const [, keywordString] = line.split(`"`);
    if (!keywordString) continue;
    const keywords = keywordString
      .split(",")
      .map((keyword) => keyword.trim())
      .map((keyword) => allKeywords.find((k) => k.name === keyword))
      .filter((keyword) => !!keyword);

    keywords.forEach((keyword) => {
      if (!allKeywords.includes(keyword)) {
        allKeywords.push(keyword);
      }
    });
  }

  const {
    data: {
      data: { createKeywords: createdKeywords },
    },
  } = await axios.post(
    "https://synthesis-workshop-backend-97f537f332bd.herokuapp.com/api/graphql",
    {
      query: `
      mutation CreateKeywords($data: [KeywordCreateInput!]!) {
        createKeywords(data: $data) {
          id
          name
        }
      }
      `,
      variables: {
        data: allKeywords.map((keyword) => ({ name: keyword })),
      },
    },
    {
      headers: {
        Cookie: `keystonejs-session=${sessionToken}`,
      },
    }
  );

  console.log(`Successfully created ${createdKeywords.length} keywords!`);
})();
