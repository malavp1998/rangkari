import { createAdminClient } from '@/lib/supabase/server'
import ImageCarousel from '@/components/public/ImageCarousel'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 60

interface PaintingDetail {
  id: string
  title: string
  description: string | null
  price: number
  dimensions: string | null
  medium: string | null
  year_created: number | null
  status: 'available' | 'reserved' | 'sold'
  painting_images: { url: string; is_primary: boolean; display_order: number }[]
  painting_videos: { url: string }[]
}

const statusLabel: Record<PaintingDetail['status'], string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
}

const statusColor: Record<PaintingDetail['status'], string> = {
  available: 'text-green-700 bg-green-50 ring-1 ring-green-200',
  reserved: 'text-amber-700 bg-amber-50 ring-1 ring-amber-200',
  sold: 'text-[#1A1A1A]/60 bg-black/5 ring-1 ring-black/10',
}

export default async function PaintingDetailPage(props: PageProps<'/paintings/[id]'>) {
  const { id } = await props.params

  const supabase = createAdminClient()
  const { data: raw } = await supabase
    .from('paintings')
    .select(
      'id, title, description, price, dimensions, medium, year_created, status, painting_images(url, is_primary, display_order), painting_videos(url)'
    )
    .eq('id', id)
    .single()

  if (!raw) notFound()

  const painting = raw as unknown as PaintingDetail
  const images = [...painting.painting_images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.display_order - b.display_order
  })

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <Link
        href="/gallery"
        className="mb-8 inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]/50 transition-colors hover:text-[#1A1A1A] sm:mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Gallery
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        {/* Image carousel */}
        <ImageCarousel images={images} title={painting.title} />

        {/* Details panel */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 font-[family-name:var(--font-inter)] text-xs ${statusColor[painting.status]}`}
            >
              {statusLabel[painting.status]}
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight sm:text-5xl">
              {painting.title}
            </h1>
            <p className="mt-3 font-[family-name:var(--font-inter)] text-2xl font-light text-[#1A1A1A] sm:text-3xl">
              ₹{(painting.price / 100).toLocaleString('en-IN')}
            </p>
          </div>

          {/* Metadata */}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#1A1A1A]/8 pt-6">
            {painting.medium && (
              <>
                <dt className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-[#1A1A1A]/40">
                  Medium
                </dt>
                <dd className="font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]">
                  {painting.medium}
                </dd>
              </>
            )}
            {painting.dimensions && (
              <>
                <dt className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-[#1A1A1A]/40">
                  Dimensions
                </dt>
                <dd className="font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]">
                  {painting.dimensions}
                </dd>
              </>
            )}
            {painting.year_created && (
              <>
                <dt className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-[#1A1A1A]/40">
                  Year
                </dt>
                <dd className="font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]">
                  {painting.year_created}
                </dd>
              </>
            )}
          </dl>

          {painting.description && (
            <div className="border-t border-[#1A1A1A]/8 pt-6">
              <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-[#1A1A1A]/70">
                {painting.description}
              </p>
            </div>
          )}

          {/* Buy button */}
          {painting.status === 'available' && (
            <div className="border-t border-[#1A1A1A]/8 pt-6">
              <button
                disabled
                className="w-full cursor-not-allowed rounded-none border border-[#1A1A1A] bg-[#1A1A1A] py-4 font-[family-name:var(--font-inter)] text-sm uppercase tracking-widest text-white opacity-50"
              >
                Buy Now — Coming Soon
              </button>
              <p className="mt-2 text-center font-[family-name:var(--font-inter)] text-xs text-[#1A1A1A]/40">
                Interested? <a href="/contact" className="underline underline-offset-2">Get in touch</a>
              </p>
            </div>
          )}

          {/* Video */}
          {painting.painting_videos.length > 0 && (
            <div className="border-t border-[#1A1A1A]/8 pt-6">
              <p className="mb-3 font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-[#1A1A1A]/40">
                Process Video
              </p>
              <div className="flex justify-center bg-black/5 rounded-sm overflow-hidden">
                <video
                  src={painting.painting_videos[0].url}
                  controls
                  className="max-h-[360px] w-auto"
                  preload="metadata"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
