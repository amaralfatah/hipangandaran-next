export function PlaceImagePlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div
      aria-hidden="true"
      className="from-ocean/20 to-sand/40 text-ocean/70 absolute inset-0 flex items-center justify-center bg-gradient-to-br"
    >
      <span className="font-[family-name:var(--font-display)] text-4xl font-semibold">
        {initials}
      </span>
    </div>
  )
}
