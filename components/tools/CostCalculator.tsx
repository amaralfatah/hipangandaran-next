'use client'

import { useState, type FormEvent, type ComponentType, type SVGProps } from 'react'
import { Backpack, Building2, Sofa, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CALCULATOR_DATA,
  calculate,
  formatRp,
  type ActivityKey,
  type BudgetStyle,
  type CalculatorInputs,
  type CostBreakdown,
  type OriginCity,
} from '@/lib/calculator-data'
import { Button } from '@/components/ui/Button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select'

// ─── Static option arrays ───────────────────────────────────────────────────

const TRAVELER_OPTIONS = [1, 2, 3, 4] as const
const DAY_OPTIONS = [
  { label: '3 days', value: 3 },
  { label: '5 days', value: 5 },
  { label: '7 days', value: 7 },
  { label: '14 days', value: 14 },
] as const

type IconType = ComponentType<SVGProps<SVGSVGElement>>

const BUDGET_OPTIONS: { label: string; icon: IconType; value: BudgetStyle }[] = [
  { label: 'Budget', icon: Backpack, value: 'budget' },
  { label: 'Mid-range', icon: Building2, value: 'mid' },
  { label: 'Comfort', icon: Sofa, value: 'comfort' },
]

const ORIGIN_OPTIONS: { label: string; value: OriginCity }[] = [
  { label: 'Jakarta', value: 'jakarta' },
  { label: 'Bandung', value: 'bandung' },
  { label: 'Yogyakarta', value: 'yogyakarta' },
  { label: 'Surabaya', value: 'surabaya' },
  { label: 'Other / abroad', value: 'other' },
]

const ACTIVITY_OPTIONS: { label: string; value: ActivityKey; price: number }[] = [
  {
    label: 'Surfing lesson',
    value: 'surfing_lesson',
    price: CALCULATOR_DATA.activities.surfing_lesson,
  },
  {
    label: 'Green Canyon tour',
    value: 'green_canyon',
    price: CALCULATOR_DATA.activities.green_canyon,
  },
  { label: 'Citumang river tubing', value: 'citumang', price: CALCULATOR_DATA.activities.citumang },
  { label: 'Boat trip', value: 'boat_trip', price: CALCULATOR_DATA.activities.boat_trip },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function RadioGroup<T extends string | number>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string
  name: string
  options: readonly { label: string; value: T; icon?: IconType }[] | readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  const normalised = options.map((o) =>
    typeof o === 'object' && o !== null && 'value' in o
      ? (o as { label: string; value: T; icon?: IconType })
      : { label: String(o), value: o as T },
  )

  return (
    <fieldset>
      <legend className="text-charcoal/75 mb-2 text-xs font-semibold tracking-widest uppercase">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {normalised.map((opt) => {
          const id = `${name}-${String(opt.value)}`
          const active = opt.value === value
          const Icon = 'icon' in opt ? opt.icon : undefined
          return (
            <label
              key={String(opt.value)}
              htmlFor={id}
              className={cn(
                'flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-[0.98]',
                active
                  ? 'border-ocean bg-ocean text-cream'
                  : 'border-charcoal/20 text-charcoal/80 hover:border-ocean hover:text-ocean',
              )}
            >
              <input
                type="radio"
                id={id}
                name={name}
                value={String(opt.value)}
                checked={active}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {Icon ? <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} /> : null}
              {opt.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function BreakdownRow({
  label,
  amount,
  highlight = false,
}: {
  label: string
  amount: number
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-baseline justify-between gap-4',
        highlight ? 'border-charcoal/15 mt-2 border-t pt-3' : '',
      )}
    >
      <span
        className={cn('text-sm', highlight ? 'text-charcoal font-semibold' : 'text-charcoal/75')}
      >
        {label}
      </span>
      <span
        className={cn(
          'font-[family-name:var(--font-mono)] text-sm tabular-nums',
          highlight ? 'text-charcoal text-base font-bold' : 'text-charcoal/80',
        )}
      >
        {formatRp(amount)}
      </span>
    </div>
  )
}

type SaveStatus = 'idle' | 'submitting' | 'success' | 'error'

function SaveEstimate({
  breakdown,
  inputs,
}: {
  breakdown: CostBreakdown
  inputs: CalculatorInputs
}) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<SaveStatus>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (website.length > 0) {
      setStatus('success')
      setMessage("We'll send your estimate shortly.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('That email looks off — mind double-checking?')
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'calculator',
          website,
          meta: {
            travelers: inputs.travelers,
            days: inputs.days,
            budgetStyle: inputs.budgetStyle,
            origin: inputs.origin,
            total: breakdown.total,
          },
        }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setStatus('error')
        setMessage(
          data?.error ?? "Couldn't save — please try again or email hello@hipangandaran.com.",
        )
        return
      }

      setStatus('success')
      setMessage("We'll send you a copy of your estimate plus our weekly Pangandaran tips.")
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Network hiccup — please try again in a moment.')
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="text-forest mt-4 flex items-start gap-2 text-sm font-medium">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
        <span>{message}</span>
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4">
      {/* Honeypot */}
      <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Website (leave empty)
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="calc-email" className="sr-only">
            Your email address
          </label>
          <input
            id="calc-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting'}
            className={cn(
              'border-charcoal/15 bg-cream text-charcoal h-11 w-full rounded-full border px-5 text-sm',
              'placeholder:text-charcoal/40',
              'focus-visible:border-ocean focus-visible:ring-ocean/40 focus-visible:ring-2 focus-visible:outline-none',
              'disabled:opacity-60',
            )}
            aria-invalid={status === 'error'}
          />
        </div>
        <Button type="submit" variant="coral" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Saving…' : 'Save estimate'}
        </Button>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-error mt-2 text-sm">
          {message}
        </p>
      )}
    </form>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

const DEFAULT_INPUTS: CalculatorInputs = {
  travelers: 2,
  days: 5,
  budgetStyle: 'mid',
  origin: 'jakarta',
  activities: [],
}

export function CostCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)
  const [customDays, setCustomDays] = useState('')
  const [useCustomDays, setUseCustomDays] = useState(false)

  function patch<K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  function toggleActivity(key: ActivityKey) {
    setInputs((prev) => ({
      ...prev,
      activities: prev.activities.includes(key)
        ? prev.activities.filter((a) => a !== key)
        : [...prev.activities, key],
    }))
  }

  const effectiveDays =
    useCustomDays && customDays !== ''
      ? Math.max(1, Math.min(90, parseInt(customDays, 10) || 1))
      : inputs.days
  const effectiveInputs = { ...inputs, days: effectiveDays }
  const breakdown = calculate(effectiveInputs)

  return (
    <div className="grid grid-cols-1 gap-8 pb-20 lg:grid-cols-5 lg:gap-12 lg:pb-0">
      {/* ── Mobile sticky total ── */}
      <a
        href="#cost-breakdown"
        className="bg-cream border-charcoal/10 text-charcoal fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t px-4 py-3 shadow-lg lg:hidden"
        aria-label="Jump to estimated total"
      >
        <span className="text-charcoal/70 text-xs tracking-wide uppercase">Estimated total</span>
        <span className="flex items-center gap-2">
          <span className="text-charcoal font-[family-name:var(--font-mono)] text-base font-bold tabular-nums">
            {formatRp(breakdown.total)}
          </span>
          <span aria-hidden="true" className="text-charcoal/55 text-xs">
            ↓
          </span>
        </span>
      </a>

      {/* ── Form ── */}
      <div className="space-y-7 lg:col-span-3">
        <RadioGroup
          legend="Number of travelers"
          name="travelers"
          options={TRAVELER_OPTIONS.map((v) => ({ label: v < 4 ? String(v) : '4+', value: v }))}
          value={inputs.travelers}
          onChange={(v) => patch('travelers', v)}
        />

        <fieldset>
          <legend className="text-charcoal/75 mb-2 text-xs font-semibold tracking-widest uppercase">
            Duration
          </legend>
          <div className="flex flex-wrap gap-2">
            {DAY_OPTIONS.map((opt) => {
              const id = `days-${opt.value}`
              const active = !useCustomDays && inputs.days === opt.value
              return (
                <label
                  key={opt.value}
                  htmlFor={id}
                  className={cn(
                    'flex min-h-11 cursor-pointer items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-[0.98]',
                    active
                      ? 'border-ocean bg-ocean text-cream'
                      : 'border-charcoal/20 text-charcoal/80 hover:border-ocean hover:text-ocean',
                  )}
                >
                  <input
                    type="radio"
                    id={id}
                    name="days"
                    value={opt.value}
                    checked={active}
                    onChange={() => {
                      setUseCustomDays(false)
                      patch('days', opt.value)
                    }}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              )
            })}

            {/* Custom days input */}
            <label
              htmlFor="days-custom"
              className={cn(
                'flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                useCustomDays
                  ? 'border-ocean bg-ocean text-cream'
                  : 'border-charcoal/20 text-charcoal/80 hover:border-ocean hover:text-ocean',
              )}
              onClick={() => setUseCustomDays(true)}
            >
              Custom:
              <input
                id="days-custom"
                type="number"
                min={1}
                max={90}
                inputMode="numeric"
                placeholder="—"
                value={customDays}
                onFocus={() => setUseCustomDays(true)}
                onChange={(e) => {
                  setUseCustomDays(true)
                  setCustomDays(e.target.value)
                }}
                className={cn(
                  'w-14 bg-transparent text-center font-medium tabular-nums outline-none',
                  useCustomDays
                    ? 'text-cream placeholder:text-cream/60'
                    : 'text-charcoal placeholder:text-charcoal/40',
                )}
              />
              days
            </label>
          </div>
        </fieldset>

        <RadioGroup
          legend="Budget style"
          name="budgetStyle"
          options={BUDGET_OPTIONS}
          value={inputs.budgetStyle}
          onChange={(v) => patch('budgetStyle', v)}
        />

        <fieldset>
          <legend className="text-charcoal/75 mb-2 text-xs font-semibold tracking-widest uppercase">
            Traveling from
          </legend>
          <Select value={inputs.origin} onValueChange={(v) => patch('origin', v as OriginCity)}>
            <SelectTrigger id="origin-select" aria-label="Origin city">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ORIGIN_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </fieldset>

        <fieldset>
          <legend className="text-charcoal/75 mb-2 text-xs font-semibold tracking-widest uppercase">
            Activities (per person)
          </legend>
          <div className="flex flex-wrap gap-2">
            {ACTIVITY_OPTIONS.map((opt) => {
              const checked = inputs.activities.includes(opt.value)
              return (
                <label
                  key={opt.value}
                  className={cn(
                    'flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-[0.98]',
                    checked
                      ? 'border-ocean bg-ocean text-cream'
                      : 'border-charcoal/20 text-charcoal/80 hover:border-ocean hover:text-ocean',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleActivity(opt.value)}
                    className="sr-only"
                  />
                  {opt.label}
                  <span
                    className={cn(
                      'font-[family-name:var(--font-mono)] text-xs tabular-nums',
                      checked ? 'text-cream/80' : 'text-charcoal/50',
                    )}
                  >
                    {formatRp(opt.price)}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>
      </div>

      {/* ── Result ── */}
      <div id="cost-breakdown" className="scroll-mt-24 lg:col-span-2">
        <div className="bg-sand/60 sticky top-24 rounded-3xl p-6">
          <p className="text-charcoal/65 font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
            Estimated Cost Breakdown
          </p>

          <div className="mt-4 space-y-2.5">
            <BreakdownRow
              label={`Transport (${ORIGIN_OPTIONS.find((o) => o.value === inputs.origin)?.label ?? ''} → Batukaras)`}
              amount={breakdown.transport}
            />
            <BreakdownRow
              label={`Accommodation (${effectiveDays} night${effectiveDays !== 1 ? 's' : ''})`}
              amount={breakdown.accommodation}
            />
            <BreakdownRow
              label={`Food (${effectiveDays} day${effectiveDays !== 1 ? 's' : ''})`}
              amount={breakdown.food}
            />
            {breakdown.activities > 0 && (
              <BreakdownRow label="Activities" amount={breakdown.activities} />
            )}
            <BreakdownRow label="Local transport" amount={breakdown.localTransport} />
            <BreakdownRow label="TOTAL" amount={breakdown.total} highlight />
          </div>

          <p className="text-charcoal/55 mt-1 text-right font-[family-name:var(--font-mono)] text-sm tabular-nums">
            ~${breakdown.totalUsd} USD
          </p>

          <p className="text-charcoal/50 mt-4 text-xs">
            {inputs.travelers > 1
              ? `Split between ${inputs.travelers} people — ~${formatRp(Math.round(breakdown.total / inputs.travelers))} each`
              : null}
          </p>

          <div className="border-charcoal/10 mt-5 border-t pt-5">
            <p className="text-charcoal/80 text-sm font-medium">Save this estimate</p>
            <p className="text-charcoal/55 mt-0.5 text-xs">
              We&apos;ll email you a copy plus our weekly Pangandaran tips.
            </p>
            <SaveEstimate breakdown={breakdown} inputs={effectiveInputs} />
          </div>

          <p className="text-charcoal/55 mt-5 font-[family-name:var(--font-mono)] text-xs">
            Prices last updated: {CALCULATOR_DATA.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  )
}
