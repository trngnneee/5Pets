"use client"

import { Button } from "@/components/ui/button";
import { DashboardFilter } from "../components/DashboardFilter/DashboardFilter";
import { DashboardMultipleApply } from "../components/DashboardMultipleApply";
import { DashboardSearch } from "../components/DashboardSearch";
import CategoryTable from "./components/CategoryTable";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { Suspense, useState } from "react";
import CategoryPagination from "./components/CategoryPagination";

export default function AdminCategory() {
  const router = useRouter();
  // Lọc và tìm kiếm
  const [filter, setFilter] = useState({
    createdBy: "",
    date: { from: null, to: null },
    category: "",
    keyword: "",
    page: 1
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  }

  // Xóa nhiều phần tử
  const [itemsToDelete, setItemsToDelete] = useState([]);

  // Phân trang
  const [totalPages, setTotalPages] = useState(1);

  return (
    <>
      <div className="mt-6">
        <DashboardFilter
          showCategory={false}
          onFilterChange={handleFilterChange}
        />
        <div className="mt-[15px] flex items-center gap-5">
          <DashboardMultipleApply
            itemsToDelete={itemsToDelete}
            api={`${process.env.NEXT_PUBLIC_API_URL}/admin/category/multi-delete`}
          />
          <DashboardSearch
            onFilterChange={handleFilterChange}
          />
          <Button onClick={() => router.push("/admin/category/create")} variant="outline" className="aspect-square max-sm:p-0 bg-[var(--main-color)] hover:bg-[var(--main-hover)] text-white hover:text-white">
            <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
            <span className="max-sm:sr-only">Tạo mới</span>
          </Button>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <CategoryTable
            filter={filter}
            itemsToDelete={itemsToDelete}
            setItemsToDelete={setItemsToDelete}
            setTotalPages={setTotalPages}
          />
        </Suspense>

        <CategoryPagination
          onFilterChange={handleFilterChange}
          currentPage={filter.page}
          totalPages={totalPages}
        />
      </div>
    </>
  )
}