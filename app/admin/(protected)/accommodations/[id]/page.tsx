import { supabaseAdmin } from '@/lib/supabase/server'
import { AccommodationForm } from '@/components/admin/AccommodationForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AccommodationEditPage({ params }: PageProps) {
  const { id } = await params
  const isNew = id === 'new'

  let accommodation = null
  if (!isNew) {
    const { data } = await supabaseAdmin.from('accommodations').select('*').eq('id', id).single()
    if (!data) notFound()
    accommodation = data
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/accommodations" className="text-sm text-gray-500 hover:text-gray-700">
          ← Accommodations
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">
          {isNew ? 'New Accommodation' : `Edit: ${accommodation!.name}`}
        </h1>
      </div>
      <AccommodationForm accommodation={accommodation ?? undefined} />
    </div>
  )
}
