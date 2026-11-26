"use client"

import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';

export const AOSConfig = () => {
  useEffect(() => {
    AOS.init({
      // Chỉ chạy hiệu ứng một lần, không lặp lại khi cuộn lên xuống
      once: true,
      // Tắt hoàn toàn khi người dùng bật "giảm chuyển động"
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return null;
}
