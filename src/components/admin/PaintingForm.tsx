'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { createPainting, updatePainting } from '@/lib/actions/paintings'
import ImageUploader, { type UploadedImage } from './ImageUploader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Painting, PaintingStatus } from '@/types'

interface PaintingFormProps {
  painting?: Painting  // provided in edit mode
}

export default function PaintingForm({ painting }: PaintingFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Form state
  const [title, setTitle]           = useState(painting?.title ?? '')
  const [description, setDesc]      = useState(painting?.description ?? '')
  const [price, setPrice]           = useState(painting ? String(painting.price / 100) : '')
  const [dimensions, setDimensions] = useState(painting?.dimensions ?? '')
  const [medium, setMedium]         = useState(painting?.medium ?? '')
  const [year, setYear]             = useState(painting?.year_created ? String(painting.year_created) : '')
  const [status, setStatus]         = useState<PaintingStatus>(painting?.status ?? 'available')
  const [featured, setFeatured]     = useState(painting?.featured ?? false)

  // Images
  const [images, setImages] = useState<UploadedImage[]>(() =>
    (painting?.painting_images ?? []).map((img) => ({
      id:           img.id,
      previewUrl:   img.url,
      storageUrl:   img.url,
      storagePath:  img.url, // existing images already uploaded
      isPrimary:    img.is_primary,
      displayOrder: img.display_order,
    }))
  )

  // Video
  const [videoFile, setVideoFile]       = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string>(
    painting?.painting_videos?.[0]?.url ?? ''
  )
  const [existingVideoPath, setExistingVideoPath] = useState<string>(
    painting?.painting_videos?.[0]?.url ?? ''
  )

  async function uploadImagesToStorage(paintingId: string): Promise<UploadedImage[]> {
    const supabase = createClient()
    const result: UploadedImage[] = []

    for (const img of images) {
      if (img.storageUrl) {
        // Already uploaded (existing or previously uploaded)
        result.push(img)
        continue
      }
      if (!img.file) continue

      const ext      = img.file.name.split('.').pop()
      const path     = `paintings/${paintingId}/${img.id}.${ext}`
      const { error } = await supabase.storage.from('painting-images').upload(path, img.file)
      if (error) throw new Error(`Image upload failed: ${error.message}`)

      const { data: { publicUrl } } = supabase.storage.from('painting-images').getPublicUrl(path)
      result.push({ ...img, storagePath: path, storageUrl: publicUrl, previewUrl: publicUrl })
    }

    return result
  }

  async function uploadVideoToStorage(paintingId: string): Promise<{ url: string; storage_path: string } | null> {
    if (!videoFile) return existingVideoPath ? { url: existingVideoPath, storage_path: existingVideoPath } : null

    const supabase = createClient()
    const ext      = videoFile.name.split('.').pop()
    const path     = `paintings/${paintingId}/video.${ext}`
    const { error } = await supabase.storage.from('painting-videos').upload(path, videoFile, { upsert: true })
    if (error) throw new Error(`Video upload failed: ${error.message}`)

    const { data: { publicUrl } } = supabase.storage.from('painting-videos').getPublicUrl(path)
    return { url: publicUrl, storage_path: path }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !price) { toast.error('Title and price are required.'); return }
    if (images.length === 0) { toast.error('Upload at least one image.'); return }

    startTransition(async () => {
      try {
        const paintingId = painting?.id ?? crypto.randomUUID()

        const [uploadedImages, video] = await Promise.all([
          uploadImagesToStorage(paintingId),
          uploadVideoToStorage(paintingId),
        ])

        const payload = {
          title,
          description,
          price: Number(price),
          dimensions,
          medium,
          year_created: year ? Number(year) : null,
          status,
          featured,
          images: uploadedImages.map((img, i) => ({
            url:          img.storageUrl!,
            storage_path: img.storagePath!,
            is_primary:   img.isPrimary,
            display_order: i,
          })),
          video,
        }

        if (painting) {
          await updatePainting(painting.id, payload)
          toast.success('Painting updated.')
        } else {
          await createPainting(payload)
          toast.success('Painting uploaded!')
        }

        router.push('/admin/paintings')
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Something went wrong.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left column — metadata */}
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Morning Light" required />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tell the story of this painting…"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input id="price" type="number" min={1} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 15000" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" min={1900} max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value)} placeholder="2024" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input id="dimensions" value={dimensions} onChange={(e) => setDimensions(e.target.value)} placeholder="24 x 36 inches" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="medium">Medium</Label>
              <Input id="medium" value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="Oil on canvas" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as PaintingStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm font-medium">Featured on homepage</span>
              </label>
            </div>
          </div>

          {/* Video upload */}
          <div className="space-y-1.5">
            <Label>Video (optional)</Label>
            {videoPreview && (
              <video src={videoPreview} controls className="mb-2 w-full rounded-lg" />
            )}
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (!f) return
                setVideoFile(f)
                setVideoPreview(URL.createObjectURL(f))
                setExistingVideoPath('')
              }}
            />
          </div>
        </div>

        {/* Right column — images */}
        <div className="space-y-1.5">
          <Label>Images * (first uploaded is primary)</Label>
          <ImageUploader images={images} onChange={setImages} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 border-t border-black/5 pt-6">
        <Button type="submit" disabled={isPending} className="bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/80">
          {isPending ? 'Saving…' : painting ? 'Update Painting' : 'Upload Painting'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
