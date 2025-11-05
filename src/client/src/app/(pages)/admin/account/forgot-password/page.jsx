"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminForgotPassword } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";
import JustValidate from "just-validate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate("#adminForgotPasswordForm");
    validation
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Email bắt buộc!'
        },
        {
          rule: 'email',
          errorMessage: 'Email sai định dạng!',
        },
      ])
      .onSuccess((event) => {
        event.preventDefault();

        const finalData = {
          email: event.target.email.value
        }

        const promise = adminForgotPassword(finalData);
        toastHandler(promise, router, `/admin/account/otp-password?email=${event.target.email.value}`)
      })
  }, [])

  return (
    <>
      <div className="font-bold text-[36px] text-[#2B3674]">Quên mật khẩu</div>
      <div className="text-gray-400 mb-10">Nhập email để tiếp tục</div>
      <form id="adminForgotPasswordForm">
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