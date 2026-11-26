"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon, XIcon } from "lucide-react"
import { useEffect, useState } from "react";

export const DashboardSearch = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("");

  // Debounce 300ms để không gọi API sau mỗi lần gõ phím
  useEffect(() => {
    const timer = setTimeout(() => {
      const value = keyword.trim();
      onFilterChange((prev) => (
        prev.keyword === value ? prev : { ...prev, keyword: value, page: 1 }
      ));
    }, 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id="search"
          className="peer ps-9 pe-9 bg-white"
          placeholder="Tìm kiếm..."
          aria-label="Tìm kiếm"
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setKeyword("");
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <SearchIcon size={16} aria-hidden="true" />
        </div>
        {keyword && (
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            aria-label="Xóa từ khóa"
            title="Xóa từ khóa"
            type="button"
            onClick={() => setKeyword("")}
          >
            <XIcon size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
