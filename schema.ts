import { text, relationship, password } from "@keystone-6/core/fields";
import { list } from "@keystone-6/core";

// Poster Model
export const Poster = list({
  fields: {
    title: text({ isRequired: true, description: "Title of the poster" }),
    image: relationship({
      ref: "Image",
      many: false,
      description: "The image associated with this poster",
    }),
    author: text({ description: "The author of this poster" }),
  },
});

// Image Model
export const Image = list({
  fields: {
    file: {
      type: "file",
      isRequired: true,
    },
  },
});

// User Model
export const User = list({
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password({ isRequired: true }),
  },
});
export const lists = { Poster, Image, User };
