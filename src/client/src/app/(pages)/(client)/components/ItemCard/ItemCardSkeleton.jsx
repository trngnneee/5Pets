import { Skeleton } from "@/components/ui/skeleton";
import { Dot } from "lucide-react";

export const ItemCardSkeleton = () => {
  return (
    <div className="p-2 shadow-xl rounded-2xl animate-pulse w-full box-border">
      <div className="overflow-hidden mb-4 h-[250px] w-[300px] rounded-2xl">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="px-2 space-y-2">
        <Skeleton className="h-5 w-3/4 rounded-md" />

        <div className="flex items-center gap-2 text-[12px]">
          <Skeleton className="h-3 w-10 rounded-md" />
          <Dot className="text-gray-300" />
          <Skeleton className="h-3 w-8 rounded-md" />
        </div>

        <Skeleton className="h-5 w-1/2 rounded-md mt-2" />
      </div>
    </div>
  );
};
