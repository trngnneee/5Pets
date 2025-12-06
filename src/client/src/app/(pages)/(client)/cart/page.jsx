"use client"

import { Input } from "@/components/ui/input";
import { CartItem } from "./components/CartItem";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { clientPetDetailList } from "@/lib/clientAPI/pet";
import { convertToNumber } from "@/helper/cartHelper";

export default function CartPage() {
  const [petDetailList, setPetDetailList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const idList = JSON.parse(localStorage.getItem("cart")) || [];
      if (idList.length === 0) {
        return;
      }
      const promise = await clientPetDetailList(idList);
      if (promise.code === "success") {
        setPetDetailList(promise.data);
        setTotalPrice(promise.data.map((item) => convertToNumber(item.price)).reduce((a, b) => a + b, 0));
      } 
    } 
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto my-5">
        <div className="shadow-xl p-[30px] rounded-2xl border border-gray-100">
          <div className="font-bold text-[20px] text-[var(--main-color)] mb-[30px]">Giỏ hàng</div>
          <div className="flex flex-col gap-[30px]">
            {petDetailList.length > 0 && petDetailList.map((pet, index) => (
              <CartItem 
                key={index}
                pet={pet}
              />
            ))}
            {petDetailList.length === 0 && (
              <div className="text-center text-gray-500">Giỏ hàng của bạn đang trống</div>
            )}
          </div>
          <div className="mt-5 flex flex-col gap-[15px]">
            <div className="flex justify-between">
              <div className="text-sm font-semibold">Tổng tiền:</div>
              <div>{totalPrice.toLocaleString("vi-VN")} VND</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-semibold">Giảm:</div>
              <div>- 0 VND</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-semibold">Tổng tiền:</div>
              <div className="text-[22px] font-bold text-[var(--main-color)]">{totalPrice.toLocaleString("vi-VN")} VND</div>
            </div>
          </div>
        </div>
        <div className="shadow-xl p-[30px] rounded-2xl border border-gray-100 mt-5">
          <form>
            <div className="font-bold text-[20px] text-[var(--main-color)] mb-[30px]">Thông tin khách hàng</div>
            <div className="flex items-center gap-[30px]">
              <div className="w-full *:not-first:mt-2">
                <Label htmlFor="fullname" className="mb-2 text-[var(--main-color)]">Họ và tên</Label>
                <Input
                  type="text"
                  name="fullname"
                  placeholder="Le Van A"
                  className="mb-5"
                />
              </div>
              <div className="w-full *:not-first:mt-2">
                <Label htmlFor="phone" className="mb-2 text-[var(--main-color)]">Số điện thoại</Label>
                <Input
                  type="text"
                  name="phone"
                  placeholder="0123456789"
                  className="mb-5"
                />
              </div>
            </div>
            <div className="flex items-center gap-[30px]">
              <div className="w-full *:not-first:mt-2">
                <Label htmlFor="email" className="mb-2 text-[var(--main-color)]">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  className="mb-5"
                />
              </div>
              <div className="w-full *:not-first:mt-2">
                <Label htmlFor="address" className="mb-2 text-[var(--main-color)]">Địa chỉ</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="123 Đường ABC, Quận 1, TP.HCM"
                  className="mb-5"
                />
              </div>
            </div>
            <div className="w-full *:not-first:mt-2">
              <Label htmlFor="note" className="mb-2 text-[var(--main-color)]">Ghi chú đơn hàng</Label>
              <Textarea
                placeholder="Ghi chú đơn hàng (nếu có)"
                className="w-full mb-5"
              />
            </div>
            <div className="font-bold text-[20px] text-[var(--main-color)] mb-[30px]">Phương thức thanh toán</div>
            <div className="flex flex-col gap-[15px]">
              <div className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-[var(--main-color)]">
                <Checkbox
                  className="order-1 after:absolute after:inset-0"
                  checked={paymentMethod === "momo"}
                  onCheckedChange={() => setPaymentMethod("momo")}
                />
                <div className="flex grow items-start gap-3">
                  <div className="w-[50px] h-[50px] overflow-hidden mr-2">
                    <img
                      src="/momo.png"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>
                      Momo{" "}
                      <span className="font-normal text-muted-foreground text-xs leading-[inherit]">
                        (Thanh toán qua ví điện tử Momo)
                      </span>
                    </Label>
                    <p className="text-muted-foreground text-xs" id={`description`}>
                      Thanh toán nhanh chóng và tiện lợi qua ví điện tử Momo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-[var(--main-color)]">
                <Checkbox
                  className="order-1 after:absolute after:inset-0"
                  checked={paymentMethod === "zalopay"}
                  onCheckedChange={() => setPaymentMethod("zalopay")}
                />
                <div className="flex grow items-start gap-3">
                  <div className="w-[50px] h-[50px] overflow-hidden mr-2">
                    <img
                      src="/zalopay.png"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>
                      Zalopay{" "}
                      <span className="font-normal text-muted-foreground text-xs leading-[inherit]">
                        (Thanh toán qua ví điện tử Zalopay)
                      </span>
                    </Label>
                    <p className="text-muted-foreground text-xs" id={`description`}>
                      Thanh toán nhanh chóng và tiện lợi qua ví điện tử Zalopay.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-[var(--main-color)]">
                <Checkbox
                  className="order-1 after:absolute after:inset-0"
                  checked={paymentMethod === "online-banking"}
                  onCheckedChange={() => setPaymentMethod("online-banking")}
                />
                <div className="flex grow items-start gap-3">
                  <div className="w-[50px] h-[50px] overflow-hidden mr-2">
                    <img
                      src="/online-banking.jpg"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>
                      Chuyển khoản ngân hàng{" "}
                      <span className="font-normal text-muted-foreground text-xs leading-[inherit]">
                        (Thanh toán qua chuyển khoản ngân hàng)
                      </span>
                    </Label>
                    <p className="text-muted-foreground text-xs" id={`description`}>
                      Thanh toán nhanh chóng và tiện lợi qua chuyển khoản ngân hàng.
                    </p>
                  </div>
                </div>
              </div>
              {paymentMethod === "online-banking" && (
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="font-bold text-[20px] text-[var(--main-color)] mb-2">Thông tin tài khoản</div>
                  <div className="text-sm"><span className="font-bold">Ngân hàng:</span> Vietcombank</div>
                  <div className="text-sm"><span className="font-bold">Chủ tài khoản:</span> Nguyễn Văn B</div>
                  <div className="text-sm"><span className="font-bold">Số tài khoản:</span> 0123456789</div>
                  <div className="text-sm mt-2">Vui lòng ghi rõ nội dung chuyển khoản: Họ tên - Số điện thoại - Mã đơn hàng</div>
                </div>
              )}
            </div>
            <Button className={"w-full mt-[30px] bg-[var(--main-color)] hover:bg-[var(--main-hover)]"}>Đặt hàng</Button>
          </form>
        </div>
      </div>
    </>
  )
}