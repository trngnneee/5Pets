"use client"

import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";

export const Section1 = () => {
  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="bg-[#FCEED5] rounded-b-[40px] overflow-x-clip">
        <div className="container mx-auto flex max-lg:flex-col max-lg:pt-6">
          <div className="flex flex-col justify-center w-1/2 max-lg:w-full relative">
            <h1 className="flex flex-col">
              <span className="font-bold text-[60px] max-md:text-[40px] max-md:leading-tight text-[var(--main-color)]" data-aos="fade-up" data-aos-delay="100">Thêm Một Bạn</span>
              <span className="font-bold text-[46px] max-md:text-[30px] max-md:leading-tight text-[var(--main-color)]" data-aos="fade-up" data-aos-delay="300">Thêm Ngàn Niềm Vui</span>
            </h1>
            <p className="font-medium text-[var(--main-color)] mt-6 w-[480px] max-md:w-full" data-aos="fade-up" data-aos-delay="500">Có một con thú cưng đồng nghĩa với việc bạn có thêm niềm vui mới. Chúng tôi có hơn 200 con thú cưng khác nhau có thể đáp ứng nhu cầu của bạn!</p>
            <div className="mt-[34px] flex flex-wrap items-center gap-[18px] relative z-10" data-aos="fade-up" data-aos-delay="700">
              <Button
                onClick={() => scrollToId("about")}
                className="bg-transparent text-[var(--main-color)] hover:bg-[#80808023] border-[1.5px] border-[var(--main-color)] rounded-[57px] py-3 px-7 max-md:h-11"
              >
                Giới thiệu
                <CirclePlay aria-hidden="true" />
              </Button>
              <Button
                onClick={() => scrollToId("section2")}
                className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-[57px] py-3 px-7 max-md:h-11"
              >
                Khám phá ngay
              </Button>
            </div>
            <div className="absolute -left-1/4 bottom-0 z-0 overflow-hidden max-lg:hidden" aria-hidden="true">
              <img
                src="/itemSection1_2.svg"
                alt=""
              />
            </div>
            <p className="text-xs italic mt-2.5 text-[#667479] relative z-10" data-aos="fade-up" data-aos-delay="700">Website này chỉ phục vụ mục đích học tập. Không dùng cho mục đích thương mại.</p>
          </div>
          <div className="relative max-lg:mt-6 max-lg:self-center">
            <div className="w-[550px] max-lg:w-full max-lg:max-w-[420px] h-auto overflow-hidden z-10 relative" data-aos="zoom-in" data-aos-delay="300">
              <img
                src="/section1.png"
                alt="Thú cưng đáng yêu tại 5Pets"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -left-1/4 bottom-0 z-0 w-[800px] max-lg:w-[150%]" aria-hidden="true">
              <img
                src="/itemSection1.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
