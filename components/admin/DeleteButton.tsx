'use client'

import { useState } from 'react'

export function DeleteButton({
  onDelete,
  label = 'Delete',
}: {
  onDelete: () => Promise<void>
  label?: string
}) {
  const [state, setState] = useState<'idle' | 'confirm' | 'loading'>('idle')

  function handleDeleteClick() {
    setState('confirm')
    setTimeout(() => setState((s) => (s === 'confirm' ? 'idle' : s)), 5000)
  }

  async function handleConfirm() {
    setState('loading')
    await onDelete()
    setState('idle')
  }

  if (state === 'loading') {
    return <span className="px-3 py-1 text-xs text-gray-400">Deleting…</span>
  }

  if (state === 'confirm') {
    return (
      <div className="flex gap-1">
        <button
          onClick={() => setState('idle')}
          className="rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-200"
        >
          Confirm delete?
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleDeleteClick}
      className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-200"
    >
      {label}
    </button>
  )
}
