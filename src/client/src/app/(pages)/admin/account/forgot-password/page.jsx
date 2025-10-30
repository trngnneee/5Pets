import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AdminRegisterPage() {
  return (
    <>
      <div className="font-bold text-[36px] text-[#2B3674]">Quên mật khẩu</div>
      <div className="text-gray-400 mb-10">Nhập email để tiếp tục</div>
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
        <Button className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">Gửi OTP</Button>
      </form>
      <div className="mt-[26px] text-[#2B3674] text-center">Đã có tài khoản? <Link className="font-bold hover:underline" href="/admin/account/login">Đăng nhập</Link></div>
    </>
  );
}