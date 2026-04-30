import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '8wmaqzfs',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Use CDN for faster read times
  apiVersion: '2026-04-30',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
