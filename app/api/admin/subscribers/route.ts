import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const schema = z.object({ id: z.string().uuid() })

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
    const { id } = schema.parse(body)
    const { error } = await supabaseAdmin
      .from('subscribers')
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
    console.error('subscribers POST error:', e)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}
