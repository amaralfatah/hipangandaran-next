// Hand-written types for Phase 1 + Phase 2.
// Regenerate via `supabase gen types typescript --project-id <id> > types/database.ts`
// once the Supabase CLI is wired up.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type LocationArea =
  | 'batu_karas'
  | 'pangandaran_beach'
  | 'cijulang'
  | 'karapyak'
  | 'madasari'
  | 'batu_hiu'
  | 'parigi'

export type LocationZone = 'core' | 'extended'
export type AccommodationType = 'homestay' | 'villa' | 'surf_camp' | 'guesthouse'
export type PriceRange = 'budget' | 'mid' | 'upscale'
export type PlaceType = 'accommodation' | 'cafe'
export type UpdateStatus = 'pending' | 'approved' | 'rejected'

export interface Database {
  public: {
    Tables: {
      subscribers: {
        Row: {
          id: string
          email: string
          source: string | null
          ip_address: string | null
          unsubscribed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          source?: string | null
          ip_address?: string | null
          unsubscribed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          source?: string | null
          ip_address?: string | null
          unsubscribed_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      accommodations: {
        Row: {
          id: string
          name: string
          slug: string
          type: AccommodationType
          location_area: LocationArea
          location_zone: LocationZone
          price_min_usd: number
          price_max_usd: number
          wifi_speed_mbps: number | null
          has_desk: boolean
          has_pool: boolean
          distance_to_beach_m: number
          google_maps_url: string | null
          booking_affiliate_url: string | null
          description: string | null
          images: string[]
          verified_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          type: AccommodationType
          location_area: LocationArea
          location_zone: LocationZone
          price_min_usd: number
          price_max_usd: number
          wifi_speed_mbps?: number | null
          has_desk?: boolean
          has_pool?: boolean
          distance_to_beach_m: number
          google_maps_url?: string | null
          booking_affiliate_url?: string | null
          description?: string | null
          images?: string[]
          verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['accommodations']['Insert']>
        Relationships: []
      }
      cafes: {
        Row: {
          id: string
          name: string
          slug: string
          location_area: LocationArea
          wifi_speed_mbps: number | null
          power_outlets: boolean
          opens_at: string | null
          closes_at: string | null
          price_range: PriceRange | null
          instagram_url: string | null
          google_maps_url: string | null
          latitude: number | null
          longitude: number | null
          last_verified_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          location_area: LocationArea
          wifi_speed_mbps?: number | null
          power_outlets?: boolean
          opens_at?: string | null
          closes_at?: string | null
          price_range?: PriceRange | null
          instagram_url?: string | null
          google_maps_url?: string | null
          latitude?: number | null
          longitude?: number | null
          last_verified_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['cafes']['Insert']>
        Relationships: []
      }
      place_updates: {
        Row: {
          id: string
          place_type: PlaceType
          place_id: string
          field_updated: string
          new_value: string
          submitted_by_email: string | null
          status: UpdateStatus
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          place_type: PlaceType
          place_id: string
          field_updated: string
          new_value: string
          submitted_by_email?: string | null
          status?: UpdateStatus
          ip_address?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['place_updates']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
