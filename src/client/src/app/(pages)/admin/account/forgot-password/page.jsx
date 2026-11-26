"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminForgotPassword } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";
import JustValidate from "just-validate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

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

        setPending(true);
        const promise = adminForgotPassword(finalData);
        // encode để email có ký tự đặc biệt (vd: dấu +) không bị sai trên URL
        toastHandler(promise, router, `/admin/account/otp-password?email=${encodeURIComponent(event.target.email.value)}`)
        promise.catch(() => setPending(false));
      })
  }, [])

  return (
    <>
      <h1 className="font-bold text-[36px] text-[#2B3674]">Quên mật khẩu</h1>
      <div className="text-gray-500 mb-10">Nhập email đã đăng ký, chúng tôi sẽ gửi mã OTP để đặt lại mật khẩu</div>
      <form id="adminForgotPasswordForm">
        <div className="mb-6 *:not-first:mt-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#2B3674] ">Email<span className="text-red-500" aria-hidden="true">*</span></Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            autoFocus
          />
        </div>
        <Button disabled={pending} className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">
          {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
          {pending ? "Đang gửi..." : "Gửi OTP"}
        </Button>
      </form>
      <div className="mt-[26px] text-[#2B3674] text-center">Nhớ ra mật khẩu? <Link className="font-bold hover:underline" href="/admin/account/login">Đăng nhập</Link></div>
    </>
  );
}