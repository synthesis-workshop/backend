import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import {
  text,
  relationship,
  integer,
  timestamp,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import type { Lists } from ".keystone/types";

export const Course: ListConfig<Lists.Course.TypeInfo<any>, any> = list({
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
    }),
    description: document({
      formatting: true,
      dividers: true,
      links: true,
      relationships: {
        episode: {
          listKey: "Episode",
          label: "Episode",
          selection: "id title",
        },
        problemSet: {
          listKey: "ProblemSet",
          label: "Problem Set",
          selection: "id title",
        },
      },
    }),
    problemSets: relationship({ ref: "ProblemSet.courses", many: true }),
    episodes: relationship({ ref: "Episode.courses", many: true }),
    durationHrs: integer({
      validation: { min: 0, isRequired: true },
      defaultValue: 0,
    }),
    price: integer({
      validation: { min: 0, isRequired: true },
      defaultValue: 0,
    }),
    publishedAt: timestamp({
      isFilterable: true,
      isOrderable: true,
      defaultValue: { kind: "now" },
    }),
  },
});
