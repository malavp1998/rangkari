'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const filters = [
  { label: 'All', value: '' },
  { label: 'Available', value: 'available' },
  { label: 'Reserved', value: 'reserved' },
  { label: 'Sold', value: 'sold' },
]

export default function GalleryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('status') ?? ''

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
              params.set('status', value)
            } else {
              params.delete('status')
            }
            router.push(`/gallery?${params.toString()}`)
          }}
          className={cn(
            'rounded-none border px-4 py-1.5 font-[family-name:var(--font-inter)] text-xs uppercase tracking-widest transition-colors',
            current === value
              ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
              : 'border-[#1A1A1A]/20 text-[#1A1A1A]/60 hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
