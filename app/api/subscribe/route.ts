import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const subscribeSchema = z.object({
  email: z.string().email().max(254),
  source: z.string().max(64).optional(),
  // Honeypot — bots fill this, humans never see it. Must be empty.
  website: z.string().max(0, 'spam').optional().default(''),
})

function getClientIp(request: NextRequest): string | null {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) {
    const first = xff.split(',')[0]?.trim()
    if (first) return first
  }
  return request.headers.get('x-real-ip')
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = subscribeSchema.safeParse(body)
  if (!parsed.success) {
    // Honeypot trip looks identical to a regular submit error to the bot.
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
  }

  const { email, source } = parsed.data
  const ip = getClientIp(request)

  const normalizedEmail = email.toLowerCase()

  const { error: insertError } = await supabaseAdmin.from('subscribers').insert({
    email: normalizedEmail,
    source: source ?? 'homepage',
    ip_address: ip,
  })

  let shouldSendWelcome = !insertError

  // 23505 = unique violation. Email already exists. If previously unsubscribed,
  // reactivate the row (clear unsubscribed_at) and trigger welcome email.
  // If still active, silent success — response identical for new/existing.
  if (insertError && insertError.code === '23505') {
    const { data: reactivated, error: updateError } = await supabaseAdmin
      .from('subscribers')
      .update({
        unsubscribed_at: null,
        source: source ?? 'homepage',
        ip_address: ip,
      })
      .eq('email', normalizedEmail)
      .not('unsubscribed_at', 'is', null)
      .select('id')
      .maybeSingle()

    if (updateError) {
      console.error('subscribe reactivate error', {
        code: updateError.code,
        message: updateError.message,
      })
      return NextResponse.json(
        { ok: false, error: "Couldn't save your email — please try again." },
        { status: 500 },
      )
    }

    if (reactivated) shouldSendWelcome = true
  } else if (insertError) {
    console.error('subscribe error', { code: insertError.code, message: insertError.message })
    return NextResponse.json(
      { ok: false, error: "Couldn't save your email — please try again." },
      { status: 500 },
    )
  }

  // Send welcome email — fire-and-forget, don't block the response
  if (shouldSendWelcome) {
    resend.emails
      .send({
        from: 'Hi Pangandaran <hello@hipangandaran.com>',
        to: email,
        replyTo: 'amaralfatah.me@gmail.com',
        subject: "You're on the list — here's what's coming",
        html: `
<p>Hey,</p>
<p>Thanks for subscribing to Hi Pangandaran. You'll get a short email when a new guide goes live — no spam, no weekly newsletters, just the good stuff.</p>
<p>In the meantime, here are a few guides worth reading:</p>
<ul>
  <li><a href="https://hipangandaran.com/guides/batu-karas-surf-guide">Batu Karas Surf Guide</a></li>
  <li><a href="https://hipangandaran.com/guides/green-canyon-complete-guide">Green Canyon Complete Guide</a></li>
  <li><a href="https://hipangandaran.com/guides/pangandaran-3-day-itinerary">3-Day Pangandaran Itinerary</a></li>
</ul>
<p>See you soon,<br>Hi Pangandaran</p>
<p style="font-size:12px;color:#888">You subscribed at hipangandaran.com. <a href="https://hipangandaran.com/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>.</p>
        `.trim(),
      })
      .catch((err: unknown) => {
        console.error('Resend welcome email failed', { email, err })
      })
  }

  return NextResponse.json({ ok: true })
}
