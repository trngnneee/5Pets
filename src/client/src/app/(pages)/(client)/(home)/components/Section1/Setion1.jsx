import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";

export const Section1 = () => {
  return (
    <>
      <div className="bg-[#FCEED5] rounded-b-[40px]">
        <div className="container mx-auto flex">
          <div className="flex flex-col justify-center w-1/2 relative">
            <div className="font-bold text-[60px] text-[#002A48]" data-aos="fade-up" data-aos-delay="100">Thêm Một Bạn</div>
            <div className="font-bold text-[46px] text-[#002A48]" data-aos="fade-up" data-aos-delay="300">Thêm Ngàn Niềm Vui</div>
            <div className="font-medium text-[#002A48] mt-6 w-[480px]" data-aos="fade-up" data-aos-delay="500">Có một con thú cưng đồng nghĩa với việc bạn có thêm niềm vui mới. Chúng tôi có hơn 200 con thú cưng khác nhau có thể đáp ứng nhu cầu của bạn!</div>
            <div className="mt-[34px] flex items-center gap-[18px]" data-aos="fade-up" data-aos-delay="700">
              <Button
                className="bg-transparent text-[#002A48] hover:bg-[#80808023] border-[1.5px] border-[#003459] rounded-[57px] py-3 px-7"
              >
                Giới thiệu
                <CirclePlay />
              </Button>
              <Button className="bg-[#003459] hover:bg-[#012640] rounded-[57px] py-3 px-7">Khám phá ngay</Button>
            </div>
            <div className="absolute -left-1/4 bottom-0 z-0 overflow-hidden">
              <img
                src="itemSection1_2.svg"
              />
            </div>
          </div>
          <div className="relative" data-aos="fade-up" data-aos-delay="100">
            <div className="w-[550px] h-auto overflow-hidden z-10 relative">
              <img
                src="/section1.svg"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -left-1/4 bottom-0 z-0 w-[800px]">
              <img
                src="itemSection1.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}