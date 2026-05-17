import { createAdminClient } from '@/lib/supabase/server'
import PaintingCard from '@/components/public/PaintingCard'
import GalleryFilter from '@/components/public/GalleryFilter'
import { Suspense } from 'react'

interface GalleryPageProps {
  searchParams: Promise<{ status?: string }>
}

interface GalleryPainting {
  id: string
  title: string
  price: number
  status: 'available' | 'reserved' | 'sold'
  medium: string | null
  year_created: number | null
  painting_images: { url: string; is_primary: boolean }[]
}

const VALID_STATUSES = ['available', 'reserved', 'sold'] as const
type PaintingStatus = (typeof VALID_STATUSES)[number]

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { status } = await searchParams

  const supabase = createAdminClient()
  const validStatus = VALID_STATUSES.includes(status as PaintingStatus)
    ? (status as PaintingStatus)
    : null

  const baseQuery = supabase
    .from('paintings')
    .select('id, title, price, status, medium, year_created, painting_images(url, is_primary)')
    .order('created_at', { ascending: false })

  const { data: raw } = validStatus
    ? await baseQuery.eq('status', validStatus)
    : await baseQuery

  const paintings = (raw ?? []) as unknown as GalleryPainting[]

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.3em] text-[#1A1A1A]/50">
            Browse the collection
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-5xl font-light leading-none sm:text-6xl">
            Gallery
          </h1>
          <p className="mt-3 font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]/40">
            {paintings.length} work{paintings.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Suspense>
          <GalleryFilter />
        </Suspense>
      </div>

      {!paintings.length ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]/40">
            No paintings found.
          </p>
        </div>
      ) : (
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
      )}
    </div>
  )
}
