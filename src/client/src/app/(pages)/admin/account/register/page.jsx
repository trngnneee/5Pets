import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AdminRegisterPage() {
  return (
    <>
      <div className="font-bold text-[36px] text-[#2B3674]">Đăng ký</div>
      <div className="text-gray-400 mb-10">Nhập họ tên, email và mật khẩu để đăng ký</div>
      <form>
        <div className="mb-6 *:not-first:mt-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-[#2B3674] ">Họ tên*</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Le Van A"
          />
        </div>
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
        <div className="flex items-center gap-[11px] mb-[33px]">
          <Checkbox htmlFor="rememberLogin" className="data-[state=checked]:bg-[#2B3674]" />
          <Label id="rememberLogin" name="rememberLogin" className="text-sm text-[#2B3674]">Đồng ý với chính sách điều khoản</Label>
        </div>
        <Button className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">Đăng ký</Button>
      </form>
      <div className="mt-[26px] text-[#2B3674] text-center">Đã có tài khoản? <Link className="font-bold hover:underline" href="/admin/account/login">Đăng nhập</Link></div>
    </>
  );
}