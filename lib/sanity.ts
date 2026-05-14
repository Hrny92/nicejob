import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'd9mk2nno',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // CDN pouze v produkci, při vývoji vždy čerstvá data
  fetchOptions: process.env.NODE_ENV === 'development' ? { cache: 'no-store' } : undefined,
})
