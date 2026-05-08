// Affiliate URL builder.
// Wraps a destination URL with the partner's tracking params + our UTM tags
// so we can attribute clicks back to specific guides/sections.
//
// Per CLAUDE.md hard rule #4: every <a> built from these MUST carry
// rel="nofollow sponsored noopener noreferrer".

export type AffiliatePartner = 'traveloka' | 'agoda' | 'booking'

export interface AffiliateLinkOptions {
  partner: AffiliatePartner
  url: string
  utmContent?: string
  utmCampaign?: string
}

const ENV = {
  agodaCid: process.env.NEXT_PUBLIC_AGODA_CID ?? '',
}

function appendParams(url: string, params: Record<string, string>): string {
  const u = new URL(url)
  for (const [k, v] of Object.entries(params)) {
    if (v) u.searchParams.set(k, v)
  }
  return u.toString()
}

export function buildAffiliateUrl({
  partner,
  url,
  utmContent,
  utmCampaign = 'phase-2-directory',
}: AffiliateLinkOptions): string {
  const utm = {
    utm_source: 'hipangandaran',
    utm_medium: 'affiliate',
    utm_campaign: utmCampaign,
    ...(utmContent ? { utm_content: utmContent } : {}),
  }

  switch (partner) {
    case 'traveloka':
      return appendParams(url, utm)
    case 'agoda':
      return appendParams(url, { ...utm, cid: ENV.agodaCid })
    case 'booking':
      return appendParams(url, utm)
  }
}

// Use when no real affiliate URL is on the row yet — falls back to a search
// query at the partner site, still tagged with our UTM.
export function buildAffiliateSearchUrl(
  partner: 'traveloka' | 'agoda' | 'booking',
  query: string,
  utmContent?: string,
): string {
  const q = encodeURIComponent(query)
  const baseByPartner: Record<typeof partner, string> = {
    traveloka: `https://www.traveloka.com/en-id/hotel/search?spec=${q}`,
    agoda: `https://www.agoda.com/search?searchText=${q}`,
    booking: `https://www.booking.com/searchresults.html?ss=${q}`,
  }
  return buildAffiliateUrl({ partner, url: baseByPartner[partner], utmContent })
}

export const AFFILIATE_REL = 'nofollow sponsored noopener noreferrer'
