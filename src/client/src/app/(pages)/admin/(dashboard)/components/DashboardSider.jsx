"use client"

import { AdminDashboardVariable } from "@/config/variable";
import { adminLogout } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";
import { cn } from "@/lib/utils";
import { Dog, Grid2X2, Power, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const DashboardSider = () => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

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
    setLoggingOut(true);
    const promise = adminLogout();
    toastHandler(promise, router, "/admin/account/login");
    promise.catch(() => setLoggingOut(false));
  }

  return (
    <>
      <aside className="w-1/6 bg-white h-screen sticky top-0 left-0 border-r border-[#E0E0E0]">
        <nav aria-label="Điều hướng quản trị" className="mt-[11px] flex flex-col gap-2.5">
          {navList.map((item, index) => {
            const lastParam = item.link.split('/').filter(Boolean).pop();
            const title = AdminDashboardVariable.find((item) => item.value === lastParam)?.label;
            // Giữ trạng thái active cả ở trang con (tạo mới / chỉnh sửa)
            const isActive = pathName === item.link || pathName.startsWith(`${item.link}/`);

            return (
              <Link
                href={item.link}
                className="group relative rounded-[6px] outline-none"
                key={index}
                aria-current={isActive ? "page" : undefined}
              >
                <div className={cn(
                  "bg-[var(--main-color)] w-[5px] absolute left-0 top-0 bottom-0 rounded-r",
                  isActive ? "block" : "hidden"
                )}></div>
                <div className={cn(
                  "flex items-center py-4 pl-3 rounded-[6px] gap-4 ml-5 mr-3 transition-colors group-focus-visible:ring-[3px] group-focus-visible:ring-ring/50",
                  isActive
                    ? "bg-[var(--main-color)] text-white"
                    : "bg-white text-gray-600 hover:bg-[#F5F6FA] hover:text-[var(--main-color)]"
                )}>
                  <item.Icon aria-hidden="true" />
                  <div className="text-sm font-medium -translate-y-0.5">{title}</div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Đăng xuất tách riêng khỏi điều hướng chính */}
        <div className="mt-4 ml-5 mr-3 border-t border-[#E0E0E0] pt-4">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full rounded-[6px] outline-none focus-visible:ring-[3px] focus-visible:ring-red-300 disabled:opacity-60"
          >
            <div className="flex items-center bg-red-100 hover:bg-red-200 transition-colors py-4 pl-3 rounded-[6px] gap-4 text-red-700">
              <Power aria-hidden="true" />
              <div className="text-sm font-medium -translate-y-0.5">{loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}</div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
