'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
  featuredImage?: { url: string; title: string; id: string }
}

export default function HeroSection({ featuredImage }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden sm:min-h-[85vh] lg:min-h-[90vh]">
      {featuredImage && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            >
              <Image
                src={featuredImage.url}
                alt={featuredImage.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-[#FAFAF7]/75" />
        </div>
      )}

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="max-w-2xl space-y-5 sm:space-y-6">
          <p className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.3em] text-[#1A1A1A]/50">
            Original Paintings
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
            Art that<br />speaks to<br />the soul
          </h1>
          <p className="max-w-md font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]/60 sm:text-base">
            Each painting is one of a kind — a moment captured forever in colour and texture.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              href="/gallery"
              className="inline-block rounded-none border border-[#1A1A1A] bg-[#1A1A1A] px-7 py-3 text-center font-[family-name:var(--font-inter)] text-xs uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#1A1A1A] sm:px-8 sm:py-3.5 sm:text-sm"
            >
              Explore Gallery
            </Link>
            <Link
              href="/about"
              className="inline-block rounded-none border border-[#1A1A1A]/30 px-7 py-3 text-center font-[family-name:var(--font-inter)] text-xs uppercase tracking-widest text-[#1A1A1A]/70 transition-colors hover:border-[#1A1A1A] hover:text-[#1A1A1A] sm:px-8 sm:py-3.5 sm:text-sm"
            >
              About the Artist
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
