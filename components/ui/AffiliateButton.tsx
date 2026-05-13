import type { AnchorHTMLAttributes } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  buildAffiliateUrl,
  buildAffiliateSearchUrl,
  AFFILIATE_REL,
  type AffiliatePartner,
} from '@/lib/affiliate'
import { Button, type buttonVariants } from '@/components/ui/shadcn/button'
import type { VariantProps } from 'class-variance-authority'

type Variant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
type Size = NonNullable<VariantProps<typeof buttonVariants>['size']>

type BaseProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'rel' | 'target'> & {
  partner: AffiliatePartner
  variant?: Variant
  size?: Size
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
    size = 'md',
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
    <Button asChild variant={variant} size={size} className={className}>
      <a href={href} target="_blank" rel={AFFILIATE_REL} {...rest}>
        {children}
        <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      </a>
    </Button>
  )
}
