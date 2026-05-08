import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/mdx'
import { getAllPlaceSlugs } from '@/lib/places'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hipangandaran.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, places] = await Promise.all([getAllArticles(), getAllPlaceSlugs()])

  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/places`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/places/accommodation`,
      lastModified: new Date(),
      priority: 0.85,
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/places/cafes`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: 'yearly',
    },
    {
      url: `${BASE_URL}/affiliate-disclosure`,
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: 'yearly',
    },
  ]

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/guides/${a.slug}`,
    lastModified: new Date(a.frontmatter.updatedAt),
    priority: 0.7,
    changeFrequency: 'monthly',
  }))

  const placeEntries: MetadataRoute.Sitemap = places.map((p) => ({
    url: `${BASE_URL}/places/${p.slug}`,
    lastModified: new Date(),
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  return [...staticEntries, ...articleEntries, ...placeEntries]
}
