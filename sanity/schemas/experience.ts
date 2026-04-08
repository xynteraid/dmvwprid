import { defineType, defineField } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
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
      name: 'tag',
      type: 'string',
      options: { list: ['Road Trip', 'Community', 'Track Day', 'Event'] },
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube URL (opsional)',
      type: 'url',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
})
