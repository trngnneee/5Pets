import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";

export const Section3 = () => {
  return (
    <div className="container mx-auto mb-[60px] relative">
      <div className="w-full h-auto">
        <img
          src="/Section3.svg"
          className="w-full h-full"
        />
      </div>
      <div className="absolute bottom-0 flex justify-between">
        <div className="w-[466px] h-auto overflow-hidden">
          <img
            src="/itemSection3.png"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/3 mr-[85px] flex flex-col items-end">
          <div className="text-[52px] font-bold text-[#003459]">Thêm Một Bạn</div>
          <div className="text-[36px] font-bold text-[#003459]">Thêm Ngàn Niềm Vui!</div>
          <div className="text-[12px] font-medium text-[#242B33]">Có một con thú cưng đồng nghĩa với việc bạn có thêm niềm vui mới. Chúng tôi có hơn 200 con thú cưng khác nhau có thể đáp ứng nhu cầu của bạn!</div>
          {/* <div className="mt-[34px] flex items-center gap-[18px]">
            <Button
              className="bg-transparent text-[#002A48] hover:bg-[#80808023] border-[1.5px] border-[#003459] rounded-[57px] py-3 px-7"
            >
              Giới thiệu
              <CirclePlay />
            </Button>
            <Button className="bg-[#003459] hover:bg-[#012640] rounded-[57px] py-3 px-7">Khám phá ngay</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}