import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useAdmin } from "@/context/AdminContext";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const DashboardHeader = () => {
  const { userInfo } = useAdmin();

  return (
    <>
      <div className="bg-white h-20 flex items-center border-b border-b-[#E0E0E0]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-[200px] h-auto overflow-hidden">
            <Link href="/admin/category" aria-label="5Pets - Trang quản trị" className="block rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
              <img
                src="/logo.png"
                alt="5Pets"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-[var(--main-color)]"
            >
              <ExternalLink size={16} aria-hidden="true" />
              <span>Xem trang web</span>
              <span className="sr-only">(mở tab mới)</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <Avatar
                className="w-11 h-11"
              >
                <AvatarImage src="/dog1.jpg" alt={userInfo?.fullname || "Admin"} />
                <AvatarFallback>Admin</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold text-sm text-[var(--main-color)]">{userInfo?.fullname}</div>
                <div className="text-[#565656] font-semibold text-[12px]">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
