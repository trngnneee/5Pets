"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminRegister } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";
import JustValidate from "just-validate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const validation = new JustValidate("#adminRegisterFrom");
    validation
      .addField('#fullname', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập họ tên!'
        },
        {
          rule: 'minLength',
          value: 5,
          errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
        },
      ])
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
    validation.addField('[name="agree"]', [
      {
        rule: 'required',
        errorMessage: 'Bạn phải đồng ý với các điều khoản và điều kiện!'
      }
    ], {
      errorsContainer: '#agreeContainer'
    })
      .onSuccess((event) => {
        event.preventDefault();

        const finalData = {
          fullname: event.target.fullname.value,
          email: event.target.email.value,
          password: event.target.password.value,
        };

        const promise = adminRegister(finalData);
        toastHandler(promise, router, '/admin/account/login');
      })
  }, [])

  return (
    <>
      <div className="font-bold text-[36px] text-[#2B3674]">Đăng ký</div>
      <div className="text-gray-400 mb-10">Nhập họ tên, email và mật khẩu để đăng ký</div>
      <form id="adminRegisterFrom">
        <div className="mb-6 *:not-first:mt-2">
          <Label htmlFor="fullname" className="text-sm font-medium text-[#2B3674] ">Họ tên*</Label>
          <Input
            type="text"
            id="fullname"
            name="fullname"
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
        <div className="flex items-center gap-[11px] mb-[5px]">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            className="w-4 h-4 accent-[#2B3674]"
          />
          <Label htmlFor="agree" className="text-sm text-[#2B3674]">
            Đồng ý với chính sách điều khoản
          </Label>
        </div>
        <div id="agreeContainer" className="mb-[33px]"></div>
        <Button className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">Đăng ký</Button>
      </form>
      <div className="mt-[26px] text-[#2B3674] text-center">Đã có tài khoản? <Link className="font-bold hover:underline" href="/admin/account/login">Đăng nhập</Link></div>
    </>
  );
}