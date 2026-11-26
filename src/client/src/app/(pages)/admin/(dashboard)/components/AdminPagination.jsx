"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Phân trang được điều khiển hoàn toàn bằng props (không giữ state riêng)
export const AdminPagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const total = Math.max(Number(totalPages) || 1, 1);
  const page = Math.min(Math.max(Number(currentPage) || 1, 1), total);

  const goTo = (nextPage) => {
    if (nextPage < 1 || nextPage > total || nextPage === page) return;
    onPageChange?.(nextPage);
  };

  return (
    <nav aria-label="Phân trang" className="mx-auto mt-5 flex w-full justify-center">
      <div className="flex w-[200px] items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => goTo(page - 1)}
          disabled={page <= 1}
          aria-label="Trang trước"
        >
          <ChevronLeftIcon size={16} aria-hidden="true" />
        </Button>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Trang <span className="text-foreground tabular-nums">{page}</span> của{" "}
          <span className="text-foreground tabular-nums">{total}</span>
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => goTo(page + 1)}
          disabled={page >= total}
          aria-label="Trang sau"
        >
          <ChevronRightIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
};
