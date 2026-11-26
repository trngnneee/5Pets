"use client"

import { ArrowRightIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

export const HeaderSearch = ({ id = "search", className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef(null);

  // Giữ lại từ khóa đang tìm khi ở trang kết quả
  const urlKeyword = useSyncExternalStore(
    noopSubscribe,
    () => (pathname === "/search" ? new URLSearchParams(window.location.search).get("keyword") || "" : ""),
    () => ""
  );
  const [keyWord, setKeyword] = useState(urlKeyword);
  const [prevUrlKeyword, setPrevUrlKeyword] = useState(urlKeyword);
  if (urlKeyword !== prevUrlKeyword) {
    setPrevUrlKeyword(urlKeyword);
    if (urlKeyword) setKeyword(urlKeyword);
  }

  const handleSearch = () => {
    const keyword = keyWord.trim();
    if (!keyword) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  }

  return (
    <>
      <div className={cn("*:not-first:mt-2", className)}>
        <form role="search" className="relative" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <Input
            ref={inputRef}
            id={id}
            className="peer ps-9 pe-9 rounded-[46px] bg-white"
            placeholder="Nhập từ khóa..."
            aria-label="Tìm kiếm thú cưng"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            value={keyWord}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <SearchIcon size={16} aria-hidden="true" />
          </div>
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-[46px] transition-[color,box-shadow] outline-none hover:text-[var(--main-color)] focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-[14px] font-medium text-[#667479]"
            aria-label="Tìm kiếm"
            type="submit"
          >
            <ArrowRightIcon size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  );
}
