'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function PlaceUpdateActions({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)

  async function handleAction(action: 'approve' | 'reject') {
    setLoading(action)
    await fetch('/api/admin/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
    })
    setLoading(null)
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleAction('approve')}
        disabled={loading !== null}
        className="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 transition-colors hover:bg-green-200 disabled:opacity-50"
      >
        {loading === 'approve' ? '…' : 'Approve'}
      </button>
      <button
        onClick={() => handleAction('reject')}
        disabled={loading !== null}
        className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 disabled:opacity-50"
      >
        {loading === 'reject' ? '…' : 'Reject'}
      </button>
    </div>
  )
}
