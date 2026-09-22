// ── All site content lives here.
// When wired to Sanity, these will be replaced by API calls.

export const siteSettings = {
  title: 'PixelBloom',
  tagline: 'Elevating with Digital Buzz',
  heroEyebrow: 'Creative Digital Studio',
  heroHeadline: ['We craft', 'stories', 'that bloom.'],
  heroSub: "PixelBloom is a full-service digital creative studio — where strategy meets storytelling, and every frame is built to elevate your brand's buzz.",
  stats: [
    { n: '80', sup: '+', label: 'Projects delivered', id: 'cnt1', target: 80 },
    { n: '3', sup: '+', label: 'Years active', id: 'cnt2', target: 3 },
    { n: '40', sup: '+', label: 'Happy clients', id: 'cnt3', target: 40 },
  ],
  chips: [
    { text: 'Wedding Films', color: 'var(--wedding)' },
    { text: 'VFX & 3D', color: 'var(--vfx)' },
    { text: 'Creator Space', color: 'var(--creator)' },
  ],
}

export const services = [
  {
    num: '01', name: 'Wedding Films', accent: 'var(--wedding)',
    desc: 'Full-day coverage cut into cinematic trailers and long-form films. We shoot, we edit, we preserve the feeling — forever.',
    tags: ['Trailer', 'Long-form', 'Highlight Reel'],
    iconPath: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  },
  {
    num: '02', name: 'Creator Space', accent: 'var(--creator)',
    desc: 'Ongoing edit partnerships with YouTube creators. We handle post-production so creators can focus on what they do best.',
    tags: ['Xyaa', 'Techshot', 'Sufiyan Alam'],
    iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  },
  {
    num: '03', name: 'Brand & Commercial', accent: 'var(--brand)',
    desc: 'Campaigns, partnership content and commercial edits for brands looking to grow their digital presence with cinematic quality.',
    tags: ['Campaigns', 'Reels', 'Partnerships'],
    iconPath: 'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2',
  },
  {
    num: '04', name: 'VFX & 3D', accent: 'var(--vfx)',
    desc: 'Blender renders, motion graphics and visual effects that add dimension and magic to your content. Concept to completion, in-house.',
    tags: ['Blender', 'Motion GFX', '3D Renders'],
    iconPath: 'M12 2L22 8.5L22 15.5L12 22L2 15.5L2 8.5Z M12 22L12 15.5 M22 8.5L12 15.5L2 8.5',
  },
  {
    num: '05', name: 'Photography', accent: 'var(--photo)',
    desc: 'Event stills, behind-the-scenes documentation, and product photography. Capturing moments that live beyond the reel.',
    tags: ['Events', 'BTS', 'Product'],
    iconPath: 'M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M21 15l-5-5L5 21',
  },
  {
    num: '06', name: 'Video Editing', accent: 'var(--brand)',
    desc: 'From raw footage to a polished final cut. We edit for YouTube, Instagram, brand films and everything in between.',
    tags: ['YouTube', 'Reels', 'Colour Grade'],
    iconPath: 'M23 7l-7 5 7 5V7z M1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
  },
]

export const workCategories = [
  {
    id: 'creator',
    label: 'Creator Space',
    color: 'var(--creator)',
    channels: [
      {
        name: 'Xyaa',
        handle: '@XyaaLive ↗',
        url: 'https://www.youtube.com/@XyaaLive',
        badge: 'Creator Space',
        badgeBg: 'var(--creator-bg)',
        badgeColor: 'var(--creator)',
        dotColor: 'var(--creator)',
        layout: 'creator', // special layout with main + grid
        mainItem: {
          type: 'video', platform: 'yt',
          thumb: 'https://img.youtube.com/vi/Npb0Pc6AItM/hqdefault.jpg',
          label: 'Cinematic edit', url: 'https://www.youtube.com/watch?v=Npb0Pc6AItM&t=59s',
        },
        gridItems: [
          { type: 'video', platform: 'yt', thumb: 'https://img.youtube.com/vi/lcCwt0msehY/hqdefault.jpg', label: 'Travel edit', url: 'https://www.youtube.com/watch?v=lcCwt0msehY&t=35s' },
          { type: 'video', platform: 'yt', thumb: 'https://img.youtube.com/vi/j5qu2UALoMw/hqdefault.jpg', label: 'Vlog edit', url: 'https://www.youtube.com/watch?v=j5qu2UALoMw&t=7s' },
        ],
        bottomItem: {
          type: 'video', platform: 'yt',
          thumb: 'https://img.youtube.com/vi/5Uj3eNp2SWg/hqdefault.jpg',
          label: 'YouTube Short', badge: 'Short', url: 'https://youtube.com/shorts/5Uj3eNp2SWg',
        },
      },
      {
        name: 'Techshot',
        handle: '@TechShotTG ↗',
        url: 'https://www.youtube.com/@TechShotTG',
        badge: 'Creator Space',
        badgeBg: 'var(--vfx-bg)',
        badgeColor: 'var(--vfx)',
        dotColor: 'var(--vfx)',
        layout: 'simple',
        items: [
          { type: 'video', platform: 'yt', thumb: 'https://img.youtube.com/vi/EihtVYbheBc/hqdefault.jpg', label: 'Gadget review', url: 'https://www.youtube.com/watch?v=EihtVYbheBc&t=138s' },
          { type: 'video', platform: 'yt', thumb: 'https://img.youtube.com/vi/yASbKDe-sjg/hqdefault.jpg', label: 'Long-form review', url: 'https://www.youtube.com/watch?v=yASbKDe-sjg&t=373s' },
        ],
      },
      {
        name: 'Sufiyan Alam',
        handle: '',
        url: '',
        badge: 'Creator Space',
        badgeBg: 'var(--photo-bg)',
        badgeColor: 'var(--photo)',
        dotColor: 'var(--photo)',
        layout: 'grid3',
        items: [
          { type: 'video', platform: 'yt', thumb: 'https://img.youtube.com/vi/NZvogU288Ew/hqdefault.jpg', label: 'Science explainer', url: 'https://youtu.be/NZvogU288Ew' },
          { type: 'video', platform: 'yt', thumb: 'https://img.youtube.com/vi/NJjCXM3GBNc/hqdefault.jpg', label: 'Philosophy explainer', url: 'https://youtu.be/NJjCXM3GBNc' },
          { type: 'video', platform: 'yt', thumb: 'https://img.youtube.com/vi/xfgt7GVWmk4/hqdefault.jpg', label: 'Long-form', url: 'https://youtu.be/xfgt7GVWmk4' },
        ],
      },
    ],
  },
  {
    id: 'brand',
    label: 'Brand & Commercial',
    color: 'var(--brand)',
    channels: [
      {
        name: 'Bajaj Electricals',
        handle: '',
        url: '',
        badge: 'Brand & Commercial',
        badgeBg: 'var(--brand-bg)',
        badgeColor: 'var(--brand)',
        dotColor: 'var(--brand)',
        layout: 'grid2-portrait',
        items: [
          { type: 'video', platform: 'ig', portrait: true, thumb: null, label: 'Campaign Reel — Bajaj Electricals', url: 'https://www.instagram.com/reel/DKlu3aFyeP0/', gradFrom: '#C1694A', gradTo: '#EADBD1' },
          { type: 'video', platform: 'ig', portrait: true, thumb: null, label: 'Campaign Reel — Bajaj Electricals', url: 'https://www.instagram.com/reel/DKzTkhrIcbM/', gradFrom: '#8B4A2E', gradTo: '#C1694A' },
        ],
      },
    ],
  },
  {
    id: 'vfx',
    label: 'VFX & 3D',
    color: 'var(--vfx)',
    // VFX tab has a special complex layout handled in component
    sections: [
      {
        name: 'VFX & 3D Work',
        badge: 'Blender · In-house',
        badgeBg: 'var(--vfx-bg)',
        badgeColor: 'var(--vfx)',
        dotColor: 'var(--vfx)',
        rows: [
          [
            { type: 'ig-card', label: 'Concept Vape Ad — 3D Blender', sub: 'Instagram · VFX Reel', url: 'https://www.instagram.com/reel/DCPF2mcouxG/', cap: 'Concept Vape Ad' },
            { type: 'local-video', src: 'assets/videos/still-rollin.mp4', cap: 'Still Rollin — Reel Concept' },
            { type: 'local-video', src: 'assets/videos/sol-handbag.mp4', cap: 'SOL Handbag — Product 3D' },
          ],
          [
            { type: 'local-video', src: 'assets/videos/car-in-desert.mp4', cap: 'Car In Desert — Blender' },
            { type: 'local-video', src: 'assets/videos/robot-bollywood.mp4', cap: 'Robot — Bollywood Concept' },
            { type: 'local-video', src: 'assets/videos/fur-man-dancing.mp4', cap: 'Fur Man Dancing' },
          ],
          [
            { type: 'local-video', src: 'assets/videos/flip-fluid.mp4', cap: 'Flip Fluid Simulation' },
            { type: 'local-video', src: 'assets/videos/pokeball-cloth.mp4', cap: 'Pokeball Cloth Simulation' },
            { type: 'local-video', src: 'assets/videos/liquid-simulation.mp4', cap: 'Liquid Simulation' },
          ],
        ],
        bottomRow: [
          { type: 'local-video', src: 'assets/videos/drone-miniature.mp4', cap: 'Drone Shot Miniature' },
          { type: 'local-video', src: 'assets/videos/particle-simulation.mp4', cap: 'Particle Simulation' },
        ],
      },
      {
        name: 'Official Client Work',
        badge: 'Netflix · Kapil Sharma',
        badgeBg: 'var(--brand-bg)',
        badgeColor: 'var(--brand)',
        dotColor: 'var(--brand)',
        grid4: [
          { src: 'assets/images/netflix/v1.png', cap: 'Netflix Set — V1' },
          { src: 'assets/images/netflix/v2.png', cap: 'Netflix Set — V2' },
          { src: 'assets/images/netflix/v3.png', cap: 'Netflix Set — V3' },
          { src: 'assets/images/netflix/v4.png', cap: 'Netflix Set — V4' },
        ],
        grid3: [
          { src: 'assets/images/netflix/set2-concept2.jpg', cap: 'Netflix — Set 2 Concept' },
          { src: 'assets/images/netflix/set2-widescreen.jpg', cap: 'Netflix — Set 2 Wide' },
          { src: 'assets/images/kapil/draft2-final.png', cap: 'Kapil Sharma — Photobooth Wall' },
        ],
      },
      {
        name: 'BMW Lighting Concept',
        badge: '3D Concept · Blender',
        badgeBg: 'var(--vfx-bg)',
        badgeColor: 'var(--vfx)',
        dotColor: 'var(--vfx)',
        grid4: [
          { src: 'assets/images/bmw/front.png', cap: 'Front view' },
          { src: 'assets/images/bmw/side-1.png', cap: 'Side view 1' },
          { src: 'assets/images/bmw/upper-1.png', cap: 'Upper angle' },
          { src: 'assets/images/bmw/back.png', cap: 'Back angle' },
        ],
      },
      {
        name: 'Concept Renders & Stills',
        badge: '',
        dotColor: 'var(--photo)',
        grid4: [
          { src: 'assets/images/concepts/still-rollin-poster.png', cap: 'Still Rollin — Poster' },
          { src: 'assets/images/concepts/one-love-song.png', cap: 'One Love Song — Poster' },
          { src: 'assets/images/concepts/bmw-fuel-station-1.png', cap: 'BMW at Fuel Station' },
          { src: 'assets/images/concepts/levels-poster.png', cap: 'Levels — Poster Concept' },
        ],
        grid3: [
          { src: 'assets/images/concepts/3bhk-floor-plan.png', cap: '3BHK — Architectural Render' },
          { src: 'assets/images/concepts/studio-wide.png', cap: 'Studio Concept — Wide' },
          { src: 'assets/images/concepts/road-jungle.png', cap: 'Road Passing In Jungle' },
        ],
      },
    ],
  },
  {
    id: 'wedding',
    label: 'Wedding Films',
    color: 'var(--wedding)',
    heroImg: 'assets/images/weddings/dsc09811.jpg',
    stills: [
      { src: 'assets/images/weddings/dsc00507.jpg', alt: 'Wedding still 1' },
      { src: 'assets/images/weddings/dsc00528.jpg', alt: 'Wedding still 2' },
      { src: 'assets/images/weddings/dsc09907.jpg', alt: 'Wedding still 3' },
      { src: 'assets/images/weddings/dsc09811.jpg', alt: 'Wedding still 4' },
    ],
  },
]

export const processSteps = [
  { n: '01', name: 'Discovery', desc: "We start with a deep-dive into your brand, goals and audience. Understanding the why before touching the timeline." },
  { n: '02', name: 'Concept', desc: "Mood boards, style references and a creative direction deck. We align on the vision before a single frame is cut." },
  { n: '03', name: 'Production', desc: "Edit, colour, sound design and motion — all done in-house. Progress previews and two rounds of revisions, included." },
  { n: '04', name: 'Delivery', desc: "Final files optimised for every platform, plus a debrief to set up your next project before this one even launches." },
]

export const aboutValues = [
  { name: 'Story-first', desc: 'Every frame earns its place in the narrative.' },
  { name: 'Pixel-perfect', desc: 'Technical excellence is non-negotiable.' },
  { name: 'Fast turnaround', desc: 'Deadlines are respected, always.' },
  { name: 'Clear comms', desc: 'No ghosting, no vague timelines.' },
]

export const clients = [
  'Bajaj Electricals', 'Xyaa', 'Techshot', 'Rahul Dua',
  'Comic Con', 'Sufiyan Alam', 'Netflix (Set Design)', 'Kapil Sharma Show',
]

export const testimonials = [
  { quote: "PixelBloom completely transformed our brand content. Every reel has outperformed everything we made in-house.", name: 'Bajaj Electricals', role: 'Brand Partner', initials: 'BJ', stars: 5 },
  { quote: "Working with them for my YouTube channel has been incredible. They understand the vibe instantly and the edits always feel fresh.", name: 'Xyaa', role: 'YouTube Creator', initials: 'XY', stars: 5 },
  { quote: "Our wedding film made me cry the first time I watched it. They captured emotions I didn't even know were on camera. Truly cinematic.", name: 'Pooja & Sanket', role: 'Wedding Film Client', initials: 'P&S', stars: 5 },
  { quote: "Fast, communicative, consistently top-tier quality. They've become our go-to editor for all Techshot content.", name: 'Techshot', role: 'Tech Creator', initials: 'TS', stars: 5 },
  { quote: "The Comic Con recap reel went massively viral. They have a real eye for what performs on social media.", name: 'Comic Con India', role: 'Event Brand', initials: 'CC', stars: 5 },
]

export const contactInfo = {
  email: 'hello@pixelbloom.in',
  instagram: 'https://instagram.com/pixelbloom.studio',
  instagramHandle: '@pixelbloom.studio',
  youtube: 'https://youtube.com/@pixelbloom',
  youtubeHandle: 'PixelBloom Studio',
}

export const marqueeItems = [
  'Video Editing', 'Cinematography', '3D & Blender', 'Photography',
  'Brand Content', 'Wedding Films', 'VFX & Motion', 'Color Grading', 'Social Reels',
]

export const footerLinks = {
  Services: ['Wedding Films', 'Creator Space', 'Brand & Commercial', 'VFX & 3D', 'Photography'],
  Studio: ['About us', 'Our work', 'Process', 'Testimonials', 'Contact'],
}
