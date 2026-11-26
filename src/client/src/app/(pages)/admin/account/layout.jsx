import Link from "next/link";
import { BackgroundSider } from "./components/backgroundSider";
import { ChevronLeft } from "lucide-react";

export default function AdminAccountLayout({ children }){
  return (
    <>
      <div className="flex min-h-dvh">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center relative px-4 py-20">
          <Link href="/" className="flex items-center justify-center gap-[5px] text-[#707EAE] hover:text-[#2B3674] transition-colors absolute top-[20px] left-1/2 -translate-x-1/2 whitespace-nowrap">
            <ChevronLeft aria-hidden="true"/>
            <div>Quay lại trang chủ</div>
          </Link>
          <main className="w-full max-w-[410px]">
            {children}
          </main>
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-sm text-[#707EAE] whitespace-nowrap">© 2025 5Pets. All rights reserved.</div>
        </div>
        <BackgroundSider/>
      </div>
    </>
  )
}
