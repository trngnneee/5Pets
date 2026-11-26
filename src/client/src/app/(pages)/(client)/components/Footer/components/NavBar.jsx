"use client"

import { featuredCategoryId } from "@/config/variable";
import { openChatbot } from "@/helper/chatbotHelper";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const linkClass = "text-[16px] font-medium text-[#003459] rounded-sm hover:text-[var(--main-color)] hover:underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

export const NavBar = () => {
  const navList = [
    {
      title: "Trang chủ",
      link: "/"
    },
    {
      title: "Danh mục",
      link: `/category/${featuredCategoryId}`
    },
    {
      title: "Giới thiệu",
      link: "/#about"
    },
    {
      title: "Tra cứu đơn hàng",
      link: "/order"
    },
  ]

  // Chưa có trang mạng xã hội chính thức nên chỉ hiển thị icon, không gắn link giả
  const socialList = [
    { Icon: Facebook, label: "Facebook" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Instagram, label: "Instagram" },
    { Icon: Youtube, label: "Youtube" },
  ]

  return (
    <>
      <div className="mt-10 flex max-md:flex-col items-center max-md:items-start justify-between gap-6 border-b border-b-[#CCD1D2] pb-10">
        <nav aria-label="Liên kết chân trang" className="flex flex-wrap items-center gap-x-12 gap-y-3 max-md:gap-x-6">
          {navList.map((item, index) => (
            <Link key={index} className={linkClass} href={item.link}>{item.title}</Link>
          ))}
          <button type="button" onClick={() => openChatbot()} className={linkClass}>Liên hệ</button>
        </nav>
        <div className="flex items-center gap-12 max-md:gap-6 text-[#003459]" aria-hidden="true">
          {socialList.map(({ Icon, label }) => (
            <Icon key={label} />
          ))}
        </div>
      </div>
    </>
  );
}
