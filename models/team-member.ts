import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { text, image } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

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
      image: image({
        label: "Team Member Headshot",
        storage: "s3_image_storage",
      }),
    },
  }
);
