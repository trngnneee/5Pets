"use client"

import { clientOrderDetail } from "@/lib/clientAPI/order";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const { id } = useParams();

  const [orderDetail, setOrderDetail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const promise = await clientOrderDetail(id);
      if (promise.code == "success") {
        setOrderDetail(promise.order_detail);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto my-5">
        <div className="font-bold text-[20px] text-[var(--main-color)] mb-[30px]">Đặt hàng thành công!</div>
        <div>
          {orderDetail && (
            <div>
              <table className="mb-5">
                <tbody>
                  <tr>
                    <td className="pr-5 font-bold text-[var(--main-color)]">Mã đơn hàng:</td>
                    <td className="font-light">{orderDetail.order_id}</td>
                  </tr>
                  <tr>
                    <td className="pr-5 font-bold text-[var(--main-color)]">Tên khách hàng:</td>
                    <td className="font-light">{orderDetail.customer.fullname}</td>
                  </tr>
                  <tr>
                    <td className="pr-5 font-bold text-[var(--main-color)]">Email:</td>
                    <td className="font-light">{orderDetail.customer.email}</td>
                  </tr>
                  <tr>
                    <td className="pr-5 font-bold text-[var(--main-color)]">Số điện thoại:</td>
                    <td className="font-light">{orderDetail.phone}</td>
                  </tr>
                  <tr>
                    <td className="pr-5 font-bold text-[var(--main-color)]">Địa chỉ:</td>
                    <td className="font-light">{orderDetail.address}</td>
                  </tr>
                  <tr>
                    <td className="pr-5 font-bold text-[var(--main-color)]">Ghi chú:</td>
                    <td className="font-light">{orderDetail.note}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="flex flex-col gap-[30px]">
            {orderDetail && orderDetail.pets.map((pet, index) => (
              <div key={index} className="flex gap-[30px] border-b border-b-gray-200 pb-5">
                <div className="w-[180px] h-[150px] overflow-hidden rounded-xl">
                  <img
                    src={pet.imageList[0]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between flex-1">
                  <div>
                    <div className="font-bold text-[var(--main-color)]">{pet.name}</div>
                    <div className="mt-3">
                      <div className="text-sm text-gray-500">Giống: <span className="font-bold">{pet.gender == "male" ? "Đực" : "Cái"}</span></div>
                      <div className="text-sm text-gray-500">Tuổi: <span className="font-bold">{pet.age}</span></div>
                      <div className="text-sm text-gray-500">Màu sắc: <span className="font-bold">{pet.color}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-bold mb-[30px]">Số lượng:</div>
                    <div className="flex items-center gap-5">
                      <div>Con:</div>
                      <div>{pet.quantity} x <span className="text-[var(--main-color)] font-semibold">{pet.price.toLocaleString("vi-VN")} VND</span></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-[15px]">
            <div className="flex justify-between">
              <div className="text-sm font-semibold">Tổng tiền:</div>
              <div>{orderDetail && orderDetail.total.toLocaleString("vi-VN")} VND</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-semibold">Giảm:</div>
              <div>- 0 VND</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-semibold">Tổng tiền:</div>
              <div className="text-[22px] font-bold text-[var(--main-color)]">{orderDetail && orderDetail.total.toLocaleString("vi-VN")} VND</div>
            </div>
          </div>
        </div>
        <div className="w-full mt-10">
          <Link href="/" className="font-medium text-xl hover:underline text-[var(--main-color)]">Quay lại trang chủ</Link>
        </div>
      </div>
    </>
  )
}