import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export const NavBar = () => {
  const navList = [
    {
      title: "Trang chủ",
      link: "#"
    },
    {
      title: "Danh mục",
      link: "#"
    },
    {
      title: "Giới thiệu",
      link: "#"
    },
    {
      title: "Liên hệ",
      link: "#"
    },
  ]

  const socialList = [
    {
      Icon: Facebook,
      link: "#"
    },
    {
      Icon: Twitter,
      link: "#"
    },
    {
      Icon: Instagram,
      link: "#"
    },
    {
      Icon: Youtube,
      link: "#"
    },
  ]

  const NavItem = ({ title, link }) => {
    return (
      <Link className="text-[16px] font-medium text-[#003459]" href={link}>{title}</Link>
    )
  }

  const SocialItem = ({ Icon, link }) => {
    return (
      <Link href={link}><Icon/></Link>
    )
  }

  return (
    <>
      <div className="mt-10 flex items-center justify-between border-b border-b-[#CCD1D2] pb-10">
        <div className="flex items-center gap-12">
          {navList.map((item, index) => (
            <NavItem
              key={index}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
        <div className="flex items-center gap-12">
          {socialList.map((item, index) => (
            <SocialItem
              key={index}
              Icon={item.Icon}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </>
  );
}