import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      {/* Hero */}
      <div className="space-y-4">
        <p className="font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.3em] text-[#1A1A1A]/50">
          Original Paintings
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-6xl font-light leading-tight md:text-8xl">
          Art Gallery
        </h1>
        <p className="mx-auto max-w-md font-[family-name:var(--font-inter)] text-base text-[#1A1A1A]/60">
          Discover and collect one-of-a-kind original paintings.
          Every piece is unique — once sold, it&apos;s gone forever.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/gallery"
          className="rounded-none border border-[#1A1A1A] bg-[#1A1A1A] px-8 py-3 font-[family-name:var(--font-inter)] text-sm uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#1A1A1A]"
        >
          View Gallery
        </Link>
        <Link
          href="/about"
          className="rounded-none border border-[#1A1A1A]/30 px-8 py-3 font-[family-name:var(--font-inter)] text-sm uppercase tracking-widest text-[#1A1A1A]/70 transition-colors hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
        >
          About the Artist
        </Link>
      </div>

      {/* Phase badge */}
      <p className="rounded-full bg-amber-50 px-4 py-1.5 font-[family-name:var(--font-inter)] text-xs text-amber-700 ring-1 ring-amber-200">
        Phase 1 complete — full site coming in Phase 3
      </p>
    </div>
  )
}
