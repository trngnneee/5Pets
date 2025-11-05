"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { OTPInputComponent } from "./components/OTPInput";
import { useRouter, useSearchParams } from "next/navigation";
import { adminOTPPassword } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";

export default function AdminRegisterPage() {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Vui lòng nhập mã OTP");
      return;
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      setError("OTP phải gồm 6 chữ số");
      return;
    }

    setError("");
    
    const promise = adminOTPPassword({
      email: email,
      otp: otp
    });

    toastHandler(promise, router, "/admin/account/reset-password");
  };

  return (
    <>
      <div className="font-bold text-[36px] text-[#2B3674]">Xác thực OTP</div>
      <div className="text-gray-400 mb-10">Nhập OTP được gửi đến email để tiếp tục</div>
      <form id="adminOTPPasswordForm" onSubmit={handleSubmit}>
        <div className="flex justify-center mb-[33px]">
          <OTPInputComponent
            otp={otp}
            setOtp={setOtp}
          />
        </div>
        {error && (
          <div className="text-red-500 text-[12px] mb-4">{error}</div>
        )}
        <Button className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">Xác thực OTP</Button>
      </form>
      <div className="mt-[26px] text-[#2B3674] text-center">Đã có tài khoản? <Link className="font-bold hover:underline" href="/admin/account/login">Đăng nhập</Link></div>
    </>
  );
}