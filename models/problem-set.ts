import { graphql, list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { text, relationship, file, integer } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

export const ProblemSet: ListConfig<Lists.ProblemSet.TypeInfo<any>, any> = list(
  {
    access: {
      operation: {
        query: () => true,
        create: ({ session }) => !!session?.data.isAdmin,
        update: ({ session }) => !!session?.data.isAdmin,
        delete: ({ session }) => !!session?.data.isAdmin,
      },
    },
    fields: {
      title: text({
        validation: { isRequired: true },
        isFilterable: true,
        isOrderable: true,
      }),
      problemSetFile: file({ storage: "s3_file_storage" }),
      solutionFile: file({ storage: "s3_file_storage" }),
      episode: relationship({ ref: "Episode.problemSets", many: false }),
      courses: relationship({ ref: "Course.problemSets", many: true }),
      downloadCount: integer({ defaultValue: 0 }),
    },
  },
);
