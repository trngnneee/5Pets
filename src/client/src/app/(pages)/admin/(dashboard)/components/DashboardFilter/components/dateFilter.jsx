"use client"

import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"

const formatDay = (value) => format(value, "dd/MM/yyyy");

export const DateFilter = ({ date, setDate }) => {
  let label = "-- Chọn khoảng ngày --";
  if (date?.from && date?.to) {
    label = `${formatDay(date.from)} - ${formatDay(date.to)}`;
  } else if (date?.from) {
    label = `Từ ${formatDay(date.from)}`;
  }

  return (
    <div className="flex flex-1 items-center gap-2 border-r-[0.6px] border-r-[#D5D5D5] w-full justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            aria-label={`Lọc theo ngày: ${label}`}
            className="flex items-center gap-2 p-4 bg-white hover:bg-[#F5F6FA] text-[var(--main-color)] rounded-none shadow-none my-0 tabular-nums"
          >
            {label}
            <ChevronDownIcon
              className="-me-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Calendar
            mode="range"
            selected={date}
            // Bỏ chọn sẽ trả về undefined, giữ lại object rỗng để tránh lỗi
            onSelect={(range) => setDate(range || { from: null, to: null })}
            numberOfMonths={2}
            pagedNavigation
            showOutsideDays={false}
            className="rounded-md border p-2"
            classNames={{
              months: "gap-8",
              month:
                "relative first-of-type:before:hidden before:absolute max-sm:before:inset-x-2 max-sm:before:h-px max-sm:before:-top-2 sm:before:inset-y-2 sm:before:w-px before:bg-border sm:before:-left-4",
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
