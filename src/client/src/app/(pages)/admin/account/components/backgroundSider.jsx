import Link from "next/link";

export const BackgroundSider = () => {
  const footerNav = [
    {
      title: "Trang chủ",
      link: "/"
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
      <Link className="text-[16px] font-bold text-white" href={link}>{title}</Link>
    )
  }

  return (
    <div className="w-1/2 h-full relative">
      <img
        src="/adminAccountBg.png"
        alt="Admin background"
        className="w-full h-full object-cover rounded-bl-[100px]"
      />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-[60%]">
        <div className="w-[280px] h-auto">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 translate-y-full border border-[#ffffff5d] p-5 rounded-[20px]">
        <div className="text-white text-center mb-2.5 font-light">Learn more about 5Pets</div>
        <div className="text-[20px] font-extrabold text-white text-center">
          Ultimate platform for pet lovers
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-5">
          {footerNav.map((item, index) => (
            <NavItem
              key={index}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
