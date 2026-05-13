'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'
import type { GuideFrontmatter } from '@/lib/mdx'

interface Props {
  initialSlug?: string
  initialFrontmatter?: GuideFrontmatter
  initialContent?: string
}

interface FormState {
  slug: string
  title: string
  description: string
  category: GuideFrontmatter['category']
  author: string
  publishedAt: string
  updatedAt: string
  readingTime: string
  featuredImage: string
  featuredImageAlt: string
  affiliateDisclosure: boolean
  content: string
}

const inputCls =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-500">{label}</label>
      {children}
    </div>
  )
}

export function ArticleForm({ initialSlug, initialFrontmatter, initialContent }: Props) {
  const router = useRouter()
  const isEdit = !!initialSlug
  const today = new Date().toISOString().slice(0, 10)

  const [form, setForm] = useState<FormState>({
    slug: initialSlug ?? '',
    title: initialFrontmatter?.title ?? '',
    description: initialFrontmatter?.description ?? '',
    category: initialFrontmatter?.category ?? 'planning',
    author: initialFrontmatter?.author ?? '',
    publishedAt: initialFrontmatter?.publishedAt ?? today,
    updatedAt: initialFrontmatter?.updatedAt ?? today,
    readingTime: initialFrontmatter?.readingTime?.toString() ?? '',
    featuredImage: initialFrontmatter?.featuredImage ?? '',
    featuredImageAlt: initialFrontmatter?.featuredImageAlt ?? '',
    affiliateDisclosure: initialFrontmatter?.affiliateDisclosure ?? false,
    content: initialContent ?? '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value
    setForm((f) => ({ ...f, title, ...(!isEdit && { slug: slugify(title) }) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const body = {
      slug: form.slug,
      title: form.title,
      description: form.description,
      category: form.category,
      author: form.author,
      publishedAt: form.publishedAt,
      updatedAt: form.updatedAt,
      readingTime: Number(form.readingTime),
      featuredImage: form.featuredImage,
      featuredImageAlt: form.featuredImageAlt,
      affiliateDisclosure: form.affiliateDisclosure,
      content: form.content,
    }

    const res = await fetch('/api/admin/articles', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = (await res.json()) as { ok: boolean; error?: string }

    if (!data.ok) {
      setError(data.error ?? 'Something went wrong')
      setLoading(false)
      return
    }

    router.push('/admin/articles')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        ⚠️ Article edits write to the local filesystem. This only works in local dev — changes will
        not persist on Vercel production.
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Title * (10–100 chars)">
          <input
            type="text"
            required
            minLength={10}
            maxLength={100}
            value={form.title}
            onChange={handleTitleChange}
            className={inputCls}
          />
        </Field>
        <Field label="Slug *">
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            disabled={isEdit}
            className={`${inputCls} ${isEdit ? 'cursor-not-allowed bg-gray-50 text-gray-400' : ''}`}
          />
        </Field>
      </div>

      <Field label="Description * (50–160 chars)">
        <textarea
          required
          minLength={50}
          maxLength={160}
          rows={2}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Category *">
          <select
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                category: e.target.value as GuideFrontmatter['category'],
              }))
            }
            className={inputCls}
          >
            {(
              ['transport', 'accommodation', 'activities', 'food', 'nomad', 'planning'] as const
            ).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Author *">
          <input
            type="text"
            required
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Reading Time (min) *">
          <input
            type="number"
            required
            min={1}
            value={form.readingTime}
            onChange={(e) => setForm((f) => ({ ...f, readingTime: e.target.value }))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Published At *">
          <input
            type="date"
            required
            value={form.publishedAt}
            onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Updated At *">
          <input
            type="date"
            required
            value={form.updatedAt}
            onChange={(e) => setForm((f) => ({ ...f, updatedAt: e.target.value }))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Featured Image * (starts with /)">
          <input
            type="text"
            required
            value={form.featuredImage}
            onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Featured Image Alt * (10+ chars)">
          <input
            type="text"
            required
            minLength={10}
            value={form.featuredImageAlt}
            onChange={(e) => setForm((f) => ({ ...f, featuredImageAlt: e.target.value }))}
            className={inputCls}
          />
        </Field>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.affiliateDisclosure}
          onChange={(e) => setForm((f) => ({ ...f, affiliateDisclosure: e.target.checked }))}
          className="rounded"
        />
        Affiliate Disclosure
      </label>

      <Field label="MDX Content *">
        <textarea
          required
          rows={24}
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          className={`${inputCls} font-mono text-xs`}
        />
      </Field>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Article'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/articles')}
          className="rounded px-5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
