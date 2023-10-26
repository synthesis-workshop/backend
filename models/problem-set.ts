import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { text, relationship, integer, file } from "@keystone-6/core/fields";
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
      // This will need to be handled later via a custom resolver that gets invoked when the download button is clicked
      downloadCount: integer({
        validation: { min: 0 },
        isOrderable: true,
        isFilterable: true,
      }),
      episode: relationship({ ref: "Episode.problemSets", many: false }),
      courses: relationship({ ref: "Course.problemSets", many: true }),
    },
  },
);
