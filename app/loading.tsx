export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="mx-auto flex max-w-3xl flex-col px-4 py-20 md:px-6 md:py-32"
    >
      <div className="bg-charcoal/10 h-3 w-24 animate-pulse rounded" />
      <div className="bg-charcoal/10 mt-4 h-10 w-3/4 animate-pulse rounded md:h-14" />
      <div className="bg-charcoal/10 mt-3 h-10 w-1/2 animate-pulse rounded md:h-14" />
      <div className="bg-charcoal/10 mt-8 h-4 w-full max-w-xl animate-pulse rounded" />
      <div className="bg-charcoal/10 mt-2 h-4 w-2/3 animate-pulse rounded" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
