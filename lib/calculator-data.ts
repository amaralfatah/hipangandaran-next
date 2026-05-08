export const CALCULATOR_DATA = {
  lastUpdated: '2026-05',
  exchangeRate: 16000,
  transport: {
    jakarta: { budget: 150_000, mid: 250_000, comfort: 450_000 },
    bandung: { budget: 100_000, mid: 180_000, comfort: 350_000 },
    yogyakarta: { budget: 120_000, mid: 220_000, comfort: 400_000 },
    surabaya: { budget: 200_000, mid: 350_000, comfort: 600_000 },
    other: { budget: 175_000, mid: 275_000, comfort: 500_000 },
  },
  accommodation: {
    budget: { min: 100_000, max: 250_000 },
    mid: { min: 250_000, max: 600_000 },
    comfort: { min: 600_000, max: 1_500_000 },
  },
  food: { budget: 90_000, mid: 200_000, comfort: 400_000 },
  localTransport: { budget: 30_000, mid: 50_000, comfort: 80_000 },
  activities: {
    surfing_lesson: 350_000,
    green_canyon: 250_000,
    citumang: 150_000,
    boat_trip: 200_000,
  },
} as const

export type BudgetStyle = 'budget' | 'mid' | 'comfort'
export type OriginCity = 'jakarta' | 'bandung' | 'yogyakarta' | 'surabaya' | 'other'
export type ActivityKey = 'surfing_lesson' | 'green_canyon' | 'citumang' | 'boat_trip'

export interface CalculatorInputs {
  travelers: number
  days: number
  budgetStyle: BudgetStyle
  origin: OriginCity
  activities: ActivityKey[]
}

export interface CostBreakdown {
  transport: number
  accommodation: number
  food: number
  activities: number
  localTransport: number
  total: number
  totalUsd: number
}

export function calculate(inputs: CalculatorInputs): CostBreakdown {
  const { travelers, days, budgetStyle, origin, activities } = inputs
  const d = CALCULATOR_DATA

  const transport = d.transport[origin][budgetStyle] * travelers

  const accRange = d.accommodation[budgetStyle]
  const accPerNight = Math.round((accRange.min + accRange.max) / 2)
  const accommodation = accPerNight * days

  const food = d.food[budgetStyle] * days * travelers

  const activitiesCost = activities.reduce((sum, key) => sum + d.activities[key] * travelers, 0)

  const localTransport = d.localTransport[budgetStyle] * days

  const total = transport + accommodation + food + activitiesCost + localTransport
  const totalUsd = Math.round(total / d.exchangeRate)

  return {
    transport,
    accommodation,
    food,
    activities: activitiesCost,
    localTransport,
    total,
    totalUsd,
  }
}

export function formatRp(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID')
}
