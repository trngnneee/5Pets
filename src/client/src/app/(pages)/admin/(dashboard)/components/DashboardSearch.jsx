"use client"

import { Input } from "@/components/ui/input"
import { ArrowRightIcon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react";

export const DashboardSearch = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("");
  
  useEffect(() => {
    onFilterChange((prev) => ({ ...prev, keyword }));
  }, [keyword]);

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id="search"
          className="peer ps-9 pe-9 bg-white"
          placeholder="Tìm kiếm..."
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}