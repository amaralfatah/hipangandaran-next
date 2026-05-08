'use client'

import { useState, useSyncExternalStore, type FormEvent } from 'react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

// Hydration guard — server returns false, client returns true after hydrate.
// Prevents native form submission before React attaches handlers.
const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

type Status = 'idle' | 'submitting' | 'success' | 'error'

export interface EmailCaptureProps {
  heading?: string
  description?: string
  className?: string
  source?: string
}

export function EmailCapture({
  heading = 'Get the next guide in your inbox',
  description = 'One short email when a new article goes live. No spam, unsubscribe anytime.',
  className,
  source = 'homepage',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const hydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Honeypot trip — silently succeed without contacting API
    if (website.length > 0) {
      setStatus('success')
      setMessage("Thanks — you're in.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('That email looks off — mind double-checking?')
      return
    }

    setStatus('submitting')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, website }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setStatus('error')
        setMessage(
          data?.error ??
            "Couldn't save your email — please try again or email hello@hipangandaran.com.",
        )
        return
      }

      setStatus('success')
      setMessage("You're on the list — see you soon.")
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Network hiccup — please try again in a moment.')
    }
  }

  return (
    <section
      className={cn('border-charcoal/10 bg-sand/40 rounded-3xl border p-6 md:p-10', className)}
    >
      <h2 className="text-charcoal font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
        {heading}
      </h2>
      <p className="text-charcoal/75 mt-2 max-w-xl text-sm md:text-base">{description}</p>

      <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-3 sm:flex-row">
        {/* Honeypot — must stay invisible to humans, visible to bots */}
        <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          Website (leave empty)
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>

        <div className="flex-1">
          <label htmlFor="email-capture" className="sr-only">
            Email address
          </label>
          <input
            id="email-capture"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting' || status === 'success'}
            className={cn(
              'border-charcoal/15 bg-cream text-charcoal h-11 w-full rounded-full border px-5 text-sm',
              'placeholder:text-charcoal/40',
              'focus-visible:border-ocean focus-visible:ring-ocean/40 focus-visible:ring-2 focus-visible:outline-none',
              'disabled:opacity-60',
            )}
            aria-invalid={status === 'error'}
            aria-describedby={message ? 'email-capture-msg' : undefined}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={!hydrated || status === 'submitting' || status === 'success'}
        >
          {status === 'submitting' ? 'Sending…' : status === 'success' ? 'Subscribed' : 'Subscribe'}
        </Button>
      </form>

      {message && (
        <p
          id="email-capture-msg"
          role={status === 'error' ? 'alert' : 'status'}
          className={cn('mt-3 text-sm', status === 'error' ? 'text-error' : 'text-forest')}
        >
          {message}
        </p>
      )}
    </section>
  )
}
