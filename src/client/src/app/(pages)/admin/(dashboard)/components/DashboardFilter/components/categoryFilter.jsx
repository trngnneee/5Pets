import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildCategoryTree } from "@/helper/renderCategory";
import { ChevronDownIcon } from "lucide-react";

export const CategoryFilter = ({ category, setCategory, show = true, categoryList }) => {
  if (!show) return null;
  
  return (
    <div className="flex flex-1 items-center gap-2 border-r-[0.6px] border-l-[#D5D5D5] w-full justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2 p-4 bg-white hover:bg-white text-[var(--main-color)] rounded-none shadow-none">
            {categoryList.find((item) => item.id == category)?.name || "-- Danh mục --"}
            <ChevronDownIcon
              className="-me-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width]">
          {categoryList?.length > 0 && buildCategoryTree(categoryList, setCategory)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};