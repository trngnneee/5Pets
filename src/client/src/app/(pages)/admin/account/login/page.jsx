import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <>
      <div className="font-bold text-[36px] text-[#2B3674]">Đăng nhập</div>
      <div className="text-gray-400 mb-10">Nhập email và mật khẩu để đăng nhập</div>
      <form>
        <div className="mb-6 *:not-first:mt-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#2B3674] ">Email*</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mb-[31px] *:not-first:mt-2">
          <Label htmlFor="password" className="text-sm font-medium text-[#2B3674]">Mật khẩu*</Label>
          <Input
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div className="flex justify-between items-center mb-[33px]">
          <div className="flex items-center gap-[11px]">
            <Checkbox htmlFor="rememberLogin" className="data-[state=checked]:bg-[#2B3674]" />
            <Label id="rememberLogin" name="rememberLogin" className="text-sm text-[#2B3674]">Ghi nhớ đăng nhập</Label>
          </div>
          <Link href="/admin/account/forgot-password" className="text-sm text-[#2B3674] font-medium hover:underline">Quên mật khẩu?</Link>
        </div>
        <Button className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">Đăng nhập</Button>
      </form>
      <div className="mt-[26px] text-[#2B3674] text-center">Chưa có tài khoản? <Link className="font-bold hover:underline" href="/admin/account/register">Đăng ký</Link></div>
    </>
  );
}