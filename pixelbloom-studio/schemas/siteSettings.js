export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — only one document of this type
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'heroEyebrow',
      title: 'Hero Eyebrow Label',
      type: 'string',
      initialValue: 'Creative Digital Studio',
    },
    {
      name: 'heroHeadlineLine1',
      title: 'Hero Headline — Line 1',
      type: 'string',
      initialValue: 'We craft',
    },
    {
      name: 'heroHeadlineEm',
      title: 'Hero Headline — Italic Word',
      type: 'string',
      initialValue: 'stories',
    },
    {
      name: 'heroHeadlineLine2',
      title: 'Hero Headline — Line 2',
      type: 'string',
      initialValue: 'that bloom.',
    },
    {
      name: 'heroSub',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
    },
    {
      name: 'stats',
      title: 'Hero Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Number', type: 'string' },
          { name: 'suffix', title: 'Suffix (e.g. +)', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
        preview: { select: { title: 'label' } },
      }],
    },
    {
      name: 'chips',
      title: 'Hero Floating Chips',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'text', title: 'Text', type: 'string' },
          { name: 'color', title: 'Color (CSS var or hex)', type: 'string' },
        ],
        preview: { select: { title: 'text' } },
      }],
      validation: Rule => Rule.max(3),
    },
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
}
