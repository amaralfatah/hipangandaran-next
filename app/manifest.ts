import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hi Pangandaran',
    short_name: 'Hi Pangandaran',
    description:
      'Honest English travel guide to Pangandaran, Batukaras, and Green Canyon — written by a local, not a tour operator.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f3',
    theme_color: '#1a6b8a',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
