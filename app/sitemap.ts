import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getAllPoziceSlugs } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statické stránky
  const static_pages: MetadataRoute.Sitemap = [
    {
      url:              SITE_URL,
      lastModified:     new Date(),
      changeFrequency:  'weekly',
      priority:         1.0,
    },
    {
      url:              `${SITE_URL}/pozice`,
      lastModified:     new Date(),
      changeFrequency:  'daily',
      priority:         0.9,
    },
    {
      url:              `${SITE_URL}/gdpr`,
      lastModified:     new Date(),
      changeFrequency:  'yearly',
      priority:         0.2,
    },
    {
      url:              `${SITE_URL}/cookies`,
      lastModified:     new Date(),
      changeFrequency:  'yearly',
      priority:         0.2,
    },
  ]

  // Dynamické stránky — pracovní pozice
  let job_pages: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllPoziceSlugs()
    job_pages = slugs.map(({ slug }) => ({
      url:              `${SITE_URL}/pozice/${slug}`,
      lastModified:     new Date(),
      changeFrequency:  'weekly' as const,
      priority:         0.8,
    }))
  } catch {
    // Pokud Sanity není dostupná při buildu, přeskočíme
  }

  return [...static_pages, ...job_pages]
}
