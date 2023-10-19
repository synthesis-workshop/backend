// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  integer,
  checkbox,
  select,
  image,
  float,
} from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed GobbID
      name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),

      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: 'unique',
      }),

      password: password({
        validation: {
          length: { min: 10, max: 100 },
          isRequired: true,
          rejectCommon: true,
        },
        bcrypt: require('bcryptjs'),
      }),

      // User account status
      status: select({
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
        defaultValue: 'active',
      }),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),
      lastLoginDate: timestamp({
        // this sets the timestamp to Date.now() when the user was last active
        defaultValue: { kind: 'now' },
      }),
    },
  }),
  Episode: list({
    access: allowAll,
    fields: {
      title: text({ isFilterable: true, isOrderable: true }),
      description: text(),
      episodeNumber: float({
        validation: { min: 0 },
        isIndexed: 'unique',
        isOrderable: true,
      }),
      section: text({ isFilterable: true, isOrderable: true }),
      runtime: text({ isOrderable: true, defaultValue: '00:00' }),
      publishedAt: timestamp({ isFilterable: true, isOrderable: true }),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: { displayMode: 'segmented-control' },
      }),
      keyword: relationship({ ref: 'Keyword.keywordRelation', many: true }),
    },
  }),
  Keyword: list({
    access: allowAll,
    fields: {
      keyword: text(),
      keywordRelation: relationship({ ref: 'Episode.keyword', many: true }),
    },
  }),
};
