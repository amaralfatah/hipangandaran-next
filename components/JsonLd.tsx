import type { GuideFrontmatter } from '@/lib/mdx'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hipangandaran.com'

function JsonLdScript({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Hi Pangandaran',
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        description:
          'Honest English travel guide to Pangandaran, Batukaras, and Green Canyon — written by a local, not a tour operator.',
        sameAs: ['https://www.instagram.com/hipangandaran'],
      }}
    />
  )
}

export interface ArticleJsonLdProps {
  slug: string
  frontmatter: GuideFrontmatter
}

export function ArticleJsonLd({ slug, frontmatter }: ArticleJsonLdProps) {
  const url = `${SITE_URL}/guides/${slug}`
  const image = frontmatter.featuredImage.startsWith('http')
    ? frontmatter.featuredImage
    : `${SITE_URL}${frontmatter.featuredImage}`

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: frontmatter.title,
        description: frontmatter.description,
        image: [image],
        datePublished: frontmatter.publishedAt,
        dateModified: frontmatter.updatedAt,
        author: {
          '@type': 'Person',
          name: frontmatter.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Hi Pangandaran',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/icon.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      }}
    />
  )
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        })),
      }}
    />
  )
}
