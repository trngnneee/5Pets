import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"

export const CreatedByFilter = ({ createdBy, setCreatedBy, show=true, adminList }) => {
  if (!show) return null;
  
  return (
    <div className="flex flex-1 items-center gap-2 border-r-[0.6px] border-r-[#D5D5D5] w-full justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2 p-4 bg-white hover:bg-white text-[var(--main-color)] rounded-none shadow-none">
            {adminList.find((item) => item.id == createdBy)?.fullname || "-- Người tạo --"}
            <ChevronDownIcon
              className="-me-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
          <DropdownMenuItem onClick={() => setCreatedBy("")}>-- Người tạo --</DropdownMenuItem>
            {adminList.map((item, index) => (
              <DropdownMenuItem key={index} onClick={() => setCreatedBy(item.id)}>{item.fullname}</DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}