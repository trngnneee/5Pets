"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminForgotPassword, adminOTPPassword } from "@/lib/adminAPI/account";
import { toastHandler } from "@/lib/toastHandler";
import { OTPInputComponent } from "./OTPInput";
import { Loader2 } from "lucide-react";

const RESEND_SECONDS = 60;

export const MainContent = () => {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  // Mã vừa được gửi ở bước trước nên bắt đầu đếm ngược ngay
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (value) => {
    setOtp(value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pending) return;

    if (!otp) {
      setError("Vui lòng nhập mã OTP");
      return;
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      setError("OTP phải gồm 6 chữ số");
      return;
    }

    setError("");
    setPending(true);

    const promise = adminOTPPassword({
      email: email,
      otp: otp
    });

    toastHandler(promise, router, "/admin/account/reset-password");
    promise.catch(() => setPending(false));
  };

  const handleResend = () => {
    if (!email || cooldown > 0 || resending) return;
    setResending(true);
    const promise = adminForgotPassword({ email });
    toastHandler(promise);
    promise
      .then(() => {
        setOtp("");
        setCooldown(RESEND_SECONDS);
      })
      .catch(() => {})
      .finally(() => setResending(false));
  };

  return (
    <>
      <h1 className="font-bold text-[36px] text-[#2B3674]">Xác thực OTP</h1>
      <div className="text-gray-500 mb-10">
        {email ? (
          <>Nhập mã 6 chữ số đã được gửi đến <span className="font-semibold text-[#2B3674] break-all">{email}</span></>
        ) : (
          <>Nhập OTP được gửi đến email để tiếp tục</>
        )}
      </div>
      <form id="adminOTPPasswordForm" onSubmit={handleSubmit}>
        <div className="flex justify-center mb-[33px]">
          <OTPInputComponent
            otp={otp}
            setOtp={handleChange}
            invalid={Boolean(error)}
          />
        </div>
        {error && (
          <div id="otp-error" role="alert" className="text-red-600 text-[12px] mb-4">{error}</div>
        )}
        <Button disabled={pending} className="w-full bg-[#2B3674] hover:bg-[#1e2758be]">
          {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
          {pending ? "Đang xác thực..." : "Xác thực OTP"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-500">
        {email ? (
          <>
            Chưa nhận được mã?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || resending}
              className="font-semibold text-[#2B3674] hover:underline disabled:cursor-not-allowed disabled:text-gray-500 disabled:no-underline"
            >
              {resending ? "Đang gửi..." : cooldown > 0 ? `Gửi lại mã sau ${cooldown}s` : "Gửi lại mã"}
            </button>
          </>
        ) : (
          <Link href="/admin/account/forgot-password" className="font-semibold text-[#2B3674] hover:underline">Nhập lại email để nhận mã</Link>
        )}
      </div>
      <div className="mt-[26px] text-[#2B3674] text-center">Đã có tài khoản? <Link className="font-bold hover:underline" href="/admin/account/login">Đăng nhập</Link></div>
    </>
  );
}
