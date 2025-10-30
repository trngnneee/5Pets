import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <>
      <div className="font-bold text-[36px] text-[#2B3674]">Đổi mật khẩu</div>
      <div className="text-gray-400 mb-10">Nhập mật khẩu và xác nhận mật khẩu để tiếp tục</div>
      <form>
        <div className="mb-[31px] *:not-first:mt-2">
          <Label htmlFor="password" className="text-sm font-medium text-[#2B3674]">Mật khẩu*</Label>
          <Input
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-[31px] *:not-first:mt-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium text-[#2B3674]">Xác nhận mật khẩu*</Label>
          <Input
            type="password"
            id="confirm-password"
            name="confirm-password"
          />
        </div>
        <Button className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">Đổi mật khẩu</Button>
      </form>
      <div className="mt-[26px] text-[#2B3674] text-center">Chưa có tài khoản? <Link className="font-bold hover:underline" href="/admin/account/register">Đăng ký</Link></div>
    </>
  );
}