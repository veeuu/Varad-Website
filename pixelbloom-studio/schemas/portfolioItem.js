export default {
  name: 'portfolioItem',
  title: 'Portfolio Items',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Label',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Creator Space', value: 'creator' },
          { title: 'Brand & Commercial', value: 'brand' },
          { title: 'VFX & 3D', value: 'vfx' },
          { title: 'Wedding Films', value: 'wedding' },
        ],
      },
    },
    {
      name: 'channelName',
      title: 'Channel / Client Name',
      type: 'string',
      description: 'e.g. Xyaa, Bajaj Electricals',
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube Video', value: 'youtube' },
          { title: 'Instagram Reel', value: 'instagram' },
          { title: 'Local Video', value: 'local-video' },
          { title: 'Image', value: 'image' },
        ],
      },
    },
    {
      name: 'url',
      title: 'YouTube / Instagram URL',
      type: 'url',
      hidden: ({ document }) => document?.mediaType === 'image' || document?.mediaType === 'local-video',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      description: 'For YouTube, leave blank to auto-load from YouTube. Upload for Instagram/custom.',
    },
    {
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'e.g. Npb0Pc6AItM — leave blank to use URL',
      hidden: ({ document }) => document?.mediaType !== 'youtube',
    },
    {
      name: 'portrait',
      title: 'Portrait Format (9:16)?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'featured',
      title: 'Featured (shows first)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Category', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'channelName',
      media: 'thumbnail',
    },
  },
}
