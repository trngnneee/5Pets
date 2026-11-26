"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const ContactBox = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Vui lòng nhập email của bạn.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Email chưa đúng định dạng, ví dụ: ban@gmail.com");
      return;
    }
    setError("");
    // Chưa có API đăng ký nhận tin: báo rõ cho người dùng thay vì giả vờ thành công
    toast.info("Tính năng đăng ký nhận tin đang được phát triển. Cảm ơn bạn đã quan tâm!");
  };

  return (
    <>
      <div id="newsletter" className="bg-[var(--main-color)] rounded-2xl p-8 max-md:p-5 flex max-md:flex-col items-center max-md:items-stretch gap-5 scroll-mt-6">
        <h2 className="text-[#FDFDFD] font-bold text-[20px] w-1/3 max-md:w-full">
          Đăng ký ngay để không bỏ lỡ các chương trình của chúng tôi
        </h2>
        <form onSubmit={handleSubmit} noValidate className="w-2/3 max-md:w-full bg-white p-4 rounded-[14px]">
          <div className="flex flex-row max-sm:flex-col items-center max-sm:items-stretch gap-3">
            <Input
              type="email"
              name="newsletter-email"
              autoComplete="email"
              placeholder="Nhập email của bạn..."
              aria-label="Email nhận tin"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "newsletter-error" : undefined}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
            />
            <Button type="submit" className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-xl font-medium">Đăng ký ngay</Button>
          </div>
          {error && (
            <p id="newsletter-error" role="alert" className="mt-2 text-xs text-destructive">{error}</p>
          )}
        </form>
      </div>
    </>
  );
}
