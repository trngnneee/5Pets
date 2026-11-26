"use client"

import { clientOrderDetail } from "@/lib/clientAPI/order";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function OrderSuccessPage() {
  const { id } = useParams();

  const [orderDetail, setOrderDetail] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await clientOrderDetail(id);
        setOrderDetail(promise.order_detail);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    fetchData();
  }, [id]);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(orderDetail.order_id);
      toast.success("Đã sao chép mã đơn hàng");
    } catch {
      toast.error("Không sao chép được mã đơn hàng");
    }
  };

  const infoList = orderDetail ? [
    { label: "Tên khách hàng", value: orderDetail.customer.fullname },
    { label: "Email", value: orderDetail.customer.email },
    { label: "Số điện thoại", value: orderDetail.phone },
    { label: "Địa chỉ", value: orderDetail.address },
    { label: "Ghi chú", value: orderDetail.note },
  ] : [];

  return (
    <>
      <div className="container mx-auto my-5">
        <div className="shadow-xl p-[30px] max-md:p-5 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-[30px] max-md:mb-5">
            <CheckCircle2 className="size-8 shrink-0 text-emerald-600" aria-hidden="true" />
            {/* Giữ nguyên thẻ div + nội dung: bộ test Katalon kiểm tra chính xác text này */}
            <div className="font-bold text-[20px] text-[var(--main-color)]">Đặt hàng thành công!</div>
          </div>

          {status === "loading" && (
            <div className="space-y-3" aria-hidden="true">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-5 w-full max-w-md" />
              ))}
            </div>
          )}

          {status === "error" && (
            <p className="text-sm text-[#667479]" role="status">
              Đơn hàng đã được ghi nhận nhưng chưa tải được chi tiết. Bạn có thể tra cứu lại tại trang đơn hàng bằng email đã đặt.
            </p>
          )}

          {orderDetail && (
            <>
              <p className="text-sm text-[#667479] mb-5">Cảm ơn bạn đã tin tưởng 5Pets. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.</p>
              <dl className="mb-5 grid grid-cols-[max-content_1fr] max-sm:grid-cols-1 gap-x-5 gap-y-2 text-sm">
                <dt className="font-bold text-[var(--main-color)]">Mã đơn hàng:</dt>
                <dd className="flex items-center gap-2 min-w-0">
                  <span className="font-medium break-all">{orderDetail.order_id}</span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    aria-label="Sao chép mã đơn hàng"
                    title="Sao chép mã đơn hàng"
                    className="shrink-0 rounded-md p-1 text-[#667479] hover:bg-gray-100 hover:text-[var(--main-color)] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <Copy className="size-4" aria-hidden="true" />
                  </button>
                </dd>
                {infoList.map((info) => (
                  <div key={info.label} className="contents">
                    <dt className="font-bold text-[var(--main-color)] max-sm:mt-2">{info.label}:</dt>
                    <dd className="text-[#00171F] break-words">{info.value || "—"}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col gap-[30px] max-md:gap-5">
                {orderDetail.pets.map((pet, index) => (
                  <div key={index} className="flex gap-[30px] max-md:gap-4 border-b border-b-gray-200 pb-5">
                    <div className="w-[180px] h-[150px] max-md:w-[96px] max-md:h-[96px] shrink-0 overflow-hidden rounded-xl bg-muted">
                      <img
                        src={pet.imageList?.[0]}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex max-lg:flex-col justify-between gap-3 flex-1 min-w-0">
                      <div className="min-w-0">
                        <div className="font-bold text-[var(--main-color)] break-words">{pet.name}</div>
                        <div className="mt-3">
                          <div className="text-sm text-gray-500">Giống: <span className="font-bold">{pet.gender == "male" ? "Đực" : "Cái"}</span></div>
                          <div className="text-sm text-gray-500">Tuổi: <span className="font-bold">{pet.age}</span></div>
                          <div className="text-sm text-gray-500">Màu sắc: <span className="font-bold">{pet.color}</span></div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end max-lg:items-start">
                        <div className="font-bold mb-[30px] max-lg:mb-1">Số lượng:</div>
                        <div className="tabular-nums">{pet.quantity} x <span className="text-[var(--main-color)] font-semibold">{pet.price.toLocaleString("vi-VN")} VND</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-[15px]">
                <div className="flex justify-between">
                  <div className="text-sm font-semibold">Tạm tính:</div>
                  <div className="tabular-nums">{orderDetail.total.toLocaleString("vi-VN")} VND</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-semibold">Giảm giá:</div>
                  <div className="tabular-nums">- 0 VND</div>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-[15px]">
                  <div className="text-sm font-semibold">Tổng thanh toán:</div>
                  <div className="text-[22px] font-bold text-[var(--main-color)] tabular-nums">{orderDetail.total.toLocaleString("vi-VN")} VND</div>
                </div>
              </div>
            </>
          )}

          <div className="w-full mt-10 max-md:mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-[57px] px-7 max-md:h-11">
              <Link href="/">Tiếp tục mua sắm</Link>
            </Button>
            <Button asChild variant="outline" className="border-[var(--main-color)] text-[var(--main-color)] rounded-[57px] px-7 hover:bg-[#FCEED5] hover:text-[var(--main-color)] max-md:h-11">
              <Link href="/order">Tra cứu đơn hàng</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
