"use client"

import { Input } from "@/components/ui/input";
import { CartItem } from "./components/CartItem";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { clientPetDetailList } from "@/lib/clientAPI/pet";
import JustValidate from "just-validate";
import { clientOrderCreate } from "@/lib/clientAPI/order";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { getCart, setCart } from "@/helper/cartHelper";
import { EmptyState } from "@/components/EmptyState";
import { featuredCategoryId } from "@/config/variable";
import { cn } from "@/lib/utils";
import { Loader2, ShoppingCart } from "lucide-react";

const paymentMethodList = [
  {
    value: "momo",
    name: "Momo",
    image: "/momo.png",
    note: "(Thanh toán qua ví điện tử Momo)",
    description: "Thanh toán nhanh chóng và tiện lợi qua ví điện tử Momo.",
  },
  {
    value: "zalopay",
    name: "Zalopay",
    image: "/zalopay.png",
    note: "(Thanh toán qua ví điện tử Zalopay)",
    description: "Thanh toán nhanh chóng và tiện lợi qua ví điện tử Zalopay.",
  },
  {
    value: "online-banking",
    name: "Chuyển khoản ngân hàng",
    image: "/online-banking.jpg",
    note: "(Thanh toán qua chuyển khoản ngân hàng)",
    description: "Thanh toán nhanh chóng và tiện lợi qua chuyển khoản ngân hàng.",
  },
];

const RequiredMark = () => <span className="text-destructive" aria-hidden="true">*</span>;

export default function CartPage() {
  const router = useRouter();
  const [petDetailList, setPetDetailList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItem, setSelectedItem] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const idList = getCart();
      if (idList.length === 0) {
        setCartLoaded(true);
        return;
      }
      try {
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
      } catch {
        toast.error("Không tải được giỏ hàng, bạn thử tải lại trang nhé");
      } finally {
        setCartLoaded(true);
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
          errorMessage: 'Số điện thoại không hợp lệ (gồm 10 số, ví dụ: 0912345678)',
        }
      ])
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Email không được để trống',
        },
        {
          rule: 'email',
          errorMessage: 'Email không hợp lệ, ví dụ: ban@gmail.com',
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
          errorMessage: 'Địa chỉ phải có ít nhất 10 ký tự (số nhà, đường, quận/huyện, tỉnh)',
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

  // Lưu ý: just-validate gọi onSuccess -> setSubmit(true) ngay trong lúc sự kiện submit
  // đang chạy, React onSubmit nhận handleSubmit mới với submit = true. Đừng đổi sang async.
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
      setPlacing(true);
      const promise = clientOrderCreate(finalData);
      toast.promise(
        promise,
        {
          loading: "Đang xử lý đơn hàng...",
          success: (data) => {
            const currentCart = getCart();
            const selectedIds = selectedItem.map(item => item.id);

            const newCart = currentCart.filter(
              id => !selectedIds.includes(id)
            );
            setCart(newCart);

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
            setPlacing(false);
            return data.message;
          }
        }
      )
    }
    setSubmit(false);
  }

  const isEmpty = cartLoaded && petDetailList.length === 0;
  const selectedCount = selectedItem.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="container mx-auto my-5">
        <div className="shadow-xl p-[30px] max-md:p-5 rounded-2xl border border-gray-100">
          <h1 className="font-bold text-[20px] text-[var(--main-color)] mb-[30px] max-md:mb-5">Giỏ hàng</h1>
          <div className="flex flex-col gap-[30px] max-md:gap-5">
            {!cartLoaded && [...Array(2)].map((_, index) => (
              <div key={index} className="flex gap-[30px] max-md:gap-4 border-b border-b-gray-200 pb-5" aria-hidden="true">
                <Skeleton className="w-[180px] h-[150px] max-md:w-[100px] max-md:h-[90px] rounded-xl" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
            {petDetailList.length > 0 && petDetailList.map((pet, index) => (
              <CartItem
                key={pet.id || index}
                pet={pet}
                onRemoveSuccess={handleRemoveSuccess}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            ))}
            {isEmpty && (
              <EmptyState
                icon={ShoppingCart}
                title="Giỏ hàng của bạn đang trống"
                description="Hãy chọn cho mình một người bạn bốn chân thật đáng yêu nhé!"
                action={
                  <Button asChild className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-[57px] px-7">
                    <Link href={`/category/${featuredCategoryId}`}>Khám phá thú cưng</Link>
                  </Button>
                }
              />
            )}
          </div>
          {!isEmpty && (
            <div className="mt-5 flex flex-col gap-[15px]">
              <div className="flex justify-between">
                <div className="text-sm font-semibold">Tạm tính ({selectedCount} sản phẩm):</div>
                <div className="tabular-nums">{totalPrice.toLocaleString("vi-VN")} VND</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-semibold">Giảm giá:</div>
                <div className="tabular-nums">- 0 VND</div>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-[15px]">
                <div className="text-sm font-semibold">Tổng thanh toán:</div>
                <div className="text-[22px] font-bold text-[var(--main-color)] tabular-nums">{totalPrice.toLocaleString("vi-VN")} VND</div>
              </div>
              {cartLoaded && selectedItem.length === 0 && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2" role="status">
                  Bạn chưa chọn sản phẩm nào. Tick vào ô bên cạnh sản phẩm để đặt hàng.
                </p>
              )}
            </div>
          )}
        </div>
        {/* Form luôn nằm trong DOM để just-validate khởi tạo được; chỉ ẩn khi giỏ trống */}
        <div className={cn("shadow-xl p-[30px] max-md:p-5 rounded-2xl border border-gray-100 mt-5", isEmpty && "hidden")}>
          <form id="cartForm" onSubmit={handleSubmit} noValidate>
            <div className="font-bold text-[20px] text-[var(--main-color)] mb-[30px] max-md:mb-5">Thông tin khách hàng</div>
            <div className="flex max-md:flex-col items-start gap-[30px] max-md:gap-0">
              <div className="w-full *:not-first:mt-2 mb-5">
                <Label htmlFor="fullname" className="mb-2 text-[var(--main-color)]">Họ và tên <RequiredMark /></Label>
                <Input
                  type="text"
                  name="fullname"
                  id="fullname"
                  autoComplete="name"
                  placeholder="Le Van A"
                />
              </div>
              <div className="w-full *:not-first:mt-2 mb-5">
                <Label htmlFor="phone" className="mb-2 text-[var(--main-color)]">Số điện thoại <RequiredMark /></Label>
                <Input
                  type="tel"
                  inputMode="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  placeholder="0912345678"
                />
              </div>
            </div>
            <div className="flex max-md:flex-col items-start gap-[30px] max-md:gap-0">
              <div className="w-full *:not-first:mt-2 mb-5">
                <Label htmlFor="email" className="mb-2 text-[var(--main-color)]">Email <RequiredMark /></Label>
                <Input
                  type="email"
                  inputMode="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="example@example.com"
                />
              </div>
              <div className="w-full *:not-first:mt-2 mb-5">
                <Label htmlFor="address" className="mb-2 text-[var(--main-color)]">Địa chỉ <RequiredMark /></Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="street-address"
                  placeholder="123 Đường ABC, Quận 1, TP.HCM"
                />
              </div>
            </div>
            <div className="w-full *:not-first:mt-2">
              <Label htmlFor="note" className="mb-2 text-[var(--main-color)]">Ghi chú đơn hàng</Label>
              <Textarea
                placeholder="Ghi chú đơn hàng (nếu có)"
                id="note"
                name="note"
                className="w-full mb-5"
              />
            </div>
            <div className="font-bold text-[20px] text-[var(--main-color)] mb-[30px] max-md:mb-5" id="payment-method-title">Phương thức thanh toán</div>
            <div className="flex flex-col gap-[15px]" role="group" aria-labelledby="payment-method-title">
              {/* Giữ Checkbox (button value="on") vì bộ test Katalon chọn theo thứ tự */}
              {paymentMethodList.map((method) => (
                <div
                  key={method.value}
                  className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none transition-colors hover:border-[var(--main-color)]/50 has-data-[state=checked]:border-[var(--main-color)] has-data-[state=checked]:bg-[#2B3674]/[0.04] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
                >
                  <Checkbox
                    id={`payment-${method.value}`}
                    className="order-1 after:absolute after:inset-0"
                    checked={paymentMethod === method.value}
                    onCheckedChange={() => setPaymentMethod(method.value)}
                    aria-describedby={`payment-${method.value}-description`}
                  />
                  <div className="flex grow items-start gap-3">
                    <div className="w-[50px] h-[50px] shrink-0 overflow-hidden mr-2">
                      <img
                        src={method.image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`payment-${method.value}`}>
                        {method.name}{" "}
                        <span className="font-normal text-muted-foreground text-xs leading-[inherit]">
                          {method.note}
                        </span>
                      </Label>
                      <p className="text-muted-foreground text-xs" id={`payment-${method.value}-description`}>
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {paymentMethod === "online-banking" && (
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="font-bold text-[20px] text-[var(--main-color)] mb-2">Thông tin tài khoản</div>
                  <div className="text-sm"><span className="font-bold">Ngân hàng:</span> Vietcombank</div>
                  <div className="text-sm"><span className="font-bold">Chủ tài khoản:</span> Nguyễn Văn B</div>
                  <div className="text-sm"><span className="font-bold">Số tài khoản:</span> <span className="tabular-nums">0123456789</span></div>
                  <div className="text-sm mt-2">Vui lòng ghi rõ nội dung chuyển khoản: Họ tên - Số điện thoại - Mã đơn hàng</div>
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={submit || placing}
              aria-busy={placing}
              className={"w-full mt-[30px] bg-[var(--main-color)] hover:bg-[var(--main-hover)] max-md:h-11"}
            >
              {placing && <Loader2 className="animate-spin" aria-hidden="true" />}
              {placing ? "Đang đặt hàng..." : "Đặt hàng"}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
