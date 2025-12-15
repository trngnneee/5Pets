"use client"

import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";

export const Section1 = () => {
  return (
    <>
      <div className="bg-[#FCEED5] rounded-b-[40px]">
        <div className="container mx-auto flex">
          <div className="flex flex-col justify-center w-1/2 relative">
            <div className="font-bold text-[60px] text-[var(--main-color)]" data-aos="fade-up" data-aos-delay="100">Thêm Một Bạn</div>
            <div className="font-bold text-[46px] text-[var(--main-color)]" data-aos="fade-up" data-aos-delay="300">Thêm Ngàn Niềm Vui</div>
            <div className="font-medium text-[var(--main-color)] mt-6 w-[480px]" data-aos="fade-up" data-aos-delay="500">Có một con thú cưng đồng nghĩa với việc bạn có thêm niềm vui mới. Chúng tôi có hơn 200 con thú cưng khác nhau có thể đáp ứng nhu cầu của bạn!</div>
            <div className="mt-[34px] flex items-center gap-[18px]" data-aos="fade-up" data-aos-delay="700">
              <Button
                className="bg-transparent text-[var(--main-color)] hover:bg-[#80808023] border-[1.5px] border-[var(--main-color)] rounded-[57px] py-3 px-7"
              >
                Giới thiệu
                <CirclePlay />
              </Button>
              <Button
                onClick={() => {
                  document.getElementById("section2")?.scrollIntoView({ behavior: "smooth", duration: "500" });
                }}
                className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-[57px] py-3 px-7"
              >
                Khám phá ngay
              </Button>
            </div>
            <div className="absolute -left-1/4 bottom-0 z-0 overflow-hidden">
              <img
                src="itemSection1_2.svg"
              />
            </div>
            <div className="text-[10px] italic mt-2.5" data-aos="fade-up" data-aos-delay="700">Website này chỉ phục vụ mục đích học tập. Không dùng cho mục đích thương mại.</div>
          </div>
          <div className="relative">
            <div className="w-[550px] h-auto overflow-hidden z-10 relative" data-aos="zoom-in" data-aos-delay="300">
              <img
                src="/section1.png"
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