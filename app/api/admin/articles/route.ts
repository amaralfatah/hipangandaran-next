import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import { z } from 'zod'

export const runtime = 'nodejs'

const articleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(160),
  category: z.enum(['transport', 'accommodation', 'activities', 'food', 'nomad', 'planning']),
  author: z.string().min(2),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  readingTime: z.number().int().positive(),
  featuredImage: z.string().startsWith('/'),
  featuredImageAlt: z.string().min(10),
  affiliateDisclosure: z.boolean(),
  content: z.string().min(1),
})

const deleteSchema = z.object({ slug: z.string().min(1) })

function filePath(slug: string) {
  return path.join(process.cwd(), 'content', 'guides', `${slug}.mdx`)
}

function buildMdx(data: z.infer<typeof articleSchema>) {
  const { content, slug: _slug, ...fm } = data
  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  const frontmatter = [
    '---',
    `title: "${escape(fm.title)}"`,
    `description: "${escape(fm.description)}"`,
    `publishedAt: "${fm.publishedAt}"`,
    `updatedAt: "${fm.updatedAt}"`,
    `category: ${fm.category}`,
    `readingTime: ${fm.readingTime}`,
    `featuredImage: ${fm.featuredImage}`,
    `featuredImageAlt: "${escape(fm.featuredImageAlt)}"`,
    `affiliateDisclosure: ${fm.affiliateDisclosure}`,
    `author: "${escape(fm.author)}"`,
    '---',
  ].join('\n')
  return `${frontmatter}\n\n${content}`
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } },
  )
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function POST(req: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body: unknown = await req.json()
    const data = articleSchema.parse(body)
    await writeFile(filePath(data.slug), buildMdx(data), 'utf8')
    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
    console.error('articles POST error:', e)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body: unknown = await req.json()
    const data = articleSchema.parse(body)
    await writeFile(filePath(data.slug), buildMdx(data), 'utf8')
    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
    console.error('articles PUT error:', e)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body: unknown = await req.json()
    const { slug } = deleteSchema.parse(body)
    await unlink(filePath(slug))
    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
    console.error('articles DELETE error:', e)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}
