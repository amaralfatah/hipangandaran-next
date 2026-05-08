// Hand-written types for Phase 1 (subscribers only).
// Regenerate via `supabase gen types typescript --project-id <id> > types/database.ts`
// once the Supabase CLI is wired up.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

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
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
