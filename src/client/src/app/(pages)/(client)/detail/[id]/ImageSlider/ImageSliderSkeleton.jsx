"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const ImageSliderSkeleton = () => {
  return (
    <div className="w-1/2 animate-pulse flex flex-col gap-2">
      <Skeleton className="w-full h-[476px] rounded-[10px]" />

      <Skeleton className="h-5 w-[120px] rounded-md mt-2 mx-auto" />

      <div className="flex gap-2 mt-3">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="flex-1 h-[100px] rounded-[10px]"
          />
        ))}
      </div>
    </div>
  )
}