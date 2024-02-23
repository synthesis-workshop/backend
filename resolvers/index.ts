import { getDownloadCount } from './download-count';

export const resolvers = {
    Query: {
      getDownloadCount: async (_: any, { problemSetId }: { problemSetId: string }) => {
        return getDownloadCount(problemSetId);
      },
    },
  };  
  
  export default resolvers;