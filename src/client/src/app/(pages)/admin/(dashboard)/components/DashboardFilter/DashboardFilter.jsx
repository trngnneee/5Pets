"use client"

import { useEffect, useState } from "react"
import { Funnel } from "lucide-react";
import { CreatedByFilter } from "./components/createdByFilter";
import { DateFilter } from "./components/dateFilter";
import { Button } from "@/components/ui/button";
import { CategoryFilter } from "./components/categoryFilter";
import { adminGetList } from "@/lib/adminAPI/account";
import { adminCategoryAllList } from "@/lib/adminAPI/category";

export const DashboardFilter = ({ showCreatedBy = true, showCategory = true, onFilterChange }) => {
  const [createdBy, setCreatedBy] = useState("");
  const [date, setDate] = useState({
    from: null,
    to: null,
  });
  const [category, setCategory] = useState("");

  const [adminList, setAdminList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const promise = await adminGetList();
      if (promise.code == "success") {
        setAdminList(promise.data);
      }
      const promise2 = await adminCategoryAllList();
      if (promise2.code == "success") {
        setCategoryList(promise2.data);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (onFilterChange)
    {
      onFilterChange({ createdBy, date, category });
    }
  }, [createdBy, date, category])

  const handleClearFilter = () => {
    setCreatedBy("");
    setDate({ from: null, to: null });
    setCategory("");
  }

  return (
    <div className="bg-white rounded-[14px] border-[0.6px] border-[#D5D5D5] flex items-stretch overflow-hidden text-sm font-medium w-3/4">
      <div className="flex flex-1 items-center gap-2 p-2 border-r-[0.6px] border-l-[#D5D5D5] w-[50px] justify-center text-[var(--main-color)]">
        <Funnel />
        <div className="">Bộ lọc</div>
      </div>

      {adminList && adminList.length > 0 && (
        <CreatedByFilter
          createdBy={createdBy}
          setCreatedBy={setCreatedBy}
          show={showCreatedBy}
          adminList={adminList}
        />
      )}

      <DateFilter
        date={date}
        setDate={setDate}
      />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
        show={showCategory}
        categoryList={categoryList}
      />

      <div className="flex flex-1 items-center gap-2 w-[200px] justify-center">
        <Button onClick={handleClearFilter} className="flex items-center gap-2 p-4 bg-white hover:bg-white text-red-400 rounded-none shadow-none cursor-pointer font-semibold">
          <div>Xóa bộ lọc</div>
        </Button>
      </div>
    </div>
  )
}