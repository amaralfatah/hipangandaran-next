import type { AnchorHTMLAttributes } from 'react'
import {
  buildAffiliateUrl,
  buildAffiliateSearchUrl,
  AFFILIATE_REL,
  type AffiliatePartner,
} from '@/lib/affiliate'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'coral' | 'secondary'

const baseStyles =
  'inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-6 text-sm font-medium transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-ocean text-cream hover:bg-ocean/90 focus-visible:ring-ocean',
  coral: 'bg-coral text-cream hover:bg-coral/90 focus-visible:ring-coral',
  secondary:
    'border border-charcoal/20 text-charcoal hover:border-ocean hover:text-ocean focus-visible:ring-ocean',
}

type BaseProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'rel' | 'target'> & {
  partner: AffiliatePartner
  variant?: Variant
  utmContent?: string
  utmCampaign?: string
  children: React.ReactNode
}

type WithUrl = BaseProps & { url: string; query?: never }
type WithQuery = BaseProps & {
  query: string
  url?: never
  partner: 'traveloka' | 'agoda' | 'booking'
}

export type AffiliateButtonProps = WithUrl | WithQuery

export function AffiliateButton(props: AffiliateButtonProps) {
  const {
    partner,
    variant = 'primary',
    utmContent,
    utmCampaign,
    className,
    children,
    ...rest
  } = props

  const href =
    'url' in props && props.url
      ? buildAffiliateUrl({ partner, url: props.url, utmContent, utmCampaign })
      : buildAffiliateSearchUrl(
          partner as 'traveloka' | 'agoda' | 'booking',
          (props as WithQuery).query,
          utmContent,
        )

  return (
    <a
      href={href}
      target="_blank"
      rel={AFFILIATE_REL}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...rest}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  )
}
