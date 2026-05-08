import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const baseSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  location_area: z.enum([
    'batu_karas',
    'pangandaran_beach',
    'cijulang',
    'karapyak',
    'madasari',
    'batu_hiu',
    'parigi',
  ]),
  wifi_speed_mbps: z.number().nonnegative().nullable(),
  power_outlets: z.boolean(),
  opens_at: z.string().nullable(),
  closes_at: z.string().nullable(),
  price_range: z.enum(['budget', 'mid', 'upscale']).nullable(),
  instagram_url: z.string().nullable(),
  google_maps_url: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  last_verified_at: z.string().nullable(),
})

const createSchema = baseSchema
const updateSchema = baseSchema.extend({ id: z.string().uuid() })
const deleteSchema = z.object({ id: z.string().uuid() })

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } },
  )
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function POST(req: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body: unknown = await req.json()
    const data = createSchema.parse(body)
    const { error } = await supabaseAdmin.from('cafes').insert(data)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
    console.error('cafes POST error:', e)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body: unknown = await req.json()
    const { id, ...data } = updateSchema.parse(body)
    const { error } = await supabaseAdmin.from('cafes').update(data).eq('id', id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
    console.error('cafes PUT error:', e)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body: unknown = await req.json()
    const { id } = deleteSchema.parse(body)
    const { error } = await supabaseAdmin.from('cafes').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
    console.error('cafes DELETE error:', e)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}
