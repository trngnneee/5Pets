import Link from "next/link";

export const BackgroundSider = () => {
  return (
    <div className="w-1/2 h-full relative">
      <img
        src="/adminAccountBg.png"
        alt="Admin background"
        className="w-full h-full object-cover rounded-bl-[100px]"
      />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-[60%]">
        <div className="w-[400px] h-auto">
          <img
            src="/logo.png"
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
    </div>
  );
};
