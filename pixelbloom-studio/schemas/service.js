export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'num',
      title: 'Number (01, 02…)',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'accentColor',
      title: 'Accent Color (CSS var)',
      type: 'string',
      description: 'e.g. var(--wedding), var(--creator)',
      options: {
        list: [
          { title: 'Wedding (pink)', value: 'var(--wedding)' },
          { title: 'Creator (gold)', value: 'var(--creator)' },
          { title: 'Brand (terracotta)', value: 'var(--brand)' },
          { title: 'VFX (teal)', value: 'var(--vfx)' },
          { title: 'Photography (green)', value: 'var(--photo)' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'num' },
  },
}
