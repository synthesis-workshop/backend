import AWS from 'aws-sdk';

// AWS Credentials
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const cloudwatch = new AWS.CloudWatch();


// CloudWatch resolver to fetch S3 GetRequests metric
export const getDownloadCount = async (itemKey: string) => {

  const params = {
    StartTime: new Date(Date.now() - 86400000), // 24 hours ago
    EndTime: new Date(), // Now
    MetricDataQueries: [
      {
        Id: 'm1',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/S3',
            MetricName: 'GetRequests',
            Dimensions: [
              {
                Name: 'BucketName',
                Value: process.env.S3_BUCKET_NAME,
              },
              {
                Name: 'StorageType',
                Value: itemKey,
              },
            ],
          },
          Period: 300, // 5 minutes
          Stat: 'Sum',
        },
      },
    ],
  };

  try {
    // Get the CloudWatch metric data
    const data = await cloudwatch.getMetricData(params).promise();
    // Extract the download count from the response
    const downloadCount = data.MetricDataResults[0].Values[0];
    return downloadCount;
  } catch (error) {
    console.error('Error fetching CloudWatch metric:', error);
    throw error;
  }
};

export default getDownloadCount;


//   async resolve(root: any, args: any, context: Context): Promise<number> {
//     const cloudwatch = new CloudWatch({
//       accessKeyId: process.env.AWS_KEY,
//       secretAccessKey: process.env.AWS_SECRET,
//     });

//     const params = {
//       MetricName: 'GetRequests',
//       Namespace: 'AWS/S3',
//       Period: 300, 
//       Statistics: ['Sum'], 
//       Dimensions: [
//         {
//           Name: 'BucketName', 
//           Value: process.env.S3_BUCKET_NAME,
//         },
//       ],
//       StartTime: new Date(Date.now() - 86400000), 
//       EndTime: new Date(),
//     };

//     const { Datapoints } = await cloudwatch.getMetricStatistics(params).promise();

//     //filter name of the metric Problem-Set-Downloads

//     // Extract and process the metric data as needed
//     const totalCount = Datapoints.reduce((total, datapoint) => {
//       return total + (datapoint.Sum || 0);
//     }, 0);

//     return totalCount;
//   },
// };

// // GraphQL queries
// export const listObjectsQuery = gql`
//   query {
//     listObjectsCount: listObjectsResolver
//   }
// `;

// export const getRequestsMetricQuery = gql`
//   query {
//     getRequestsMetric: getRequestsMetricResolver
//   }
// `;
