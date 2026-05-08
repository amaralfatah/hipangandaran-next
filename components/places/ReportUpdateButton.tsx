'use client'

import { useState } from 'react'
import { UpdateForm } from './UpdateForm'
import type { PlaceType } from '@/types/database'

export function ReportUpdateButton({
  place,
}: {
  place: { id: string; type: PlaceType; name: string }
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-charcoal/70 hover:text-ocean underline-offset-4 hover:underline"
      >
        Report update
      </button>
      {open && <UpdateForm place={place} onClose={() => setOpen(false)} />}
    </>
  )
}
