"use client";

import { adminCategoryList } from "@/lib/adminAPI/category";
import { AdminDeleteButton } from "../../components/TableButton/DeleteButton";
import { AdminEditButton } from "../../components/TableButton/EditButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { buildFilterParams } from "@/helper/paramsHelper";

export default function CategoryTable({ filter, itemsToDelete, setItemsToDelete, setTotalPages }) {
  const [categoryList, setCategoryList] = useState([]);
  const searchParams = useSearchParams();

  // Tự động cập nhật trạng thái "check all"
  const isAllChecked =
    categoryList.length > 0 &&
    categoryList.every((item) => itemsToDelete.includes(item.id));

  useEffect(() => {
    const fetchData = async () => {
      const params = buildFilterParams(filter, searchParams);
      const promise = await adminCategoryList(params);
      if (promise.code === "success") {
        setCategoryList(promise.data);
        setTotalPages(promise.totalPages);
      }
    };
    fetchData();
  }, [filter]);

  // Handler cho checkbox tổng
  const handleCheckAll = (checked) => {
    if (checked) {
      setItemsToDelete(categoryList.map((item) => item.id));
    } else {
      setItemsToDelete([]);
    }
  };

  // Handler cho từng checkbox item
  const handleCheckItem = (checked, id) => {
    if (checked) {
      setItemsToDelete((prev) => [...prev, id]);
    } else {
      setItemsToDelete((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th className="p-3 w-10">
              <Checkbox
                className="data-[state=checked]:bg-[var(--main-color)]"
                checked={isAllChecked}
                onCheckedChange={handleCheckAll}
              />
            </th>
            <th className="p-3 text-left">Tên danh mục</th>
            <th className="p-3 text-left">Ảnh đại diện</th>
            <th className="p-3 text-left">Tạo bởi</th>
            <th className="p-3 text-left">Cập nhật bởi</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 text-center">
                  <Checkbox
                    className="data-[state=checked]:bg-[var(--main-color)]"
                    checked={itemsToDelete.includes(item.id)}
                    onCheckedChange={(checked) => handleCheckItem(checked, item.id)}
                  />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-13 h-13 object-cover rounded-md"
                  />
                </td>
                <td className="p-3">
                  <div className="flex flex-col">
                    <span>{item.createdBy}</span>
                    <span className="text-xs text-gray-400">{item.createdAt}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col">
                    <span>{item.updatedBy}</span>
                    <span className="text-xs text-gray-400">{item.updatedAt}</span>
                  </div>
                </td>
                <td className="p-3 flex items-center justify-center gap-2">
                  <AdminEditButton link={`/admin/category/edit/${item.id}`} />
                  <AdminDeleteButton api={`${process.env.NEXT_PUBLIC_API_URL}/admin/category/delete/${item.id}`} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}