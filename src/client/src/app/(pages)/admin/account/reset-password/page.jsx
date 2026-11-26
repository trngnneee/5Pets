"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/PasswordInput";
import { adminResetPassword } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";
import JustValidate from "just-validate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  
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
        // Ô xác nhận chỉ cần khớp với mật khẩu, không lặp lại các điều kiện độ mạnh
        .addField('#confirm-password', [
          {
            rule: 'required',
            errorMessage: 'Vui lòng nhập lại mật khẩu!',
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
  
          setPending(true);
          const promise = adminResetPassword(finalData);
          toastHandler(promise, router, "/admin/category");
          promise.catch(() => setPending(false));
        })
    }, [])
  
  return (
    <>
      <h1 className="font-bold text-[36px] text-[#2B3674]">Đổi mật khẩu</h1>
      <div className="text-gray-500 mb-10">Nhập mật khẩu mới và xác nhận lại để tiếp tục</div>
      <form id="adminResetPassword">
        <div className="mb-[31px] *:not-first:mt-2">
          <Label htmlFor="password" className="text-sm font-medium text-[#2B3674]">Mật khẩu mới<span className="text-red-500" aria-hidden="true">*</span></Label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            autoFocus
            aria-describedby="password-hint"
          />
          <p id="password-hint" className="text-xs text-gray-500">
            Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt (@$!%*?&).
          </p>
        </div>
        <div className="mb-[31px] *:not-first:mt-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium text-[#2B3674]">Xác nhận mật khẩu<span className="text-red-500" aria-hidden="true">*</span></Label>
          <PasswordInput
            id="confirm-password"
            name="confirm-password"
            autoComplete="new-password"
          />
        </div>
        <Button disabled={pending} className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">
          {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
          {pending ? "Đang lưu..." : "Đổi mật khẩu"}
        </Button>
      </form>
      <div className="mt-[26px] text-[#2B3674] text-center"><Link className="font-bold hover:underline" href="/admin/account/login">Quay lại đăng nhập</Link></div>
    </>
  );
}
