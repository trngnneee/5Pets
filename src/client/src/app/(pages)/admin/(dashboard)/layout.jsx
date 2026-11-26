"use client"

import { usePathname } from "next/navigation";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSider } from "./components/DashboardSider";
import { AdminDashboardVariable } from "@/config/variable";
import { DashboardTitle } from "./components/DashboardTitle";
import { AdminProvider } from "@/context/AdminContext";

export default function AdminDashboardLayout({ children }){
  const pathName = usePathname();
  const lastParam = pathName.split('/').filter(Boolean).pop();

  return (
    <>
      <AdminProvider>
        <div>
          <DashboardHeader />
          <div className="flex relative">
            <DashboardSider />
            {/* min-w-0 để bảng rộng cuộn ngang thay vì đẩy vỡ layout */}
            <main className="mx-6 mt-6 mb-10 flex-1 min-w-0">
              <DashboardTitle
                title={AdminDashboardVariable.find((item) => item.value === lastParam)?.label}
              />
              <div className="w-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </AdminProvider>
    </>
  )
}
