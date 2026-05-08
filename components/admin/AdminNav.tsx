'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  function isActive(href: string) {
    if (href === '/admin/dashboard') return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <aside className="flex min-h-screen w-56 shrink-0 flex-col bg-gray-900 text-white">
      <div className="border-b border-gray-700 px-4 py-5">
        <p className="text-sm font-semibold">Hi Pangandaran</p>
        <p className="mt-0.5 text-xs text-gray-400">Admin Panel</p>
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
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
  )
}
