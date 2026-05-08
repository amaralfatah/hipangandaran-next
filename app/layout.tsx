import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import { OrganizationJsonLd } from '@/components/JsonLd'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const SITE_DESCRIPTION =
  'Honest English travel guide to Pangandaran, Batukaras, and Green Canyon. Real prices, real WiFi speeds, no fluff.'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hipangandaran.com'),
  title: {
    default: 'Hi Pangandaran — Your Honest Guide to Batukaras & Green Canyon',
    template: '%s | Hi Pangandaran',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: 'Hi Pangandaran',
    title: 'Hi Pangandaran — Your Honest Guide to Batukaras & Green Canyon',
    description: SITE_DESCRIPTION,
    images: [{ url: '/og/default-og.jpg', width: 1200, height: 630, alt: 'Hi Pangandaran' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hi Pangandaran — Your Honest Guide to Batukaras & Green Canyon',
    description: SITE_DESCRIPTION,
    images: ['/og/default-og.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream text-charcoal">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  )
}
