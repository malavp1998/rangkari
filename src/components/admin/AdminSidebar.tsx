'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Image, ShoppingBag, LogOut, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from '@/lib/actions/auth'

const nav = [
  { label: 'Dashboard',  href: '/admin',            icon: LayoutDashboard },
  { label: 'Paintings',  href: '/admin/paintings',  icon: Image },
  { label: 'Orders',     href: '/admin/orders',     icon: ShoppingBag },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[#1A1A1A] text-white">
      {/* Brand */}
      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-5">
        <Palette className="h-5 w-5 text-amber-400" />
        <span className="font-[family-name:var(--font-cormorant)] text-xl font-semibold tracking-wide">
          Rangkari
        </span>
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
  )
}
