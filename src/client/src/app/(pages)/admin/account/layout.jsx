import Link from "next/link";
import { BackgroundSider } from "./components/backgroundSider";
import { ChevronLeft } from "lucide-react";

export default function AdminAccountLayout({ children }){
  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/2 flex flex-col justify-center items-center relative">
          <Link href="/" className="flex items-center justify-center gap-[5px] text-[#A3AED0] absolute top-[20px] left-1/2 -translate-x-1/2">
            <ChevronLeft/>
            <div>Quay lại trang chủ</div>
          </Link>
          <div className="w-[410px]">
            {children}
          </div>
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-sm text-[#A3AED0]">© 2025 5Pets. All rights reserved.</div>
        </div>
        <BackgroundSider/>
      </div>
    </>
  )
}