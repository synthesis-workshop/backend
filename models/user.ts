import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  checkbox,
  text,
  password,
  timestamp,
  select,
} from "@keystone-6/core/fields";

export const User: ListConfig<Lists.User.TypeInfo<any>, any> = list({
  access: {
    operation: {
      query: ({ session }) => !!session?.data.isAdmin,
      create: ({ session }) => !!session?.data.isAdmin,
      update: ({ session }) => !!session?.data.isAdmin,
      delete: ({ session }) => !!session?.data.isAdmin,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
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
    isAdmin: checkbox({ defaultValue: true }),
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
});
