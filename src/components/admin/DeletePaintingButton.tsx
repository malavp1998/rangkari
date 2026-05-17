'use client'

import { useTransition } from 'react'
import { deletePainting } from '@/lib/actions/paintings'
import { Trash2 } from 'lucide-react'

export function DeletePaintingButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    startTransition(() => { deletePainting(id) })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      <Trash2 className="h-3 w-3" />
    </button>
  )
}
