export const PolicyTerm = () => {
  return (
    <>
      <div className="flex max-md:flex-col-reverse items-center justify-between gap-4 py-10 max-md:py-6">
        <div className="text-[14px] font-medium text-[#667479]">
          © 2025 5Pets. All rights reserved.
        </div>
        <div className="w-[115px] h-auto">
          <img
            src="/logo.png"
            alt="5Pets"
            loading="lazy"
            className="w-full h-full"
          />
        </div>
        <div className="text-[14px] font-medium text-[#667479] flex items-center gap-8">
          <div>Điều khoản dịch vụ</div>
          <div>Chính sách bảo mật</div>
        </div>
      </div>
    </>
  );
}
