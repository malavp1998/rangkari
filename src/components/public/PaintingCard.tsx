import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PaintingCardProps {
  id: string
  title: string
  price: number
  status: 'available' | 'reserved' | 'sold'
  imageUrl?: string
  medium?: string | null
  year?: number | null
}

export default function PaintingCard({ id, title, price, status, imageUrl, medium, year }: PaintingCardProps) {
  const isSold = status === 'sold'
  const isReserved = status === 'reserved'

  return (
    <Link href={`/paintings/${id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#EFEDE7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              'object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]',
              isSold && 'opacity-75'
            )}
          />
        ) : (
          <div className="h-full w-full bg-[#1A1A1A]/5" />
        )}

        {/* Subtle status badge — top right */}
        {(isSold || isReserved) && (
          <div className="absolute right-3 top-3">
            <span
              className={cn(
                'inline-block rounded-full px-2.5 py-1 font-[family-name:var(--font-inter)] text-[10px] font-medium uppercase tracking-wider backdrop-blur-md',
                isSold
                  ? 'bg-[#1A1A1A]/85 text-white'
                  : 'bg-amber-500/95 text-white'
              )}
            >
              {isSold ? 'Sold' : 'Reserved'}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium leading-tight text-[#1A1A1A] transition-colors group-hover:text-[#1A1A1A]/60">
            {title}
          </h3>
          <p
            className={cn(
              'font-[family-name:var(--font-inter)] text-sm font-medium tracking-tight whitespace-nowrap',
              isSold ? 'text-[#1A1A1A]/40 line-through' : 'text-[#1A1A1A]'
            )}
          >
            ₹{(price / 100).toLocaleString('en-IN')}
          </p>
        </div>
        {(medium || year) && (
          <p className="font-[family-name:var(--font-inter)] text-xs text-[#1A1A1A]/40">
            {[medium, year].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  )
}
