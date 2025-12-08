"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleAlertIcon, Dot, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        className="relative p-2 shadow-xl rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link
          href={`/detail/${item.id}`}
        >
          <div className="overflow-hidden mb-4 w-full h-[250px]">
            <img
              src={item.imageList[0]}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="px-2">
            <div className="font-bold mb-1">{item.name}</div>
            <div className="text-[12px] text-[#667479] font-mediun flex items-center mb-1">
              <div>Giống: <span className="font-bold">{item.gender == "male" ? "Đực" : "Cái"}</span></div>
              <div><Dot /></div>
              <div>Tuổi: <span className="font-bold">{item.age}</span></div>
            </div>
            <div className="text-sm font-bold mb-5">{item.price.toLocaleString("vi-VN")} VND</div>
          </div>
        </Link>
        {hover && (
          <div
            className={cn(
              "absolute bottom-5 right-5 z-10",
              "transition-all"
            )}
          >
            <AlertDialog>
              <AlertDialogTrigger
                asChild
              >
                <Button className="bg-[var(--main-color)] hover:bg-[var(--main-hover)]">
                  <ShoppingCart />
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
                    <AlertDialogDescription>Sản phẩm của bạn sẽ được thêm vào giỏ hàng</AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={() => addItemToCart(item.id)}>Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </>
  );
}