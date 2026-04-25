import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: '8wmaqzfs', // your Sanity Project ID
  dataset: 'production',
  useCdn: true, // Use CDN for extremely fast, cache-friendly fetching
  apiVersion: '2024-04-25', // Use current date
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
