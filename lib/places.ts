import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

export type Accommodation = Database['public']['Tables']['accommodations']['Row']
export type Cafe = Database['public']['Tables']['cafes']['Row']

const IDR_PER_USD = 15500 // rough — display only, not for transactions

export async function getAllAccommodations(): Promise<Accommodation[]> {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .order('price_min_usd', { ascending: true })
  if (error) {
    console.error('getAllAccommodations', error)
    return []
  }
  return data ?? []
}

export async function getAccommodationBySlug(slug: string): Promise<Accommodation | null> {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()
  if (error) {
    console.error('getAccommodationBySlug', error)
    return null
  }
  return data
}

export async function getAllCafes(): Promise<Cafe[]> {
  const { data, error } = await supabase
    .from('cafes')
    .select('*')
    .order('name', { ascending: true })
  if (error) {
    console.error('getAllCafes', error)
    return []
  }
  return data ?? []
}

export async function getCafeBySlug(slug: string): Promise<Cafe | null> {
  const { data, error } = await supabase.from('cafes').select('*').eq('slug', slug).maybeSingle()
  if (error) {
    console.error('getCafeBySlug', error)
    return null
  }
  return data
}

export async function getAllPlaceSlugs(): Promise<
  { slug: string; type: 'accommodation' | 'cafe' }[]
> {
  const [a, c] = await Promise.all([
    supabase.from('accommodations').select('slug'),
    supabase.from('cafes').select('slug'),
  ])
  return [
    ...(a.data ?? []).map((r) => ({ slug: r.slug, type: 'accommodation' as const })),
    ...(c.data ?? []).map((r) => ({ slug: r.slug, type: 'cafe' as const })),
  ]
}

export function formatPriceRangeUsd(min: number, max: number): string {
  if (min === max) return `$${min}/night`
  return `$${min}–${max}/night`
}

export function formatPriceRangeIdr(min: number, max: number): string {
  const rmin = Math.round((min * IDR_PER_USD) / 1000)
  const rmax = Math.round((max * IDR_PER_USD) / 1000)
  if (rmin === rmax) return `~Rp ${rmin}k`
  return `~Rp ${rmin}k–${rmax}k`
}

export function formatDistanceToBeach(meters: number): string {
  if (meters < 1000) return `${meters}m to beach`
  return `${(meters / 1000).toFixed(1)}km to beach`
}

export type WifiBucket = 'none' | 'slow' | 'ok' | 'fast'

export function wifiBucket(mbps: number | null): WifiBucket {
  if (mbps == null) return 'none'
  if (mbps < 10) return 'slow'
  if (mbps < 25) return 'ok'
  return 'fast'
}

export function formatTimeRange(opensAt: string | null, closesAt: string | null): string {
  if (!opensAt || !closesAt) return 'Hours unknown'
  return `${opensAt.slice(0, 5)} – ${closesAt.slice(0, 5)}`
}
