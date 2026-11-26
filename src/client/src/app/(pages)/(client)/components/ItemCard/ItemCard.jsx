"use client"

import { Button } from "@/components/ui/button";
import { CircleAlertIcon, Dot, ShoppingCart } from "lucide-react";
import Link from "next/link";
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
import { addItemToCart } from "@/helper/cartHelper";

export const ItemCard = ({ item }) => {
  return (
    <>
      <div className="group relative p-2 shadow-xl rounded-2xl bg-white hover:scale-[1.02] focus-within:scale-[1.02] transition-transform duration-300">
        <Link
          href={`/detail/${item.id}`}
          className="block rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <div className="overflow-hidden mb-4 w-full h-[250px] rounded-2xl bg-muted">
            <img
              src={item.imageList?.[0]}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="px-2">
            <div className="font-bold mb-1 line-clamp-1" title={item.name}>{item.name}</div>
            <div className="text-[12px] text-[#667479] font-medium flex items-center mb-1">
              <div>Giống: <span className="font-bold">{item.gender == "male" ? "Đực" : "Cái"}</span></div>
              <div aria-hidden="true"><Dot /></div>
              <div>Tuổi: <span className="font-bold">{item.age}</span></div>
            </div>
            <div className="text-sm font-bold mb-5 tabular-nums">{item.price.toLocaleString("vi-VN")} VND</div>
          </div>
        </Link>
        {/* Luôn hiển thị trên thiết bị cảm ứng; trên desktop hiện khi hover hoặc focus bằng bàn phím */}
        <div className="absolute bottom-5 right-5 z-10 transition-opacity duration-200 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
          <AlertDialog>
            <AlertDialogTrigger
              asChild
            >
              <Button
                aria-label={`Thêm ${item.name} vào giỏ hàng`}
                title="Thêm vào giỏ hàng"
                className="bg-[var(--main-color)] hover:bg-[var(--main-hover)]"
              >
                <ShoppingCart aria-hidden="true" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <CircleAlertIcon className="opacity-80" size={16} />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận thêm vào giỏ hàng?</AlertDialogTitle>
                  <AlertDialogDescription>{item.name} sẽ được thêm vào giỏ hàng của bạn</AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={() => addItemToCart(item.id)}>Xác nhận</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
