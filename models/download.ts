import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { text, timestamp, file } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

export const Download: ListConfig<Lists.Download.TypeInfo<any>, any> = list({
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
    lastUpdated: timestamp({ defaultValue: { kind: "now" } }),
    fileDownload: file({ storage: "s3_file_storage" }),
  },
});
