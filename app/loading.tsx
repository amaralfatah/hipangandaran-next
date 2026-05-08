export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="mx-auto flex max-w-3xl flex-col px-4 py-20 md:px-6 md:py-32"
    >
      <div className="h-3 w-24 animate-pulse rounded bg-charcoal/10" />
      <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-charcoal/10 md:h-14" />
      <div className="mt-3 h-10 w-1/2 animate-pulse rounded bg-charcoal/10 md:h-14" />
      <div className="mt-8 h-4 w-full max-w-xl animate-pulse rounded bg-charcoal/10" />
      <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-charcoal/10" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
