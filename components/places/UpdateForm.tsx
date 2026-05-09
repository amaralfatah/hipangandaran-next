'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog'
import { cn } from '@/lib/utils'
import type { PlaceType } from '@/types/database'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const FIELD_OPTIONS: { value: string; label: string }[] = [
  { value: 'wifi_speed', label: 'WiFi speed changed' },
  { value: 'price', label: 'Price changed' },
  { value: 'hours', label: 'Opening hours changed' },
  { value: 'closed_permanently', label: 'Closed permanently' },
  { value: 'other', label: 'Other' },
]

export interface UpdateFormProps {
  place: { id: string; type: PlaceType; name: string }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateForm({ place, open, onOpenChange }: UpdateFormProps) {
  const [fieldUpdated, setFieldUpdated] = useState<string>('wifi_speed')
  const [newValue, setNewValue] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (honeypot.length > 0) {
      setStatus('success')
      setMessage('Thanks — submitted.')
      return
    }

    if (newValue.trim().length === 0) {
      setStatus('error')
      setMessage('Please describe what changed.')
      return
    }

    setStatus('submitting')
    setMessage('')

    try {
      const res = await fetch('/api/report-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeType: place.type,
          placeId: place.id,
          fieldUpdated,
          newValue,
          email: email || undefined,
          honeypot,
        }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setStatus('error')
        setMessage(data?.error ?? "Couldn't submit — please try again.")
        return
      }

      setStatus('success')
      setMessage('Thanks — we’ll review and update.')
      setNewValue('')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Network hiccup — please try again.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-auto bottom-0 max-w-md translate-y-0 rounded-t-3xl rounded-b-none p-6 sm:top-1/2 sm:bottom-auto sm:translate-y-[-50%] sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle>Report an update</DialogTitle>
          <DialogDescription>{place.name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} noValidate className="mt-2 space-y-4">
          <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>

          <div>
            <label className="text-charcoal/85 mb-1.5 block text-xs font-semibold tracking-wide uppercase">
              What changed?
            </label>
            <select
              value={fieldUpdated}
              onChange={(e) => setFieldUpdated(e.target.value)}
              className="border-charcoal/15 bg-cream text-charcoal focus-visible:border-ocean focus-visible:ring-ocean/40 h-11 w-full rounded-full border px-4 text-sm focus-visible:ring-2 focus-visible:outline-none"
            >
              {FIELD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-charcoal/85 mb-1.5 block text-xs font-semibold tracking-wide uppercase">
              New value or detail
            </label>
            <textarea
              required
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="e.g. WiFi now 35 Mbps measured Apr 2026"
              className="border-charcoal/15 bg-cream text-charcoal placeholder:text-charcoal/40 focus-visible:border-ocean focus-visible:ring-ocean/40 w-full rounded-2xl border px-4 py-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
            />
          </div>

          <div>
            <label className="text-charcoal/85 mb-1.5 block text-xs font-semibold tracking-wide uppercase">
              Your email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              className="border-charcoal/15 bg-cream text-charcoal placeholder:text-charcoal/40 focus-visible:border-ocean focus-visible:ring-ocean/40 h-11 w-full rounded-full border px-4 text-sm focus-visible:ring-2 focus-visible:outline-none"
            />
            <p className="text-charcoal/55 mt-1.5 text-xs">
              So we can ask follow-up questions if needed.
            </p>
          </div>

          {message && (
            <p
              role={status === 'error' ? 'alert' : 'status'}
              className={cn('text-sm', status === 'error' ? 'text-error' : 'text-forest')}
            >
              {message}
            </p>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'submitting' || status === 'success'}
              className="flex-1"
            >
              {status === 'submitting' ? 'Sending…' : status === 'success' ? 'Submitted' : 'Submit'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
