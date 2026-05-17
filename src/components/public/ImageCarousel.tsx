'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageCarouselProps {
  images: { url: string; is_primary: boolean }[]
  title: string
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)

  if (!images.length) {
    return <div className="aspect-[4/5] bg-[#1A1A1A]/5" />
  }

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1A1A1A]/5">
        <Image
          src={images[current].url}
          alt={`${title} — image ${current + 1}`}
          fill
          className="object-contain"
          priority={current === 0}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden transition-opacity',
                current === i ? 'opacity-100 ring-1 ring-[#1A1A1A]' : 'opacity-40 hover:opacity-70'
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img.url} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
