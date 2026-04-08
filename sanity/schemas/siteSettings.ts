import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'Nomor WhatsApp (62xxx)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'address',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'operationalHours',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsUrl',
      type: 'url',
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed src URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      type: 'url',
    }),
  ],
})
