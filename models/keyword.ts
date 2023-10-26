import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { text, relationship } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

export const Keyword: ListConfig<Lists.Keyword.TypeInfo<any>, any> = list({
  access: {
    operation: {
      query: () => true,
      create: ({ session }) => !!session?.data.isAdmin,
      update: ({ session }) => !!session?.data.isAdmin,
      delete: ({ session }) => !!session?.data.isAdmin,
    },
  },
  fields: {
    name: text(),
    episodes: relationship({ ref: "Episode.keywords", many: true }),
  },
});
