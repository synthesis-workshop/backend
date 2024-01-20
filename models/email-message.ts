import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

export const EmailMessage: ListConfig<
  Lists.TeamMember.TypeInfo<any>,
  any
> = list({
  access: {
    operation: {
      query: () => true,
      create: ({}) => true,
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
    email: text({
      label: "Email",
      validation: {
        isRequired: true,
      },
    }),
    subject: text({
      label: "Subject",
      validation: {
        isRequired: true,
      },
    }),
    message: text({
      label: "Message",
      validation: {
        isRequired: true,
      },
    }),
  },
});
