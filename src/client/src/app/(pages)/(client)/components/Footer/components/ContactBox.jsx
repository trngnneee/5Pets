import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ContactBox = () => {  
  return (
    <>
      <div className="bg-[var(--main-color)] rounded-2xl p-8 flex items-center gap-5">
        <div className="text-[#FDFDFD] font-bold text-[20px] w-1/3">
          Đăng ký ngay để không bỏ lỡ các chương trình của chúng tôi
        </div>
        <div className="w-2/3 bg-white flex flex-row items-center gap-3 p-4 rounded-[14px]">
          <Input
            placeholder="Nhập email của bạn..."
          />
          <Button className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-xl font-medium">Đăng ký ngay</Button>
        </div>
      </div>
    </>
  );
}