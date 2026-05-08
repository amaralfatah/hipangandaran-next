'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DeleteButton } from '@/components/admin/DeleteButton'

export function ArticleRowActions({ slug }: { slug: string }) {
  const router = useRouter()

  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/articles/${slug}`}
        className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200"
      >
        Edit
      </Link>
      <DeleteButton
        onDelete={async () => {
          await fetch('/api/admin/articles', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug }),
          })
          router.refresh()
        }}
      />
    </div>
  )
}
