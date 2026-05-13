import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { supabaseAdmin } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Unsubscribe from the Hi Pangandaran newsletter.',
  robots: { index: false, follow: false },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function unsubscribeAction(formData: FormData) {
  'use server'

  const raw = formData.get('email')
  const email = typeof raw === 'string' ? raw.trim().toLowerCase() : ''

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    redirect('/unsubscribe?status=invalid')
  }

  const { error } = await supabaseAdmin
    .from('subscribers')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('email', email)
    .is('unsubscribed_at', null)

  if (error) {
    console.error('unsubscribe error', { code: error.code, message: error.message })
    redirect('/unsubscribe?status=error')
  }

  // Always redirect to success — don't reveal whether the email was in the DB.
  redirect(`/unsubscribe?status=done&email=${encodeURIComponent(email)}`)
}

interface SearchParams {
  email?: string
  status?: string
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { email = '', status } = await searchParams

  if (status === 'done') {
    return (
      <Shell>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          You&rsquo;re unsubscribed
        </h1>
        <p className="text-charcoal/75 mt-4 max-w-xl">
          {email ? (
            <>
              We&rsquo;ve removed <strong>{email}</strong> from the list.{' '}
            </>
          ) : null}
          You won&rsquo;t get any more emails from us. If you change your mind, you can resubscribe
          from the homepage.
        </p>
        <p className="mt-8">
          <Link href="/" className="text-ocean underline-offset-4 hover:underline">
            ← Back to home
          </Link>
        </p>
      </Shell>
    )
  }

  if (status === 'error') {
    return (
      <Shell>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          Something went wrong
        </h1>
        <p className="text-charcoal/75 mt-4 max-w-xl">
          We couldn&rsquo;t process your unsubscribe right now. Please try again, or email{' '}
          <a
            href="mailto:hello@hipangandaran.com"
            className="text-ocean underline-offset-4 hover:underline"
          >
            hello@hipangandaran.com
          </a>{' '}
          and we&rsquo;ll remove you manually.
        </p>
      </Shell>
    )
  }

  const invalid = status === 'invalid'

  return (
    <Shell>
      <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
        Unsubscribe
      </h1>
      <p className="text-charcoal/75 mt-4 max-w-xl">
        Confirm the email below to remove yourself from the Hi Pangandaran newsletter. No questions
        asked.
      </p>

      <form action={unsubscribeAction} className="mt-8 max-w-md space-y-4">
        <div>
          <label
            htmlFor="unsub-email"
            className="text-charcoal/70 mb-1 block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase"
          >
            Email address
          </label>
          <input
            id="unsub-email"
            name="email"
            type="email"
            required
            defaultValue={email}
            placeholder="you@example.com"
            className="border-charcoal/15 bg-cream text-charcoal placeholder:text-charcoal/40 focus-visible:border-ocean focus-visible:ring-ocean/40 h-11 w-full rounded-full border px-5 text-sm focus-visible:ring-2 focus-visible:outline-none"
            aria-invalid={invalid}
          />
          {invalid && (
            <p className="text-error mt-2 text-sm">That email looks off — mind double-checking?</p>
          )}
        </div>

        <Button type="submit" variant="primary">
          Unsubscribe
        </Button>
      </form>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Unsubscribe' }]} />
      <header className="mt-6">
        <p className="text-ocean font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
          Newsletter
        </p>
        {children}
      </header>
    </div>
  )
}
