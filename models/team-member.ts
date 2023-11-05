import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import {
  text,
  image,
  select,
  file,
  relationship,
} from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";
import { document } from "@keystone-6/fields-document";

export const TeamMember: ListConfig<Lists.TeamMember.TypeInfo<any>, any> = list(
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
      name: text({
        label: "Name",
        validation: {
          isRequired: true,
        },
      }),
      title: text({
        label: "Professional Title",
        validation: {
          isRequired: true,
        },
      }),
      group: select({
        type: "integer",
        options: [
          { label: "First", value: 1 },
          { label: "Second", value: 2 },
          { label: "Third", value: 3 },
        ],
        validation: {
          isRequired: true,
        },
        ui: {
          description:
            "This controls which block this team member will appear in within the Team Members section",
        },
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
          publication: {
            listKey: "Publication",
            label: "Publication",
            selection: "id title",
          },
          poster: {
            listKey: "Poster",
            label: "Poster",
            selection: "id title",
          },
        },
      }),
      image: image({
        label: "Team Member Headshot",
        storage: "s3_image_storage",
      }),
      cv: file({
        label: "CV / Resume",
        storage: "s3_file_storage",
      }),
      publications: relationship({
        ref: "Publication.teamMembers",
        many: true,
        ui: {
          description: "Any publications that this team member was involved in",
        },
      }),
    },
  },
);
