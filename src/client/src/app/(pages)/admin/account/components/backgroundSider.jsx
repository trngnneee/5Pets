export const BackgroundSider = () => {
  return (
    // Ẩn ảnh nền trên màn hình nhỏ để form có đủ chỗ
    <div className="hidden lg:block w-1/2 relative" aria-hidden="true">
      <img
        src="/adminAccountBg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover rounded-bl-[100px]"
      />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-[60%]">
        <div className="w-[400px] h-auto">
          <img
            src="/logo.png"
            alt=""
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
