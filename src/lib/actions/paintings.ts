'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { PaintingStatus } from '@/types'

export interface PaintingPayload {
  title: string
  description: string
  price: number          // rupees — we store as paise
  dimensions: string
  medium: string
  year_created: number | null
  status: PaintingStatus
  featured: boolean
  images: { url: string; storage_path: string; is_primary: boolean; display_order: number }[]
  video: { url: string; storage_path: string } | null
}

export async function createPainting(payload: PaintingPayload) {
  const supabase = createAdminClient()

  const { data: painting, error } = await supabase
    .from('paintings')
    .insert({
      title:        payload.title,
      description:  payload.description || null,
      price:        payload.price * 100,          // ₹ → paise
      dimensions:   payload.dimensions || null,
      medium:       payload.medium || null,
      year_created: payload.year_created || null,
      status:       payload.status,
      featured:     payload.featured,
    })
    .select('id')
    .single()

  if (error) throw new Error(error.message)

  if (payload.images.length > 0) {
    const { error: imgErr } = await supabase.from('painting_images').insert(
      payload.images.map((img) => ({ ...img, painting_id: painting.id }))
    )
    if (imgErr) throw new Error(imgErr.message)
  }

  if (payload.video) {
    const { error: vidErr } = await supabase.from('painting_videos').insert({
      ...payload.video,
      painting_id: painting.id,
    })
    if (vidErr) throw new Error(vidErr.message)
  }

  revalidatePath('/admin/paintings')
  revalidatePath('/gallery')
  return painting.id
}

export async function updatePainting(id: string, payload: PaintingPayload) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('paintings')
    .update({
      title:        payload.title,
      description:  payload.description || null,
      price:        payload.price * 100,
      dimensions:   payload.dimensions || null,
      medium:       payload.medium || null,
      year_created: payload.year_created || null,
      status:       payload.status,
      featured:     payload.featured,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  // Replace images
  await supabase.from('painting_images').delete().eq('painting_id', id)
  if (payload.images.length > 0) {
    await supabase.from('painting_images').insert(
      payload.images.map((img) => ({ ...img, painting_id: id }))
    )
  }

  // Replace video
  await supabase.from('painting_videos').delete().eq('painting_id', id)
  if (payload.video) {
    await supabase.from('painting_videos').insert({ ...payload.video, painting_id: id })
  }

  revalidatePath('/admin/paintings')
  revalidatePath(`/paintings/${id}`)
  revalidatePath('/gallery')
}

export async function deletePainting(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('paintings').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/paintings')
  revalidatePath('/gallery')
}

export async function updatePaintingStatus(id: string, status: PaintingStatus) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('paintings').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/paintings')
  revalidatePath(`/paintings/${id}`)
}
