import Link from 'next/link'
import { Palette } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A]/8 bg-[#FAFAF7]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <Palette className="h-4 w-4 text-[#1A1A1A]/40 transition-colors group-hover:text-[#1A1A1A]" />
            <span className="font-[family-name:var(--font-cormorant)] text-xl font-semibold tracking-wide">
              Rangkari
            </span>
          </Link>
          <nav className="flex gap-6">
            {[
              { label: 'Gallery', href: '/gallery' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]/50 transition-colors hover:text-[#1A1A1A]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 font-[family-name:var(--font-inter)] text-xs text-[#1A1A1A]/30">
          © {new Date().getFullYear()} Rangkari. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
