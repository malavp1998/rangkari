'use client'

import { useTransition } from 'react'
import { updatePaintingStatus } from '@/lib/actions/paintings'
import type { PaintingStatus } from '@/types'

const colors: Record<PaintingStatus, string> = {
  available: 'bg-green-100 text-green-700',
  reserved:  'bg-yellow-100 text-yellow-700',
  sold:      'bg-red-100 text-red-700',
}

export function PaintingStatusBadge({ status, paintingId }: { status: PaintingStatus; paintingId: string }) {
  const [isPending, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as PaintingStatus
    startTransition(() => { updatePaintingStatus(paintingId, next) })
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isPending}
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-0 outline-none cursor-pointer ${colors[status]}`}
    >
      <option value="available">Available</option>
      <option value="reserved">Reserved</option>
      <option value="sold">Sold</option>
    </select>
  )
}
