'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Palette, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#1A1A1A]/8 bg-[#FAFAF7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <Palette className="h-5 w-5 text-[#1A1A1A]/40 transition-colors group-hover:text-[#1A1A1A]" />
          <span className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-wide">
            Rangkari
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-[family-name:var(--font-inter)] text-sm tracking-wide transition-colors',
                pathname === href
                  ? 'text-[#1A1A1A]'
                  : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
              )}
            >
              {label}
            </Link>
          ))}
          <span className="h-4 w-px bg-[#1A1A1A]/15" />
          <Link
            href="/admin/login"
            className={cn(
              'flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-sm tracking-wide transition-colors',
              pathname.startsWith('/admin')
                ? 'text-[#1A1A1A]'
                : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
            )}
          >
            <Lock className="h-3 w-3" />
            Admin
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#1A1A1A]/8 bg-[#FAFAF7] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'font-[family-name:var(--font-inter)] text-sm tracking-wide',
                  pathname === href ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/50'
                )}
              >
                {label}
              </Link>
            ))}
            <div className="my-1 h-px bg-[#1A1A1A]/10" />
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-sm tracking-wide',
                pathname.startsWith('/admin') ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'
              )}
            >
              <Lock className="h-3 w-3" />
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
