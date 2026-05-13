'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

const navItems = [
  { href: '/admin/dashboard', label: 'Overview', localOnly: false },
  { href: '/admin/place-updates', label: 'Place Updates', localOnly: false },
  { href: '/admin/subscribers', label: 'Subscribers', localOnly: false },
  { href: '/admin/articles', label: 'Articles', localOnly: true },
  { href: '/admin/accommodations', label: 'Accommodations', localOnly: false },
  { href: '/admin/cafes', label: 'Cafes', localOnly: false },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  function isActive(href: string) {
    if (href === '/admin/dashboard') return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const currentLabel = navItems.find((item) => isActive(item.href))?.label ?? 'Admin'

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <div>
          <p className="text-sm font-semibold text-gray-900">Hi Pangandaran</p>
          <p className="text-xs text-gray-500">{currentLabel}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="rounded p-2 text-gray-700 hover:bg-gray-100"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      {/* Backdrop (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gray-900 text-white transition-transform duration-200 ease-out md:sticky md:top-0 md:z-auto md:h-screen md:w-56 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-5">
          <div>
            <p className="text-sm font-semibold">Hi Pangandaran</p>
            <p className="mt-0.5 text-xs text-gray-400">Admin Panel</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="rounded p-1 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {navItems.map(({ href, label, localOnly }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between rounded px-3 py-2 text-sm transition-colors ${
                isActive(href)
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{label}</span>
              {localOnly && (
                <span className="text-[10px] leading-none text-gray-500">local only</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-700 p-3">
          <button
            onClick={handleLogout}
            className="w-full rounded px-3 py-2 text-left text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
