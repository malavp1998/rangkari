'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { LayoutDashboard, Image, ShoppingBag, LogOut, Palette, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from '@/lib/actions/auth'

const nav = [
  { label: 'Dashboard',  href: '/admin',            icon: LayoutDashboard },
  { label: 'Paintings',  href: '/admin/paintings',  icon: Image },
  { label: 'Orders',     href: '/admin/orders',     icon: ShoppingBag },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close drawer when route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll while drawer is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  return (
    <>
      {/* Mobile top bar (visible < md) */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-black/10 bg-[#1A1A1A] px-4 py-3 text-white md:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-amber-400" />
          <span className="font-[family-name:var(--font-cormorant)] text-xl font-semibold tracking-wide">
            Rangkari
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md p-2 text-white/70 transition-colors hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Backdrop (mobile, when open) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: drawer on mobile, fixed left on desktop */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#1A1A1A] text-white transition-transform duration-200 ease-out md:w-60 md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-amber-400" />
            <span className="font-[family-name:var(--font-cormorant)] text-xl font-semibold tracking-wide">
              Rangkari
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-white/60 transition-colors hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {nav.map(({ label, href, icon: Icon }) => {
            const active =
              href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="border-t border-white/10 px-3 py-4">
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
