import { list } from "@keystone-6/core";
import { text, timestamp, relationship } from "@keystone-6/fields";

export const lists = {
  Publication: list({
    fields: {
      keyword: text({ isRequired: true }),
      title: text({ isRequired: true }),
      text: text({ isRequired: true }),
      date: text({ isRequired: true }),
      source: text({ isRequired: true }),
      link: text({
        isRequired: true,
        isUrl: true, // Validate as a URL
      }),
      image: text({
        isRequired: true,
        isUrl: true, // Validate as a URL
      }),
      owner: relationship({
        ref: "User.publications",
        many: false,
      }),
    },
  }),
};
