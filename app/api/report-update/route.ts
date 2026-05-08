import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const updateSchema = z.object({
  placeType: z.enum(['accommodation', 'cafe']),
  placeId: z.string().uuid(),
  fieldUpdated: z.enum(['wifi_speed', 'price', 'hours', 'closed_permanently', 'other']),
  newValue: z.string().min(1).max(500),
  email: z.string().email().max(254).optional().or(z.literal('')),
  honeypot: z.string().max(0, 'spam').optional().default(''),
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

  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
  }

  const { placeType, placeId, fieldUpdated, newValue, email } = parsed.data
  const ip = getClientIp(request)

  const { error } = await supabaseAdmin.from('place_updates').insert({
    place_type: placeType,
    place_id: placeId,
    field_updated: fieldUpdated,
    new_value: newValue,
    submitted_by_email: email && email.length > 0 ? email.toLowerCase() : null,
    ip_address: ip,
  })

  if (error) {
    console.error('report-update error', { code: error.code, message: error.message })
    return NextResponse.json(
      { ok: false, error: "Couldn't submit — please try again." },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
