import type { ReactNode } from 'react'
import { AlertTriangle, Info, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

type InfoBoxType = 'tip' | 'warning' | 'info'

const typeConfig: Record<
  InfoBoxType,
  { container: string; icon: typeof Info; iconClass: string; label: string }
> = {
  tip: {
    container: 'border-forest/20 bg-forest/5',
    icon: Lightbulb,
    iconClass: 'text-forest',
    label: 'Tip',
  },
  warning: {
    container: 'border-warning/30 bg-warning/8',
    icon: AlertTriangle,
    iconClass: 'text-warning',
    label: 'Heads up',
  },
  info: {
    container: 'border-ocean/20 bg-ocean/5',
    icon: Info,
    iconClass: 'text-ocean',
    label: 'Note',
  },
}

export interface InfoBoxProps {
  type?: InfoBoxType
  title?: string
  children: ReactNode
  className?: string
}

export function InfoBox({ type = 'info', title, children, className }: InfoBoxProps) {
  const cfg = typeConfig[type]
  const Icon = cfg.icon

  return (
    <aside
      role="note"
      className={cn('my-6 flex gap-3 rounded-2xl border p-4 md:p-5', cfg.container, className)}
    >
      <Icon aria-hidden="true" className={cn('mt-0.5 h-5 w-5 flex-shrink-0', cfg.iconClass)} />
      <div className="text-charcoal/85 flex-1 text-sm">
        <p
          className={cn(
            'font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide',
            cfg.iconClass,
          )}
        >
          {title ?? cfg.label}
        </p>
        <div className="mt-1 [&_p]:mt-2 [&_p:first-child]:mt-0">{children}</div>
      </div>
    </aside>
  )
}
