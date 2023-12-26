import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { text, calendarDay, relationship } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import type { Lists } from ".keystone/types";

export const Publication: ListConfig<
  Lists.Publication.TypeInfo<any>,
  any
> = list({
  access: {
    operation: {
      query: () => true,
      create: ({ session }) => !!session?.data.isAdmin,
      update: ({ session }) => !!session?.data.isAdmin,
      delete: ({ session }) => !!session?.data.isAdmin,
    },
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
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
        course: {
          listKey: "Course",
          label: "Course",
          selection: "id title",
        },
      },
    }),
    publishedDate: calendarDay({ validation: { isRequired: true } }),
    publisher: text({
      validation: { isRequired: true },
      ui: {
        description: "The journal or who published this paper",
      },
    }),
    link: text({
      validation: {
        isRequired: true,
        match: {
          regex: new RegExp(
            /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i,
          ),
          explanation: "Link must be a valid URL",
        },
      },
    }),
    doi: text({
      validation: { isRequired: true },
    }),
    author: text({
      validation: { isRequired: true },
      ui: {
        description: "The name that will appear on the publication card",
      },
    }),
    teamMembers: relationship({
      ref: "TeamMember.publications",
      many: true,
      ui: {
        description:
          "List any team members who should have this publication appear in their profile",
      },
    }),
  },
});
