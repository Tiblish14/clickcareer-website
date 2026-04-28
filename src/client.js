import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '8wmaqzfs', // ClickCareer Project ID
  dataset: 'production',
  useCdn: true, // Use CDN for faster read times
  apiVersion: '2024-04-28', // Use current date
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
