import PaintingForm from '@/components/admin/PaintingForm'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const metadata = { title: 'Upload Painting' }

export default function NewPaintingPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/paintings"
          className="mb-4 flex items-center gap-1 text-sm text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Paintings
        </Link>
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold sm:text-4xl">
          Upload New Painting
        </h1>
      </div>

      <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <PaintingForm />
      </div>
    </div>
  )
}
