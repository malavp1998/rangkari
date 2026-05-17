'use client'

import { useRef, useState, useCallback } from 'react'
import { Upload, X, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface UploadedImage {
  id: string           // local temp id
  file?: File          // set for new local files
  previewUrl: string   // object URL or existing storage URL
  storagePath?: string // set after upload to Supabase
  storageUrl?: string  // public URL after upload
  isPrimary: boolean
  displayOrder: number
}

interface ImageUploaderProps {
  images: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return
    const newImages: UploadedImage[] = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .map((file, i) => ({
        id: `${Date.now()}-${i}`,
        file,
        previewUrl: URL.createObjectURL(file),
        isPrimary: images.length === 0 && i === 0,
        displayOrder: images.length + i,
      }))
    onChange([...images, ...newImages])
  }, [images, onChange])

  function remove(id: string) {
    const updated = images
      .filter((img) => img.id !== id)
      .map((img, i) => ({ ...img, displayOrder: i }))
    // Ensure one primary
    if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
      updated[0].isPrimary = true
    }
    onChange(updated)
  }

  function setPrimary(id: string) {
    onChange(images.map((img) => ({ ...img, isPrimary: img.id === id })))
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-10 transition-colors',
          dragging ? 'border-amber-400 bg-amber-50' : 'border-black/20 hover:border-black/40 hover:bg-black/[0.02]'
        )}
      >
        <Upload className="h-8 w-8 text-[#1A1A1A]/30" />
        <div className="text-center">
          <p className="text-sm font-medium">Drop images here or click to select</p>
          <p className="mt-0.5 text-xs text-[#1A1A1A]/40">JPG, PNG, WebP — multiple allowed</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      {/* Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border border-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.previewUrl} alt="" className="h-full w-full object-cover" />

              {/* Primary star — always visible on mobile, hover on desktop */}
              <button
                type="button"
                onClick={() => setPrimary(img.id)}
                title={img.isPrimary ? 'Primary image' : 'Set as primary'}
                className={cn(
                  'absolute left-1.5 top-1.5 rounded-full p-1 transition-colors',
                  img.isPrimary
                    ? 'bg-amber-400 text-white'
                    : 'bg-black/50 text-white md:bg-black/40 md:text-white/70 md:opacity-0 md:group-hover:opacity-100'
                )}
              >
                <Star className="h-3 w-3" fill={img.isPrimary ? 'currentColor' : 'none'} />
              </button>

              {/* Remove — always visible on mobile, hover on desktop */}
              <button
                type="button"
                onClick={() => remove(img.id)}
                className="absolute right-1.5 top-1.5 rounded-full bg-black/50 p-1 text-white transition-opacity md:bg-black/40 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-[#1A1A1A]/40">
          ★ = primary image shown in gallery. Click star to change.
        </p>
      )}
    </div>
  )
}
