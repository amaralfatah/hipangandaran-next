import { EmailCapture } from '@/components/ui/EmailCapture'
import { Hero } from '@/components/sections/Hero'
import { LatestGuides } from '@/components/sections/LatestGuides'
import { QuickNav } from '@/components/sections/QuickNav'

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickNav />
      <LatestGuides />
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
        <EmailCapture />
      </section>
    </>
  )
}
