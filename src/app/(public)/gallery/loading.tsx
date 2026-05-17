export default function Loading() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mb-10 sm:mb-14">
        <div className="h-3 w-40 animate-pulse rounded bg-[#1A1A1A]/8" />
        <div className="mt-3 h-12 w-44 animate-pulse rounded bg-[#1A1A1A]/8 sm:h-14" />
        <div className="mt-3 h-3 w-16 animate-pulse rounded bg-[#1A1A1A]/8" />
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-x-8 md:gap-y-14 lg:grid-cols-4 lg:gap-x-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[4/5] animate-pulse rounded-sm bg-[#1A1A1A]/8" />
            <div className="space-y-2">
              <div className="h-5 w-3/4 animate-pulse rounded bg-[#1A1A1A]/8" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-[#1A1A1A]/8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
