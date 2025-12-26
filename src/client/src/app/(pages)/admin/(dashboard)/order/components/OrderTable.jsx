"use client";

import { adminOrderList } from "@/lib/adminAPI/order";
import { useEffect, useState } from "react";
import { UpdateButton } from "./UpdateButton";
import { Badge } from "@/components/ui/badge";
import { orderStatusVariable } from "@/config/variable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buildFilterParams } from "@/helper/paramsHelper";
import { useSearchParams } from "next/navigation";
import { formatDate } from "date-fns";

export default function OrderTable() {
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      const params = buildFilterParams({ page }, searchParams);
      //console.log(params);
      const promise = await adminOrderList(params);
      console.log("Response from backend:", promise.orders_list);
      if (promise.code === "success") {
        setOrderList(promise.orders_list);
        setTotalPages(promise.totalPages);
      }
    }
    fetchData();
  }, [page])

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="p-3 text-left">Tên khách hàng</th>
              <th className="p-3 text-left">Số điện thoại</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Địa chỉ</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-center">Chi tiết</th>
              <th className="p-3 text-left">Cập nhật bởi</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orderList.length > 0 && orderList.map((item, index) => (
              <tr
                key={item.order_id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 text-nowrap">{item.customer.fullname}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">{item.customer.email}</td>
                <td className="p-3">{item.address}</td>
                <td className="p-3">
                  {item.status == "pending" ? (
                    <Badge variant={"ghost"}>{orderStatusVariable.find((i) => i.value == item.status)?.label}</Badge>
                  ) : (
                    item.status == "shipping" ? (
                      <Badge variant={"destructive"}>{orderStatusVariable.find((i) => i.value == item.status)?.label}</Badge>
                    ) : (
                      item.status == "delivered" && (
                        <Badge variant={""}>{orderStatusVariable.find((i) => i.value == item.status)?.label}</Badge>
                      )
                    )
                  )}
                </td>
                <td className="p-3 w-[300px]">
                  {item.order_details.map((detail, idx) => (
                    <div key={idx} className="mb-2 flex items-center gap-2">
                      <div className="w-[30px] h-[30px] overflow-hidden">
                        <img
                          src={detail.imageList[0]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[10px]">
                        <div className="font-medium">{detail.name}</div>
                        <div>Số lượng: {detail.quantity}</div>
                        <div>Giá: {parseInt(detail.price).toLocaleString("vi-VN")}</div>
                      </div>
                    </div>
                  ))}
                  <div className="font-bold text-sm">Tổng tiền: {parseInt(item.total).toLocaleString("vi-VN")}</div>
                </td>
                <td className="p-3 text-[10px] text-nowrap">
                  <div>{item.updated_by || "-"}</div>
                </td>
                <td className="p-3 text-center">
                  <UpdateButton id={item.order_id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination>
        <PaginationContent className="w-[200px] justify-between mt-5">
          <PaginationItem>
            <PaginationLink
              className={cn(
                "aria-disabled:pointer-events-none aria-disabled:opacity-50",
                buttonVariants({
                  variant: "outline",
                })
              )}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              aria-label="Go to previous page"
              aria-disabled={page === 1 ? true : undefined}
              role={page === 1 ? "link" : undefined}
            >
              <ChevronLeftIcon size={16} aria-hidden="true" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Trang <span className="text-foreground">{page}</span> của{" "}
              <span className="text-foreground">{totalPages}</span>
            </p>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className={cn(
                "aria-disabled:pointer-events-none aria-disabled:opacity-50",
                buttonVariants({
                  variant: "outline",
                })
              )}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              aria-label="Go to next page"
              aria-disabled={page === totalPages ? true : undefined}
              role={page === totalPages ? "link" : undefined}
            >
              <ChevronRightIcon size={16} aria-hidden="true" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}