import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"

export const SectionPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <Pagination aria-label="Phân trang">
      <PaginationContent className="gap-3">
        <PaginationItem>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            aria-label="Trang trước"
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
            Trang <span className="text-foreground font-medium">{currentPage}</span> của{" "}
            <span className="text-foreground font-medium">{totalPages}</span>
          </p>
        </PaginationItem>
        <PaginationItem>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            aria-label="Trang sau"
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
