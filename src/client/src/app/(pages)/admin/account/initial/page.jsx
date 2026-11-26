import { Hourglass } from "lucide-react";
import Link from "next/link";

export default function AdminAccountInitialPage() {
  return (
    <>
      <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-[#FCEED5] text-[#2B3674]">
        <Hourglass className="size-7" aria-hidden="true" />
      </div>
      <h1 className="font-bold text-[32px] text-[#2B3674]">Tài khoản đang đợi duyệt</h1>
      <div className="text-gray-500 mb-10">
        Đăng ký thành công! Vui lòng chờ Admin duyệt tài khoản của bạn. Sau khi được duyệt, bạn có thể đăng nhập bằng email và mật khẩu vừa tạo.
      </div>
      <div className="mt-[26px] text-[#2B3674] text-center">Đã được duyệt? <Link className="font-bold hover:underline" href="/admin/account/login">Đăng nhập</Link></div>
    </>
  )
}
