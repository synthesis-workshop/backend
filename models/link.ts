import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { text, image } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

export const Link: ListConfig<any> = list({
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
    link: text({
      validation: {
        isRequired: true,
        match: {
          regex: new RegExp(
            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
          ),
          explanation: "Link must be a valid URL",
        },
      },
    }),
    logo: text({
      validation: { isRequired: true },
      isFilterable: true,
      isOrderable: true,
    }),
  },
});
