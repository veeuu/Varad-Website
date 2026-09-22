import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

// Only create the client if a real project ID is configured
const isConfigured = projectId && /^[a-z0-9-]+$/.test(projectId)

export const client = isConfigured
  ? createClient({ projectId, dataset, useCdn: true, apiVersion: '2024-01-01' })
  : null

const builder = isConfigured ? imageUrlBuilder(client) : null
export function urlFor(source) {
  return builder?.image(source)
}

// ── Queries ──────────────────────────────────────────────────────

export async function getSiteSettings() {
  if (!client) return null
  return client.fetch(`*[_type == "siteSettings"][0]{
    heroEyebrow, heroHeadlineLine1, heroHeadlineEm,
    heroHeadlineLine2, heroSub, stats, chips
  }`)
}

export async function getServices() {
  if (!client) return null
  return client.fetch(`*[_type == "service"] | order(order asc){
    _id, num, name, description, tags, accentColor
  }`)
}

export async function getPortfolioItems() {
  if (!client) return null
  return client.fetch(`*[_type == "portfolioItem"] | order(order asc){
    _id, title, category, channelName, mediaType,
    url, youtubeId, portrait, caption, featured,
    thumbnail{ asset->{ url } }
  }`)
}

export async function getTestimonials() {
  if (!client) return null
  return client.fetch(`*[_type == "testimonial"] | order(order asc){
    _id, quote, name, role, initials, stars
  }`)
}
