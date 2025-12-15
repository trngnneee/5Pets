"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { orderStatusVariable } from "@/config/variable";
import { clientOrderList } from "@/lib/clientAPI/order";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OrderPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [orderList, setOrderList] = useState([]);
  const handleSearch = async () => {
    setLoading(true);
    const promise = clientOrderList({ email: email });
    toast.promise(promise, {
      loading: "Đang tìm kiếm đơn hàng...",
      success: (data) => {
        if (data.code == "success") {
          setOrderList(data.order_list);
          setLoading(false);
          return data.message;
        }
      },
      error: (data) => {
        setOrderList([]);
        setLoading(false);
        return data.message;
      },
    })
  }

  return (
    <>
      <div className="container mx-auto flex gap-10 my-5">
        <div className="w-1/3">
          <div className="text-[24px] font-bold text-[var(--main-color)]">Tìm kiếm đơn hàng</div>
          <div className="text-gray-400 text-[12px]">Nhập email để tìm kiếm</div>
          <div className="mt-10">
            <div className="mb-6 *:not-first:mt-2">
              <Label htmlFor="email" className="text-sm font-medium text-[var(--main-color)] ">Email*</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              className={"w-full bg-[var(--main-color)] hover:bg-[var(--main-hover)]"}
              onClick={handleSearch}
              disabled={loading}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
        <div className="bg-white border border-gray-100 w-full rounded-[20px] shadow-xl">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="p-3 text-left">Tên khách hàng</th>
                <th className="p-3 text-left text-nowrap">Số điện thoại</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Địa chỉ</th>
                <th className="p-3 text-left">Trạng thái</th>
                <th className="p-3 text-center">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orderList.length > 0 ? orderList.map((item, index) => (
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
                  <td className="p-3">
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
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-gray-400">
                    Không tìm thấy đơn hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}