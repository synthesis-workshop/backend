// keystone.ts

import dotenv from "dotenv";
import { config } from "@keystone-6/core";
import { withAuth, session } from "./auth";
import { lists } from "./schema";

dotenv.config();

const {
  S3_BUCKET_NAME: bucketName = "keystone-test",
  S3_REGION: region = "ap-southeast-2",
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
} = process.env;

export default withAuth(
  config({
    server: {
      port: 8080,
      cors: { origin: ["http://localhost:3000"] },
    },
    db: {
      provider: "mysql",
      url: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`,
      onConnect: async (context) => {
        /* ... */
      },
      enableLogging: true,
      idField: { kind: "uuid" },
      useMigrations: true,
    },
    telemetry: false,
    graphql: {
      playground: true,
      apolloConfig: {
        introspection: true,
      },
    },
    storage: {
      my_s3_files: {
        kind: "s3",
        type: "file",
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
      },
    },
    lists,
    session,
  }),
);
