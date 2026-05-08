'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SubscriberActions({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleUnsubscribe() {
    setLoading(true)
    await fetch('/api/admin/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleUnsubscribe}
      disabled={loading}
      className="rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-50"
    >
      {loading ? '…' : 'Unsubscribe'}
    </button>
  )
}
