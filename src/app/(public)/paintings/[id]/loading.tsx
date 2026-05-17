export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-8 h-3 w-32 animate-pulse rounded bg-[#1A1A1A]/8 sm:mb-10" />

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        {/* Image skeleton */}
        <div className="space-y-3">
          <div className="aspect-[4/5] animate-pulse rounded-sm bg-[#1A1A1A]/8" />
          <div className="flex gap-2">
            <div className="h-16 w-16 animate-pulse rounded-sm bg-[#1A1A1A]/8" />
            <div className="h-16 w-16 animate-pulse rounded-sm bg-[#1A1A1A]/8" />
          </div>
        </div>

        {/* Details skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-6 w-24 animate-pulse rounded-full bg-[#1A1A1A]/8" />
            <div className="h-12 w-3/4 animate-pulse rounded bg-[#1A1A1A]/8" />
            <div className="h-8 w-1/3 animate-pulse rounded bg-[#1A1A1A]/8" />
          </div>
          <div className="space-y-3 border-t border-[#1A1A1A]/8 pt-6">
            <div className="h-4 w-full animate-pulse rounded bg-[#1A1A1A]/8" />
            <div className="h-4 w-full animate-pulse rounded bg-[#1A1A1A]/8" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-[#1A1A1A]/8" />
          </div>
          <div className="h-14 animate-pulse rounded bg-[#1A1A1A]/8" />
        </div>
      </div>
    </div>
  )
}
