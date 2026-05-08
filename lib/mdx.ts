import 'server-only'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

export const guideFrontmatterSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(160),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  category: z.enum(['transport', 'accommodation', 'activities', 'food', 'nomad', 'planning']),
  readingTime: z.number().int().positive(),
  featuredImage: z.string().startsWith('/'),
  featuredImageAlt: z.string().min(10),
  affiliateDisclosure: z.boolean(),
  author: z.string().min(2),
})

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>

export interface GuideArticle {
  slug: string
  frontmatter: GuideFrontmatter
  content: string
}

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides')

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, '')
}

function parseAndValidate(slug: string, raw: string): GuideArticle {
  const { data, content } = matter(raw)
  const result = guideFrontmatterSchema.safeParse(data)

  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n')
    throw new Error(
      `Invalid frontmatter in content/guides/${slug}.mdx:\n${issues}\n\n` +
        'Build halted. Fix the frontmatter or remove the article.',
    )
  }

  return { slug, frontmatter: result.data, content }
}

export async function getArticleBySlug(slug: string): Promise<GuideArticle | null> {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`)
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return parseAndValidate(slug, raw)
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: unknown }).code === 'ENOENT'
    ) {
      return null
    }
    throw error
  }
}

export async function getAllArticles(): Promise<GuideArticle[]> {
  let entries: string[]
  try {
    entries = await fs.readdir(GUIDES_DIR)
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: unknown }).code === 'ENOENT'
    ) {
      return []
    }
    throw error
  }

  const mdxFiles = entries.filter((f) => f.endsWith('.mdx'))

  const articles = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = slugFromFilename(filename)
      const raw = await fs.readFile(path.join(GUIDES_DIR, filename), 'utf8')
      return parseAndValidate(slug, raw)
    }),
  )

  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime(),
  )
}

export async function getAllSlugs(): Promise<string[]> {
  const articles = await getAllArticles()
  return articles.map((a) => a.slug)
}
