"use client"

import { Input } from "@/components/ui/input";
import { CartItem } from "./components/CartItem";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { clientPetDetailList } from "@/lib/clientAPI/pet";
import JustValidate from "just-validate";
import { clientOrderCreate } from "@/lib/clientAPI/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CartPage() {
  const router = useRouter();
  const [petDetailList, setPetDetailList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItem, setSelectedItem] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const idList = JSON.parse(localStorage.getItem("cart")) || [];
      if (idList.length === 0) {
        return;
      }
      const promise = await clientPetDetailList(idList);
      if (promise.code === "success") {
        setPetDetailList(promise.data.map((item) => {
          return {
            ...item,
            quantity: 1
          }
        }));
        setTotalPrice(promise.data.map((item) => item.price).reduce((a, b) => a + b, 0));
        setSelectedItem(
          idList.map(id => ({
            id,
            quantity: 1
          }))
        );
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const total = selectedItem.reduce((sum, selected) => {
      const pet = petDetailList.find(p => p.id === selected.id);
      if (!pet) return sum;
      return sum + pet.price * selected.quantity;
    }, 0);

    setTotalPrice(total);
  }, [selectedItem, petDetailList]);

  const handleRemoveSuccess = (id) => {
    setPetDetailList(prev => prev.filter(pet => pet.id !== id));
    setSelectedItem(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    const validation = new JustValidate('#cartForm')

    validation
      .addField('#fullname', [
        {
          rule: 'required',
          errorMessage: 'Họ và tên không được để trống',
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Họ và tên phải có ít nhất 3 ký tự',
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Họ và tên không được vượt quá 50 ký tự',
        }
      ])
      .addField('#phone', [
        {
          rule: 'required',
          errorMessage: 'Số điện thoại không được để trống',
        },
        {
          rule: 'customRegexp',
          value: /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/,
          errorMessage: 'Số điện thoại không hợp lệ',
        }
      ])
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Email không được để trống',
        },
        {
          rule: 'email',
          errorMessage: 'Email không hợp lệ',
        }
      ])
      .addField('#address', [
        {
          rule: 'required',
          errorMessage: 'Địa chỉ không được để trống',
        },
        {
          rule: 'minLength',
          value: 10,
          errorMessage: 'Địa chỉ phải có ít nhất 10 ký tự',
        },
        {
          rule: 'maxLength',
          value: 100,
          errorMessage: 'Địa chỉ không được vượt quá 100 ký tự',
        }
      ])
      .onSuccess(() => {
        setSubmit(true);
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submit) {
      if (selectedItem.length === 0) {
        toast.error("Vui lòng chọn ít nhất một sản phẩm để đặt hàng");
        setSubmit(false);
        return;
      }

      const fullname = e.target.fullname.value;
      const phone = e.target.phone.value;
      const email = e.target.email.value;
      const address = e.target.address.value;
      const note = e.target.note.value;
      const finalData = {
        fullname: fullname,
        phone: phone,
        email: email,
        address: address,
        note: note,
        payment_method: paymentMethod,
        idList: selectedItem
      };
      console.log(finalData);
      const promise = clientOrderCreate(finalData);
      toast.promise(
        promise,
        {
          loading: "Đang xử lý đơn hàng...",
          success: (data) => {
            const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
            const selectedIds = selectedItem.map(item => item.id);

            const newCart = currentCart.filter(
              id => !selectedIds.includes(id)
            );
            localStorage.setItem("cart", JSON.stringify(newCart));

            setSelectedItem(
              newCart.map(id => ({
                id,
                quantity: 1
              }))
            );
            if (data.code == "success" && data.zalopay) {
              window.location.href = data.zalopay.order_url;
              return "Chuyển đến trang thanh toán Zalopay...";
            }
            if (data.code == "success" && data.momo) {
              window.location.href = data.momo.payUrl;
              return "Chuyển đến trang thanh toán Momo...";
            }
            else {
              router.push(`/order/success/${data.order_id}`)
            }
            return data.message
          },
          error: (data) => {
            return data.message;
          }
        }
      )
    }
    setSubmit(false);
  }

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
                onRemoveSuccess={handleRemoveSuccess}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
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
          <form id="cartForm" onSubmit={handleSubmit}>
            <div className="font-bold text-[20px] text-[var(--main-color)] mb-[30px]">Thông tin khách hàng</div>
            <div className="flex items-center gap-[30px]">
              <div className="w-full *:not-first:mt-2 mb-5">
                <Label htmlFor="fullname" className="mb-2 text-[var(--main-color)]">Họ và tên</Label>
                <Input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Le Van A"
                />
              </div>
              <div className="w-full *:not-first:mt-2 mb-5">
                <Label htmlFor="phone" className="mb-2 text-[var(--main-color)]">Số điện thoại</Label>
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="0123456789"
                />
              </div>
            </div>
            <div className="flex items-center gap-[30px]">
              <div className="w-full *:not-first:mt-2 mb-5">
                <Label htmlFor="email" className="mb-2 text-[var(--main-color)]">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                />
              </div>
              <div className="w-full *:not-first:mt-2 mb-5">
                <Label htmlFor="address" className="mb-2 text-[var(--main-color)]">Địa chỉ</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="123 Đường ABC, Quận 1, TP.HCM"
                />
              </div>
            </div>
            <div className="w-full *:not-first:mt-2">
              <Label htmlFor="note" className="mb-2 text-[var(--main-color)]">Ghi chú đơn hàng</Label>
              <Textarea
                placeholder="Ghi chú đơn hàng (nếu có)"
                id="note"
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
            <Button disabled={submit} className={"w-full mt-[30px] bg-[var(--main-color)] hover:bg-[var(--main-hover)]"}>Đặt hàng</Button>
          </form>
        </div>
      </div>
    </>
  )
}