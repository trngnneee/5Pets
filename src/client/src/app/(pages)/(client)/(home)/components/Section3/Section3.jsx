export const Section3 = () => {
  return (
    <section id="about" className="container mx-auto mb-[60px] relative scroll-mt-6">
      {/* Desktop: banner gốc */}
      <div className="max-lg:hidden">
        <div className="w-full h-auto" aria-hidden="true">
          <img
            src="/Section3.svg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="absolute bottom-0 flex justify-between">
          <div className="w-[466px] h-auto overflow-hidden">
            <img
              src="/itemSection3.png"
              alt="Chú chó vui vẻ của 5Pets"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/3 mr-[85px] flex flex-col items-end">
            <h2 className="flex flex-col items-end">
              <span className="text-[52px] font-bold text-[var(--main-color)]">Thêm Một Bạn</span>
              <span className="text-[36px] font-bold text-[var(--main-color)]">Thêm Ngàn Niềm Vui!</span>
            </h2>
            <p className="text-[13px] font-medium text-[#242B33]">Có một con thú cưng đồng nghĩa với việc bạn có thêm niềm vui mới. Chúng tôi có hơn 200 con thú cưng khác nhau có thể đáp ứng nhu cầu của bạn!</p>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: cùng nội dung, bố cục dọc để không tràn màn hình */}
      <div className="lg:hidden flex items-end gap-4 rounded-[28px] bg-[#FCEED5] px-6 pt-6 overflow-hidden">
        <div className="flex-1 pb-6">
          <h2 className="flex flex-col">
            <span className="text-[32px] max-sm:text-[26px] font-bold leading-tight text-[var(--main-color)]">Thêm Một Bạn</span>
            <span className="text-[24px] max-sm:text-[20px] font-bold leading-tight text-[var(--main-color)]">Thêm Ngàn Niềm Vui!</span>
          </h2>
          <p className="mt-3 text-sm font-medium text-[#242B33]">Có một con thú cưng đồng nghĩa với việc bạn có thêm niềm vui mới. Chúng tôi có hơn 200 con thú cưng khác nhau có thể đáp ứng nhu cầu của bạn!</p>
        </div>
        <div className="w-[40%] max-w-[260px] shrink-0 max-sm:hidden" aria-hidden="true">
          <img
            src="/itemSection3.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
