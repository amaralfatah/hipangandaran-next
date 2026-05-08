'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
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
  onClose: () => void
}

export function UpdateForm({ place, onClose }: UpdateFormProps) {
  const [fieldUpdated, setFieldUpdated] = useState<string>('wifi_speed')
  const [newValue, setNewValue] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

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
      setMessage('Thanks — we&rsquo;ll review and update.')
      setNewValue('')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Network hiccup — please try again.')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-form-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="bg-charcoal/40 absolute inset-0"
      />
      <div className="bg-cream relative w-full max-w-md rounded-t-3xl p-6 md:rounded-3xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              id="update-form-title"
              className="font-[family-name:var(--font-display)] text-xl font-semibold"
            >
              Report an update
            </h3>
            <p className="text-charcoal/65 mt-1 text-sm">{place.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-charcoal/60 hover:text-charcoal text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
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
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
