import Link from "next/link";

export default function AdminAccountInitialPage() {
  return (
    <>
      <div className="font-bold text-[32px] text-[#2B3674]">Tài khoản đang đợi duyệt</div>
      <div className="text-gray-400 mb-10">Vui lòng chờ cho Admin duyệt tài khoản của bạn</div>
      <div className="mt-[26px] text-[#2B3674] text-center">Đã có tài khoản? <Link className="font-bold hover:underline" href="/admin/account/login">Đăng nhập</Link></div>
    </>
  )
}