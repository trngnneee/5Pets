"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const DetailInformationSkeleton = () => {
  return (
    <div className="flex flex-col gap-[18px] w-1/2 animate-pulse">
      <Skeleton className="h-5 w-[200px] rounded-md" />

      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-9 w-[70%] rounded-md" />
        <Skeleton className="h-8 w-[40%] rounded-md" /> 
      </div>

      <div className="flex gap-[18px]">
        <Skeleton className="h-11 w-[111px] rounded-full" />
        <Skeleton className="h-11 w-[210px] rounded-full" />
      </div>

      <div className="flex flex-col gap-1.5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex py-2 border-b">
            <Skeleton className="h-5 w-[194px] rounded-md mr-2.5" /> 
            <Skeleton className="h-5 flex-1 rounded-md" /> 
          </div>
        ))}
      </div>

      <div className="flex w-[252px] h-8 gap-[21px] py-1.5">
        <Skeleton className="h-5 w-[82px] rounded-md" />
        <div className="flex w-[129px] justify-between">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-[18px] w-[18px] rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
