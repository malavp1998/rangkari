import { createAdminClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PaintingForm from '@/components/admin/PaintingForm'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Painting } from '@/types'

export const metadata = { title: 'Edit Painting' }

export default async function EditPaintingPage(props: PageProps<'/admin/paintings/[id]/edit'>) {
  const { id } = await props.params
  const supabase = createAdminClient()

  const { data: raw } = await supabase
    .from('paintings')
    .select('*, painting_images(*), painting_videos(*)')
    .eq('id', id)
    .single()

  if (!raw) notFound()

  const painting = raw as unknown as Painting

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/paintings"
          className="mb-4 flex items-center gap-1 text-sm text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Paintings
        </Link>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold">
          Edit: {painting.title}
        </h1>
      </div>

      <div className="rounded-xl border border-black/5 bg-white p-8 shadow-sm">
        <PaintingForm painting={painting} />
      </div>
    </div>
  )
}
