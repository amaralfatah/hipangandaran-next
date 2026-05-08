# SEO Configuration

## Per-Page Metadata Pattern

```ts
// Contoh untuk artikel
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  if (!article) return { title: 'Not Found' }

  return {
    title: `${article.title} | Hi Pangandaran`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{ url: article.featuredImage, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.featuredImage],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/guides/${params.slug}`,
    },
  }
}
```

## Schema.org JSON-LD

```tsx
// components/JsonLd.tsx
export function ArticleJsonLd({ article }: { article: GuideFrontmatter & { slug: string } }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'Hi Pangandaran',
      logo: { '@type': 'ImageObject', url: '/logo.png' }
    }
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

### Schema Types per Page

- `Article` — `/guides/*`
- `LodgingBusiness` — `/places/[slug]` (akomodasi)
- `CafeOrCoffeeShop` — `/places/cafes/[slug]`
- `BreadcrumbList` — semua halaman dengan breadcrumb
- `FAQPage` — artikel dengan FAQ section
- `WebApplication` — `/tools/*` pages

## Sitemap

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/mdx'
import { getAllAccommodations, getAllCafes } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!
  const articles = await getAllArticles()
  const accommodations = await getAllAccommodations()

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/places/accommodation`, priority: 0.9 },
    { url: `${baseUrl}/places/cafes`, priority: 0.8 },
    { url: `${baseUrl}/tools/cost-calculator`, priority: 0.8 },
    ...articles.map(a => ({
      url: `${baseUrl}/guides/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      priority: 0.7,
    })),
    ...accommodations.map(a => ({
      url: `${baseUrl}/places/${a.slug}`,
      lastModified: new Date(a.updated_at),
      priority: 0.6,
    })),
  ]
}
```

## Robots

```ts
// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

## Title Pattern

| Page type | Title format |
|---|---|
| Homepage | `Hi Pangandaran — Honest Guide for Travelers & Digital Nomads` |
| Guides index | `All Guides | Hi Pangandaran` |
| Article | `{article.title} | Hi Pangandaran` |
| Accommodation index | `Find Accommodation in Pangandaran & Batukaras | Hi Pangandaran` |
| Place detail | `{place.name} — Verified Review | Hi Pangandaran` |
| Tool | `{tool.title} | Hi Pangandaran` |

## Description Length

- 50-160 chars (SEO optimal range)
- Frontmatter validator already enforces ini di `lib/mdx.ts`

## Internal Linking Rules

1. Artikel pilar (Batu Karas, Green Canyon) jadi **hub** — banyak internal link masuk
2. Artikel Tier 2 (Karapyak, Madasari, Citumang) wajib link ke pilar
3. Tidak ada orphan page — semua halaman dapat internal link minimal 1
4. Hindari link "click here" — pakai anchor text deskriptif
