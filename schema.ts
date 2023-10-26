import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, relationship, integer, file } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

import { Episode, Keyword, User } from "./models";

export const lists: Lists = {
  User,
  Episode,
  Keyword,
  /* The course Model is a temporary code just for relationship to Problem Set Modal */
  Course: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true },
      }),
      body: text({
        validation: { isRequired: true },
        ui: { displayMode: "textarea" },
      }),
      problemSet: relationship({ ref: "ProblemSet", many: true }),
    },
  }),
  ProblemSet: list({
    access: {
      operation: allowAll,
    },
    fields: {
      title: text({
        validation: { isRequired: true },
        isFilterable: true,
        isOrderable: true,
      }),
      problemSetFile: file({ storage: "s3_file_storage" }),
      solutionFile: file({ storage: "s3_file_storage" }),
      episodeLink: text({
        validation: { isRequired: true },
        defaultValue:
          'NOTE: Enter the string of characters at the end of the YouTube URL after "v=" here.',
      }),
      downloadCount: integer({
        validation: { min: 0 },
        isOrderable: true,
        isFilterable: true,
      }),
      course: relationship({ ref: "Course", many: true }),
    },
  }),
};
