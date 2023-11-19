import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { document } from "@keystone-6/fields-document";
import type { Lists } from ".keystone/types";
import { integer } from "@keystone-6/core/fields";

export const Meta: ListConfig<Lists.Meta.TypeInfo<any>, any> = list({
  access: {
    operation: {
      query: () => true,
      create: ({ session }) => !!session?.data.isAdmin,
      update: ({ session }) => !!session?.data.isAdmin,
      delete: ({ session }) => !!session?.data.isAdmin,
    },
  },
  fields: {
    about: document({
      formatting: true,
      dividers: true,
      links: true,
    }),
    mission: document({
      formatting: true,
      dividers: true,
      links: true,
    }),
    videoCount: integer(),
    viewsCount: integer(),
    guestsCount: integer(),
    subscriberCount: integer(),
  },
  isSingleton: true,
});
