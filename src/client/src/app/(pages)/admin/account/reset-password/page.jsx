"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminResetPassword } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";
import JustValidate from "just-validate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  
    useEffect(() => {
      const validation = new JustValidate('#adminResetPassword');
      validation
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
        .addField('#confirm-password', [
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
          {
            validator: (value, fields) => {
              const password = fields['#password'].elem.value;
              return value == password;
            },
            errorMessage: 'Mật khẩu xác nhận không khớp!',
          }
        ])
        .onSuccess((event) => {
          event.preventDefault();
  
          const finalData = {
            password: event.target.password.value
          };
  
          const promise = adminResetPassword(finalData);
          toastHandler(promise, router, "/admin/category");
        })
    }, [])
  
  return (
    <>
      <div className="font-bold text-[36px] text-[#2B3674]">Đổi mật khẩu</div>
      <div className="text-gray-400 mb-10">Nhập mật khẩu và xác nhận mật khẩu để tiếp tục</div>
      <form id="adminResetPassword">
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