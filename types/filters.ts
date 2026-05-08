import type { LocationArea, AccommodationType } from './database'

export type AccommodationLocationFilter = 'all' | LocationArea
export type AccommodationTypeFilter = 'all' | AccommodationType
export type WifiMinSpeed = 0 | 5 | 10 | 20 | 50
export type DistanceToBeach = 500 | 1000 | 2000 | null

export interface AccommodationFilters {
  location: AccommodationLocationFilter
  type: AccommodationTypeFilter
  priceMin: number
  priceMax: number
  wifiMinSpeed: WifiMinSpeed
  hasDesk: boolean
  hasPool: boolean
  distanceToBeach: DistanceToBeach
}

export const DEFAULT_FILTERS: AccommodationFilters = {
  location: 'all',
  type: 'all',
  priceMin: 0,
  priceMax: 200,
  wifiMinSpeed: 0,
  hasDesk: false,
  hasPool: false,
  distanceToBeach: null,
}

export const LOCATION_LABELS: Record<LocationArea, string> = {
  batu_karas: 'Batu Karas',
  pangandaran_beach: 'Pangandaran Beach',
  cijulang: 'Cijulang',
  karapyak: 'Karapyak',
  madasari: 'Madasari',
  batu_hiu: 'Batu Hiu',
  parigi: 'Parigi',
}

export const TYPE_LABELS: Record<AccommodationType, string> = {
  homestay: 'Homestay',
  villa: 'Villa',
  surf_camp: 'Surf Camp',
  guesthouse: 'Guesthouse',
}
