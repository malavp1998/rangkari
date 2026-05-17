import { createAdminClient } from '@/lib/supabase/server'
import HeroSection from '@/components/public/HeroSection'
import PaintingCard from '@/components/public/PaintingCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

interface FeaturedPainting {
  id: string
  title: string
  price: number
  status: 'available' | 'reserved' | 'sold'
  medium: string | null
  year_created: number | null
  painting_images: { url: string; is_primary: boolean }[]
}

export default async function HomePage() {
  const supabase = createAdminClient()
  const { data: raw } = await supabase
    .from('paintings')
    .select('id, title, price, status, medium, year_created, painting_images(url, is_primary)')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  const paintings = (raw ?? []) as unknown as FeaturedPainting[]

  const firstWithImage = paintings.find((p) => p.painting_images.length > 0)
  const heroImage = firstWithImage
    ? {
        url:
          firstWithImage.painting_images.find((i) => i.is_primary)?.url ??
          firstWithImage.painting_images[0].url,
        title: firstWithImage.title,
        id: firstWithImage.id,
      }
    : undefined

  return (
    <>
      <HeroSection featuredImage={heroImage} />

      {paintings.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mb-10 flex items-end justify-between sm:mb-14">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.3em] text-[#1A1A1A]/50">
                Selected Works
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl font-light sm:text-5xl">
                Featured Paintings
              </h2>
            </div>
            <Link
              href="/gallery"
              className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]/50 transition-colors hover:text-[#1A1A1A]"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-x-8 md:gap-y-14 lg:grid-cols-4 lg:gap-x-10">
            {paintings.map((p) => {
              const thumb =
                p.painting_images.find((i) => i.is_primary)?.url ?? p.painting_images[0]?.url
              return (
                <PaintingCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  status={p.status}
                  imageUrl={thumb}
                  medium={p.medium}
                  year={p.year_created}
                />
              )
            })}
          </div>
        </section>
      )}

      {/* About teaser */}
      <section className="border-t border-[#1A1A1A]/8 bg-[#1A1A1A] px-6 py-20 text-center text-white">
        <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] text-white/40">
          The Artist
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl font-light">
          Crafted with Intention
        </h2>
        <p className="mx-auto mt-4 max-w-md font-[family-name:var(--font-inter)] text-sm text-white/60">
          Every painting begins with a feeling — an observation of light, colour, or emotion
          that demands to be made permanent.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block border border-white/30 px-8 py-3 font-[family-name:var(--font-inter)] text-sm uppercase tracking-widest text-white/70 transition-colors hover:border-white hover:text-white"
        >
          Meet the Artist
        </Link>
      </section>
    </>
  )
}
