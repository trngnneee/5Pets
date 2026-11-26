"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { clientOrderList } from "@/lib/clientAPI/order";
import { Loader2, PackageSearch } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function OrderPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [orderList, setOrderList] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Vui lòng nhập email đã dùng khi đặt hàng.");
      return;
    }
    if (!EMAIL_REGEX.test(value)) {
      setError("Email chưa đúng định dạng, ví dụ: ban@gmail.com");
      return;
    }
    setError("");
    setLoading(true);

    const promise = clientOrderList({ email: value });
    toast.promise(promise, {
      loading: "Đang tìm kiếm đơn hàng...",
      success: (data) => {
        setOrderList(data.order_list || []);
        return data.message;
      },
      error: (data) => {
        setOrderList([]);
        return data.message;
      },
    });

    try {
      await promise;
    } catch {
      // lỗi đã được hiển thị qua toast
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }

  return (
    <>
      <div className="container mx-auto flex max-lg:flex-col gap-10 max-lg:gap-6 my-5">
        <div className="w-1/3 max-lg:w-full shrink-0">
          <h1 className="text-[24px] font-bold text-[var(--main-color)]">Tìm kiếm đơn hàng</h1>
          <p className="text-[#667479] text-sm">Nhập email bạn đã dùng khi đặt hàng để xem trạng thái đơn.</p>
          <form className="mt-10 max-lg:mt-6" onSubmit={handleSearch} noValidate>
            <div className="mb-6 *:not-first:mt-2">
              <Label htmlFor="email" className="text-sm font-medium text-[var(--main-color)]">Email <span className="text-destructive" aria-hidden="true">*</span></Label>
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                value={email}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "order-email-error" : undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />
              {error && (
                <p id="order-email-error" role="alert" className="text-xs text-destructive">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              className={"w-full bg-[var(--main-color)] hover:bg-[var(--main-hover)] max-md:h-11"}
              disabled={loading}
              aria-busy={loading}
            >
              {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
              {loading ? "Đang tìm kiếm..." : "Tìm kiếm"}
            </Button>
          </form>
        </div>
        <div className="bg-white border border-gray-100 w-full min-w-0 rounded-[20px] shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <caption className="sr-only">Danh sách đơn hàng</caption>
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th scope="col" className="p-3 text-left text-nowrap">Tên khách hàng</th>
                  <th scope="col" className="p-3 text-left text-nowrap">Số điện thoại</th>
                  <th scope="col" className="p-3 text-left">Email</th>
                  <th scope="col" className="p-3 text-left">Địa chỉ</th>
                  <th scope="col" className="p-3 text-left text-nowrap">Trạng thái</th>
                  <th scope="col" className="p-3 text-left">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(3)].map((_, index) => (
                    <tr key={index} className="border-b" aria-hidden="true">
                      {[...Array(6)].map((__, cellIndex) => (
                        <td key={cellIndex} className="p-3"><Skeleton className="h-4 w-full min-w-16" /></td>
                      ))}
                    </tr>
                  ))
                ) : orderList.length > 0 ? orderList.map((item) => (
                  <tr
                    key={item.order_id}
                    className="border-b hover:bg-gray-50 transition-colors align-top"
                  >
                    <td className="p-3 text-nowrap">{item.customer.fullname}</td>
                    <td className="p-3 tabular-nums">{item.phone}</td>
                    <td className="p-3 break-all min-w-40">{item.customer.email}</td>
                    <td className="p-3 min-w-48">{item.address}</td>
                    <td className="p-3">
                      <OrderStatusBadge status={item.status} />
                    </td>
                    <td className="p-3 min-w-56">
                      <div className="text-xs text-[#667479] mb-2 break-all">Mã đơn: <span className="font-medium text-[#00171F]">{item.order_id}</span></div>
                      {item.order_details.map((detail, idx) => (
                        <div key={idx} className="mb-2 flex items-center gap-2">
                          <div className="w-[36px] h-[36px] shrink-0 overflow-hidden rounded-md bg-muted">
                            <img
                              src={detail.imageList?.[0]}
                              alt={detail.name}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-xs">
                            <div className="font-medium">{detail.name}</div>
                            <div className="text-[#667479] tabular-nums">Số lượng: {detail.quantity} · Giá: {parseInt(detail.price).toLocaleString("vi-VN")} VND</div>
                          </div>
                        </div>
                      ))}
                      <div className="font-bold text-sm tabular-nums">Tổng tiền: {parseInt(item.total).toLocaleString("vi-VN")} VND</div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="p-3">
                      <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                        <PackageSearch className="size-8 text-[#99A2A5]" aria-hidden="true" />
                        <div className="font-medium text-[#00171F]">
                          {searched ? "Không tìm thấy đơn hàng nào" : "Chưa có kết quả"}
                        </div>
                        <div className="text-sm text-[#667479]">
                          {searched
                            ? "Kiểm tra lại email bạn đã nhập khi đặt hàng."
                            : "Nhập email ở bên trái để tra cứu đơn hàng của bạn."}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
