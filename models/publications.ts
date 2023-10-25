import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, relationship } from "@keystone-6/core/fields";

export const Publication = list({
  access: allowAll,
  fields: {
    keyword: text({ validation: { isRequired: true } }),
    title: text({ validation: { isRequired: true } }),
    text: text({ validation: { isRequired: true } }),
    date: text({ validation: { isRequired: true } }),
    source: text({ validation: { isRequired: true } }),
    link: text({
      validation: { isRequired: true },
      isUrl: true,
    }),
    image: text({
      validation: { isRequired: true },
      isUrl: true, // Validate as a URL
    }),
    owner: relationship({
      ref: "User.publications",
      many: false,
    }),
  },
});
