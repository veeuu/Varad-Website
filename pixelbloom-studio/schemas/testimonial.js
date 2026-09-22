export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
    },
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role / Company',
      type: 'string',
    },
    {
      name: 'initials',
      title: 'Initials (for avatar)',
      type: 'string',
      description: 'e.g. BJ, XY, TS',
      validation: Rule => Rule.max(3),
    },
    {
      name: 'stars',
      title: 'Star Rating',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.min(1).max(5),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
}
