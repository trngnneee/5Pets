import Link from "next/link";
import { HeaderSearch } from "./components/HeaderSearch";
import { Button } from "@/components/ui/button";

export const Header = () => {
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
  
  const NavItem = ({ title, link }) => {
    return (
      <Link className="text-[16px] font-bold text-[#003459]" href={link}>{title}</Link>
    )
  }
  
  return (
    <>
      <div className="bg-[#FCEED5] py-7 relative">
        <div className="container mx-auto flex justify-between items-center relative z-10">
          <div className="w-[180px] h-auto">
            <img
              src="/logo.png"
              alt="5Pets Logo"
              className="w-full h-full"
            />
          </div>
          <div className="flex items-center gap-12">
            {navList.map((item, index) => (
              <NavItem 
                key={index}
                title={item.title}
                link={item.link}
              />
            ))}
          </div>
          <div className="flex items-center gap-3.5">
            <HeaderSearch/>
            <Button className="bg-[#003459] hover:bg-[#001e33] rounded-[57px] font-bold">Tham gia cộng đồng</Button>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-0 h-4/5 w-auto overflow-hidden">
          <img
            src="/itemHeader.svg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}