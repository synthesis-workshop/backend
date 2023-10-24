import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image, // Import the image field
} from "@keystone-6/core/fields";

export const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      password: password({
        validation: {
          length: { min: 10, max: 100 },
          isRequired: true,
          rejectCommon: true,
        },
        bcrypt: require("bcryptjs"),
      }),
      status: select({
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
        defaultValue: "active",
      }),
      createdAt: timestamp({
        defaultValue: { kind: "now" },
      }),
      lastLoginDate: timestamp({
        defaultValue: { kind: "now" },
      }),
    },
  }),
  Poster: list({
    access: allowAll,
    fields: {
      title: text({
        label: "Title of the Poster",
        isFilterable: true,
        isOrderable: true,
      }),
      author: text({
        label: "Author",
      }),
      image: relationship({
        ref: "Image.poster",
        many: false,
        label: "Associated Image",
      }),
    },
  }),
  Image: list({
    access: allowAll,
    fields: {
      file: image({ storage: "s3_image_storage" }), // Use 'image' field with 's3_image_storage'
      poster: relationship({ ref: "Poster.image" }),
    },
  }),
};
