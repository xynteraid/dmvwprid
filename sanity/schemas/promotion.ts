import { defineType, defineField } from 'sanity'

export const promotion = defineType({
  name: 'promotion',
  title: 'Promosi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge (e.g. "Bunga 0%")',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'validUntil',
      type: 'date',
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['Pembelian', 'Servis', 'Finansial'] },
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'terms',
      title: 'Syarat & Ketentuan',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relatedCars',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'car' }] }],
    }),
  ],
})
