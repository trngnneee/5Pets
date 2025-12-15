"use client"

import { AdminDashboardVariable } from "@/config/variable";
import { adminLogout } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";
import { cn } from "@/lib/utils";
import { Dog, Grid2X2, Power, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const DashboardSider = () => {
  const router = useRouter();

  const navList = [
    {
      Icon: Grid2X2,
      link: "/admin/category"
    },
    {
      Icon: Dog,
      link: "/admin/pet"
    },
    {
      Icon: ShoppingCart,
      link: "/admin/order"
    },
    {
      Icon: User,
      link: "/admin/user"
    },
  ]

  const pathName = usePathname();
  const handleLogout = () => {
    const promise = adminLogout();
    toastHandler(promise, router, "/admin/account/login");
  }

  return (
    <>
      <div className="w-1/6 bg-white h-screen sticky top-0 left-0 border-r border-[#E0E0E0]">
        <div className="text-white mt-[11px] flex flex-col gap-2.5">
          {navList.map((item, index) => {
            const lastParam = item.link.split('/').filter(Boolean).pop();
            const title = AdminDashboardVariable.find((item) => item.value === lastParam)?.label;

            return (
              <Link href={item.link} className="relative" key={index}>
                <div className={cn(
                  "bg-[var(--main-color)] w-[5px] absolute left-0 top-0 bottom-0 rounded-r",
                  pathName === item.link ? "block" : "hidden"
                )}></div>
                <div className={cn(
                  "flex items-center bg-[var(--main-color)] hover:bg-[var(--main-hover)] py-4 pl-3 rounded-[6px] gap-4 ml-5 mr-3",
                  pathName === item.link ? "bg-[var(--main-color)]" : "bg-white text-gray-400 hover:bg-[#F5F6FA]"
                )}>
                  <item.Icon />
                  <div className="text-sm font-medium -translate-y-0.5">{title}</div>
                </div>
              </Link>
            )
          })}

          <button onClick={handleLogout} className="relative cursor-pointer">
            <div className={cn(
              "bg-red-100 w-[5px] absolute left-0 top-0 bottom-0 rounded-r"
            )}></div>
            <div className={cn(
              "flex items-center bg-red-100 hover:bg-red-200 py-4 pl-3 rounded-[6px] gap-4 ml-5 mr-3 text-red-500",
            )}>
              <Power />
              <div className="text-sm font-medium -translate-y-0.5">Đăng xuất</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}