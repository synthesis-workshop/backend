import { list } from "@keystone-6/core";
import type { ListConfig } from "@keystone-6/core";
import { file, image, text } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

export const Poster: ListConfig<Lists.Poster.TypeInfo<any>, any> = list({
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
      validation: {
        isRequired: true,
      },
      isFilterable: true,
      isOrderable: true,
    }),
    attribution: text({
      label: "Attribution",
      validation: {
        isRequired: true,
      },
    }),
    image: image({
      label: "Preview Image",
      storage: "s3_image_storage",
    }),
    file: file({
      label: "Full Resolution Image / File",
      storage: "s3_file_storage",
    }),
  },
});
