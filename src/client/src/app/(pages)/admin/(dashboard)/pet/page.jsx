"use client"

import { Suspense, useEffect, useState } from "react";
import { DashboardFilter } from "../components/DashboardFilter/DashboardFilter";
import { DashboardMultipleApply } from "../components/DashboardMultipleApply";
import { DashboardSearch } from "../components/DashboardSearch";
import { Button } from "@/components/ui/button";
import { Import, PlusIcon } from "lucide-react";
import PetTable from "./components/PetTable";
import { useRouter } from "next/navigation";
import PetPagination from "./components/PetPagination";
import { adminPetTotalPage } from "@/lib/adminAPI/pet";

export default function AdminPet() {
  const router = useRouter();
  // Lọc và phân trang
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
          onFilterChange={handleFilterChange}
        />
        <div className="mt-[15px] flex items-center gap-5">
          <DashboardMultipleApply
            itemsToDelete={itemsToDelete}
            api={`${process.env.NEXT_PUBLIC_API_URL}/admin/pet/multi-delete`}
          />
          <DashboardSearch
            onFilterChange={handleFilterChange}
          />
          <Button onClick={() => router.push("/admin/pet/create")} variant="outline" className="aspect-square max-sm:p-0 bg-[var(--main-color)] hover:bg-[var(--main-hover)] text-white hover:text-white">
            <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
            <span className="max-sm:sr-only">Tạo mới</span>
          </Button>
          <Button onClick={() => router.push("/admin/pet/import")} variant="outline" className="aspect-square max-sm:p-0 bg-[var(--main-color)] hover:bg-[var(--main-hover)] text-white hover:text-white">
            <Import className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
            <span className="max-sm:sr-only">Import file JSON/CSV</span>
          </Button>
        </div>

        <PetTable filter={filter} itemsToDelete={itemsToDelete} setItemsToDelete={setItemsToDelete} setTotalPages={setTotalPages} />
        <Suspense fallback={<div>Loading pagination...</div>}>
          <PetPagination
            onFilterChange={handleFilterChange}
            currentPage={filter.page}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
    </>
  )
}