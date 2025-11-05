"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLogin } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";
import JustValidate from "just-validate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate("#adminLoginForm");
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
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập mật khẩu!',
        },
        {
          validator: (value) => value.length >= 8,
          errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
        },
        {
          validator: (value) => /[A-Z]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
        },
        {
          validator: (value) => /[a-z]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
        },
        {
          validator: (value) => /\d/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
        },
        {
          validator: (value) => /[@$!%*?&]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
        },
      ])
      .onSuccess((event) => {
        event.preventDefault();

        const finalData = {
          email: event.target.email.value,
          password: event.target.password.value,
          rememberPassword: event.target.rememberLogin.checked
        }

        const promise = adminLogin(finalData);
        toastHandler(promise, router, "/admin/category");
      })
  }, [])

  return (
    <>
      <div className="font-bold text-[36px] text-[#2B3674]">Đăng nhập</div>
      <div className="text-gray-400 mb-10">Nhập email và mật khẩu để đăng nhập</div>
      <form id="adminLoginForm">
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
            <input
              type="checkbox"
              id="rememberLogin"
              name="rememberLogin"
              className="w-4 h-4 accent-[#2B3674]"
            />
            <Label htmlFor="rememberLogin" name="rememberLogin" className="text-sm text-[#2B3674]">Ghi nhớ đăng nhập</Label>
          </div>
          <Link href="/admin/account/forgot-password" className="text-sm text-[#2B3674] font-medium hover:underline">Quên mật khẩu?</Link>
        </div>
        <Button className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">Đăng nhập</Button>
      </form>
      <div className="mt-[26px] text-[#2B3674] text-center">Chưa có tài khoản? <Link className="font-bold hover:underline" href="/admin/account/register">Đăng ký</Link></div>
    </>
  );
}