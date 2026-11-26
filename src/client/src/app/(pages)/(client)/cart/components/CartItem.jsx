import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { removeItemFromCart } from "@/helper/cartHelper"
import { CircleAlertIcon, Minus, Plus, X } from "lucide-react"
import Link from "next/link"

export const CartItem = ({ pet, onRemoveSuccess = (id) => { }, selectedItem = [], setSelectedItem = () => { } }) => {
  const isSelected = selectedItem.some(item => item.id === pet.id);
  const currentItem = selectedItem.find(item => item.id === pet.id);
  const quantity = currentItem?.quantity ?? 1;

  const increaseQuantity = () => {
    if (!isSelected) return;

    setSelectedItem(prev =>
      prev.map(item =>
        item.id === pet.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = () => {
    if (!isSelected) return;

    setSelectedItem(prev =>
      prev.map(item =>
        item.id === pet.id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const stepButtonClass = "flex size-8 items-center justify-center rounded-full border border-[var(--main-color)]/40 text-[var(--main-color)] transition-colors hover:bg-[#FCEED5] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

  return (
    <>
      <div className="flex gap-[30px] max-md:gap-3 border-b border-b-gray-200 pb-5">
        <div className="flex flex-col items-center justify-between">
          <AlertDialog>
            <AlertDialogTrigger
              asChild
            >
              <Button
                aria-label={`Xóa ${pet.name} khỏi giỏ hàng`}
                title="Xóa khỏi giỏ hàng"
                className={"bg-transparent hover:bg-red-50 hover:text-red-600 shadow-none text-[var(--main-color)]"}
              >
                <X aria-hidden="true" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-red-200 text-red-600"
                  aria-hidden="true"
                >
                  <CircleAlertIcon className="opacity-80" size={16} />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận xóa khỏi giỏ hàng?</AlertDialogTitle>
                  <AlertDialogDescription>{pet.name} sẽ được xóa khỏi giỏ hàng của bạn</AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-white hover:bg-destructive/90"
                  onClick={() => {
                    removeItemFromCart(pet.id)
                    onRemoveSuccess(pet.id)
                  }}
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Checkbox
            checked={isSelected}
            aria-label={`Chọn ${pet.name} để đặt hàng`}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedItem(prev => [
                  ...prev,
                  { id: pet.id, quantity: 1 }
                ]);
              } else {
                setSelectedItem(prev =>
                  prev.filter(item => item.id !== pet.id)
                );
              }
            }}
            className="size-5 data-[state=checked]:bg-[var(--main-color)] data-[state=checked]:border-[var(--main-color)]"
          />
          <div></div>
        </div>
        <Link
          href={`/detail/${pet.id}`}
          className="w-[180px] h-[150px] max-md:w-[96px] max-md:h-[96px] shrink-0 overflow-hidden rounded-xl bg-muted outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={pet.imageList?.[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="flex max-lg:flex-col justify-between gap-4 flex-1 min-w-0">
          <div className="min-w-0">
            <Link
              href={`/detail/${pet.id}`}
              className="font-bold text-[var(--main-color)] hover:underline underline-offset-4 rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 break-words"
            >
              {pet.name}
            </Link>
            <div className="mt-3">
              <div className="text-sm text-gray-500">Giống: <span className="font-bold">{pet.gender == "male" ? "Đực" : "Cái"}</span></div>
              <div className="text-sm text-gray-500">Tuổi: <span className="font-bold">{pet.age}</span></div>
              <div className="text-sm text-gray-500">Màu sắc: <span className="font-bold">{pet.color}</span></div>
            </div>
          </div>
          <div className="flex flex-col items-end max-lg:items-start">
            <div className="font-bold mb-[30px] max-lg:mb-2" id={`quantity-label-${pet.id}`}>Số lượng:</div>
            <div className="flex items-center gap-5 max-sm:gap-3 flex-wrap">
              <div
                className="flex items-center gap-2"
                role="group"
                aria-labelledby={`quantity-label-${pet.id}`}
                title={!isSelected ? "Chọn sản phẩm để thay đổi số lượng" : undefined}
              >
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={!isSelected || quantity === 1}
                  aria-label="Giảm số lượng"
                  className={stepButtonClass}
                >
                  <Minus className="size-4" aria-hidden="true" />
                </button>
                <span className="min-w-6 text-center font-semibold tabular-nums" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={!isSelected}
                  aria-label="Tăng số lượng"
                  className={stepButtonClass}
                >
                  <Plus className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="tabular-nums">
                x{" "}
                <span className="text-[var(--main-color)] font-semibold">
                  {pet.price.toLocaleString("vi-VN")} VND
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
