import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react"

export default function PetPagination({
  currentPage,
  totalPages,
  onFilterChange
}) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (onFilterChange)
      onFilterChange((prev) => ({ ...prev, page }));
  }, [page])
  
  return (
    <Pagination>
      <PaginationContent className="w-[200px] justify-between mt-5">
        <PaginationItem>
          <PaginationLink
            className={cn(
              "aria-disabled:pointer-events-none aria-disabled:opacity-50",
              buttonVariants({
                variant: "outline",
              })
            )}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            aria-label="Go to previous page"
            aria-disabled={page === 1 ? true : undefined}
            role={page === 1 ? "link" : undefined}
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Trang <span className="text-foreground">{page}</span> của{" "}
            <span className="text-foreground">{totalPages}</span>
          </p>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={cn(
              "aria-disabled:pointer-events-none aria-disabled:opacity-50",
              buttonVariants({
                variant: "outline",
              })
            )}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            aria-label="Go to next page"
            aria-disabled={page === totalPages ? true : undefined}
            role={page === totalPages ? "link" : undefined}
          >
            <ChevronRightIcon size={16} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}