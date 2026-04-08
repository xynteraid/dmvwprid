import { defineType, defineField } from 'sanity'

export const car = defineType({
  name: 'car',
  title: 'Mobil',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Mobil',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Listrik'] },
    }),
    defineField({
      name: 'fuel',
      type: 'string',
      options: { list: ['Bensin', 'Hybrid', 'Listrik'] },
    }),
    defineField({
      name: 'price',
      title: 'Harga (Rp)',
      type: 'number',
    }),
    defineField({
      name: 'badge',
      title: 'Badge (opsional)',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'highlights',
      title: 'Highlight Spec (3 item)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string', title: 'Icon (Lucide name)' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Nama Warna' }),
            defineField({ name: 'hex', type: 'string', title: 'Hex Code' }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Gambar Mobil Warna Ini',
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'specSections',
      title: 'Spec Storytelling Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Judul' }),
            defineField({ name: 'description', type: 'text', title: 'Deskripsi' }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Gambar',
              options: { hotspot: true },
            }),
            defineField({
              name: 'highlights',
              type: 'array',
              title: 'Highlight Points',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'technicalSpec',
      type: 'object',
      fields: [
        defineField({
          name: 'engine',
          title: 'Mesin',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'value', type: 'string' }),
              ],
            },
          ],
        }),
        defineField({
          name: 'performance',
          title: 'Performa',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'value', type: 'string' }),
              ],
            },
          ],
        }),
        defineField({
          name: 'dimension',
          title: 'Dimensi',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'value', type: 'string' }),
              ],
            },
          ],
        }),
        defineField({
          name: 'capacity',
          title: 'Kapasitas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'value', type: 'string' }),
              ],
            },
          ],
        }),
        defineField({
          name: 'features',
          title: 'Fitur',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'value', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Nama Varian' }),
            defineField({ name: 'price', type: 'number', title: 'Harga (Rp)' }),
            defineField({
              name: 'features',
              type: 'array',
              title: 'Fitur Tambahan',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedCars',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'car' }] }],
    }),
    defineField({
      name: 'relatedPromos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'promotion' }] }],
    }),
  ],
})
