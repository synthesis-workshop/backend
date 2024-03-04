import AWS from "aws-sdk";

// AWS Credentials
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const cloudwatch = new AWS.CloudWatch();

// TypeScript type for the function parameters
type GetDownloadCountParams = {
  problemSetId: string;
};

// TypeScript type for the function return value
type GetDownloadCountResult = number;

// CloudWatch resolver to fetch S3 GetRequests metric
const getDownloadCount = async ({
  problemSetId,
}: GetDownloadCountParams): Promise<GetDownloadCountResult> => {
  if (!process.env.S3_BUCKET_NAME) {
    throw new Error("S3_BUCKET_NAME is not defined");
  }

  if (!problemSetId) {
    throw new Error("problem set is not defined");
  }

  const params = {
    StartTime: new Date(Date.now() - 86400000),
    EndTime: new Date(),
    MetricDataQueries: [
      {
        Id: "m1",
        MetricStat: {
          Metric: {
            Namespace: "AWS/S3",
            MetricName: "GetRequests",
            Dimensions: [
              {
                Name: "BucketName",
                Value: process.env.S3_BUCKET_NAME,
              },
              {
                Name: "StorageType",
                Value: problemSetId,
              },
            ],
          },
          Period: 300,
          Stat: "Sum",
        },
      },
    ],
  };

  try {
    // Get the CloudWatch metric data
    const data = await cloudwatch.getMetricData(params).promise();

    // Check if MetricDataResults is defined and has at least one item
    if (!data.MetricDataResults || data.MetricDataResults.length === 0) {
      throw new Error("No metric data results returned");
    }

    // Check if Values is defined and has at least one item
    if (
      !data.MetricDataResults[0].Values ||
      data.MetricDataResults[0].Values.length === 0
    ) {
      throw new Error("No values in metric data results");
    }

    // Extract the download count from the response
    const downloadCount = data.MetricDataResults[0].Values[0];

    // Check if Values is defined and has at least one item
    if (!downloadCount) {
      throw new Error("No values in metric data results");
    }

    return downloadCount;
  } catch (error) {
    console.error("Error fetching CloudWatch metric:", error);
    throw error;
  }
};

export default getDownloadCount;
