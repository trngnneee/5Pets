"use client"

import { ArrowRightIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useRouter } from "next/navigation";

export const HeaderSearch = () => {
  const [keyWord, setKeyword] = useState("");
  const router = useRouter();
  
  const handleSearch = () => {
    router.push(`/search?keyword=${encodeURIComponent(keyWord)}`);
  }

  return (
    <>
      <div className="*:not-first:mt-2">
        <form className="relative" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <Input
            id="search"
            className="peer ps-9 pe-9 rounded-[46px] bg-white"
            placeholder="Nhập từ khóa..."
            type="search"
            value={keyWord}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-[14px] font-medium text-[#99A2A5]"
            aria-label="Submit search"
            type="submit"
          >
            <ArrowRightIcon size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  );
}