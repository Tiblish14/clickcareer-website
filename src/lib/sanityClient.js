import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '8wmaqzfs',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Use CDN for extremely fast, cache-friendly fetching
  apiVersion: '2026-04-30',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
