import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export interface Heading {
  level: 2 | 3
  text: string
  slug: string
}

export function extractHeadings(mdx: string): Heading[] {
  const stripped = mdx.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')

  const headings: Heading[] = []
  const seen = new Map<string, number>()
  const regex = /^(#{2,3})\s+(.+?)\s*$/gm

  let match: RegExpExecArray | null
  while ((match = regex.exec(stripped)) !== null) {
    const hashes = match[1]
    const raw = match[2]
    if (!hashes || !raw) continue
    const level = hashes.length === 2 ? 2 : 3
    const text = raw.replace(/[*_`]/g, '').trim()
    let slug = slugify(text)
    const count = seen.get(slug) ?? 0
    seen.set(slug, count + 1)
    if (count > 0) slug = `${slug}-${count}`
    headings.push({ level, text, slug })
  }

  return headings
}

export function reactChildrenToString(children: unknown): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(reactChildrenToString).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    const props = (children as { props?: { children?: unknown } }).props
    return reactChildrenToString(props?.children)
  }
  return ''
}

export function formatVerificationDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
