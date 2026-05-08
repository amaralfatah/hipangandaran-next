import { supabaseAdmin } from '@/lib/supabase/server'
import { CafeForm } from '@/components/admin/CafeForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CafeEditPage({ params }: PageProps) {
  const { id } = await params
  const isNew = id === 'new'

  let cafe = null
  if (!isNew) {
    const { data } = await supabaseAdmin.from('cafes').select('*').eq('id', id).single()
    if (!data) notFound()
    cafe = data
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/cafes" className="text-sm text-gray-500 hover:text-gray-700">
          ← Cafes
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">
          {isNew ? 'New Cafe' : `Edit: ${cafe!.name}`}
        </h1>
      </div>
      <CafeForm cafe={cafe ?? undefined} />
    </div>
  )
}
