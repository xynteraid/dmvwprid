import { defineType, defineField } from 'sanity'

export const blog = defineType({
  name: 'blog',
  title: 'Blog / Insights',
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
      name: 'thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['Review', 'Tips', 'News', 'Community'] },
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Konten',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
})
