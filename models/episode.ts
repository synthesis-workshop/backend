import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import {
  text,
  relationship,
  timestamp,
  select,
  float,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import type { Lists } from ".keystone/types";

export const Episode: ListConfig<Lists.Episode.TypeInfo<any>, any> = list({
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
    description: document({
      formatting: true,
      dividers: true,
      links: true,
      relationships: {
        mention: {
          listKey: "Episode",
          label: "Mention",
          selection: "id title",
        },
      },
    }),
    episodeNumber: float({
      validation: { min: 0, isRequired: true },
      isIndexed: "unique",
      isOrderable: true,
    }),
    category: text({ isFilterable: true, isOrderable: true }),
    runtime: text({ isOrderable: true, defaultValue: "00:00" }),
    youtubeVideoId: text({
      validation: { isRequired: true },
      ui: {
        description:
          'Enter the string of characters at the end of the YouTube URL after "v=".',
      },
    }),
    publishedAt: timestamp({
      isFilterable: true,
      isOrderable: true,
      defaultValue: { kind: "now" },
    }),
    status: select({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      validation: { isRequired: true },
      defaultValue: "draft",
      ui: { displayMode: "segmented-control" },
    }),
    relatedEpisodes: relationship({ ref: "Episode", many: true }),
    keywords: relationship({ ref: "Keyword.episodes", many: true }),
  },
});
