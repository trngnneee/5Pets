"use client";

import { adminOrderList } from "@/lib/adminAPI/order";
import { useEffect, useState } from "react";
import { UpdateButton } from "./UpdateButton";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { buildFilterParams } from "@/helper/paramsHelper";
import { useSearchParams } from "next/navigation";
import { AdminPagination } from "../../components/AdminPagination";
import { TableEmptyRow, TableLoadingRows } from "../../components/TableStateRows";
import { cn } from "@/lib/utils";

const COLUMN_COUNT = 8;

export default function OrderTable() {
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [fetching, setFetching] = useState(true);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const params = buildFilterParams({ page }, searchParams);
        const promise = await adminOrderList(params);
        if (promise.code === "success") {
          setOrderList(promise.orders_list);
          setTotalPages(promise.totalPages);
        }
      } finally {
        setLoaded(true);
        setFetching(false);
      }
    }
    fetchData();
  }, [page])

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
        <table className="min-w-full text-sm text-gray-700" aria-busy={fetching}>
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
          <tbody className={cn("transition-opacity", loaded && fetching && "opacity-60")}>
            {!loaded && <TableLoadingRows columns={COLUMN_COUNT} />}
            {loaded && orderList.length === 0 && (
              <TableEmptyRow columns={COLUMN_COUNT} message="Chưa có đơn hàng nào" />
            )}
            {loaded && orderList.length > 0 && orderList.map((item) => (
              <tr
                key={item.order_id}
                className="border-b hover:bg-gray-50 transition-colors align-top"
              >
                <td className="p-3 text-nowrap font-medium text-gray-800">{item.customer.fullname}</td>
                <td className="p-3 tabular-nums whitespace-nowrap">{item.phone}</td>
                <td className="p-3 break-all min-w-[160px]">{item.customer.email}</td>
                <td className="p-3 min-w-[180px]">{item.address}</td>
                <td className="p-3">
                  <OrderStatusBadge status={item.status} />
                </td>
                <td className="p-3 w-[300px] min-w-[240px]">
                  {item.order_details.map((detail, idx) => (
                    <div key={idx} className="mb-2 flex items-center gap-2">
                      <div className="w-[30px] h-[30px] shrink-0 overflow-hidden rounded bg-gray-100">
                        <img
                          src={detail.imageList?.[0]}
                          alt={detail.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">{detail.name}</div>
                        <div className="text-gray-600">
                          Số lượng: <span className="tabular-nums">{detail.quantity}</span> · Giá: <span className="tabular-nums">{parseInt(detail.price).toLocaleString("vi-VN")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="font-bold text-sm">Tổng tiền: <span className="tabular-nums">{parseInt(item.total).toLocaleString("vi-VN")}</span></div>
                </td>
                <td className="p-3 text-xs text-nowrap">
                  <div>{item.updated_by || "-"}</div>
                </td>
                <td className="p-3 text-center">
                  <UpdateButton id={item.order_id} currentStatus={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
