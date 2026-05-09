'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/shadcn/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/guides', label: 'Guides' },
  { href: '/places/accommodation', label: 'Stay' },
  { href: '/places/cafes', label: 'Cafes' },
  { href: '/tools/cost-calculator', label: 'Cost Calculator' },
  { href: '/about', label: 'About' },
]

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'

    const panel = document.getElementById('mobile-nav-panel')
    const focusable = Array.from(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (e.key === 'Tab' && focusable.length > 0) {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="border-charcoal/10 bg-cream sticky top-0 z-40 border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label="Hi Pangandaran home"
        >
          <span className="text-ocean group-hover:text-coral font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight transition-colors md:text-3xl">
            Hi Pangandaran
          </span>
          <span className="text-charcoal/60 mt-0.5 hidden font-[family-name:var(--font-body)] text-xs sm:block md:text-sm">
            your honest guide
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm transition-colors',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-ocean font-medium'
                      : 'text-charcoal/80 hover:text-ocean',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          ref={triggerRef}
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          className="text-charcoal md:hidden"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {open && (
        <>
          <div
            className="bg-charcoal/30 fixed inset-0 z-30 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="border-charcoal/10 bg-cream absolute inset-x-0 top-full z-40 border-b shadow-lg md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'block rounded-lg px-3 py-3 text-base transition-colors',
                        active
                          ? 'text-ocean bg-sand/40 font-medium'
                          : 'text-charcoal/85 hover:bg-sand/30 hover:text-ocean',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </>
      )}
    </header>
  )
}
