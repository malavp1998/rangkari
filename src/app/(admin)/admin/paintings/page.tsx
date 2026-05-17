import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PaintingStatusBadge } from '@/components/admin/PaintingStatusBadge'
import { DeletePaintingButton } from '@/components/admin/DeletePaintingButton'
import { Plus } from 'lucide-react'
import type { PaintingStatus } from '@/types'

interface PaintingRow {
  id: string
  title: string
  price: number
  status: PaintingStatus
  featured: boolean
  created_at: string
  painting_images: { url: string; is_primary: boolean }[]
}

export default async function AdminPaintingsPage() {
  const supabase = createAdminClient()
  const { data: raw } = await supabase
    .from('paintings')
    .select('id, title, price, status, featured, created_at, painting_images(url, is_primary)')
    .order('created_at', { ascending: false })

  const paintings = (raw ?? []) as unknown as PaintingRow[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold">Paintings</h1>
          <p className="mt-1 text-sm text-[#1A1A1A]/50">{paintings.length} total</p>
        </div>
        <Link
          href="/admin/paintings/new"
          className="flex items-center gap-2 rounded-lg bg-[#1A1A1A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1A1A1A]/80"
        >
          <Plus className="h-4 w-4" />
          Upload Painting
        </Link>
      </div>

      {!paintings?.length ? (
        <div className="rounded-xl border border-dashed border-black/20 bg-white py-20 text-center">
          <p className="text-[#1A1A1A]/40">No paintings yet.</p>
          <Link href="/admin/paintings/new" className="mt-3 inline-block text-sm font-medium underline">
            Upload your first painting
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-black/[0.02]">
                <th className="px-4 py-3 text-left font-medium text-[#1A1A1A]/50">Painting</th>
                <th className="px-4 py-3 text-left font-medium text-[#1A1A1A]/50">Price</th>
                <th className="px-4 py-3 text-left font-medium text-[#1A1A1A]/50">Status</th>
                <th className="px-4 py-3 text-left font-medium text-[#1A1A1A]/50">Featured</th>
                <th className="px-4 py-3 text-right font-medium text-[#1A1A1A]/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {paintings.map((p) => {
                const thumb = p.painting_images.find((i) => i.is_primary)?.url
                  ?? p.painting_images[0]?.url

                return (
                  <tr key={p.id} className="hover:bg-black/[0.01]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {thumb ? (
                          <img src={thumb} alt={p.title} className="h-10 w-10 rounded object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded bg-black/10" />
                        )}
                        <span className="font-medium">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#1A1A1A]/70">
                      ₹{(p.price / 100).toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      <PaintingStatusBadge status={p.status} paintingId={p.id} />
                    </td>
                    <td className="px-4 py-3 text-[#1A1A1A]/50">
                      {p.featured ? '★ Yes' : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/paintings/${p.id}/edit`}
                          className="rounded-md border border-black/10 px-3 py-1 text-xs font-medium hover:bg-black/5"
                        >
                          Edit
                        </Link>
                        <DeletePaintingButton id={p.id} title={p.title} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
