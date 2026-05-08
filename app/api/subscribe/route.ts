import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/server'

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

  const { error } = await supabaseAdmin.from('subscribers').insert({
    email: email.toLowerCase(),
    source: source ?? 'homepage',
    ip_address: ip,
  })

  // 23505 = unique violation. Don't reveal that the email already exists —
  // return success so the response is identical for new and existing addresses.
  if (error && error.code !== '23505') {
    console.error('subscribe error', { code: error.code, message: error.message })
    return NextResponse.json(
      { ok: false, error: "Couldn't save your email — please try again." },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
