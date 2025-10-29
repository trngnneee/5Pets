import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const SectionHeader = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <div>
          <div className="font-medium">Có gì mới?</div>
          <div className="text-[24px] font-bold text-[#003459] capitalize">một số vật nuôi của chúng tôi</div>
        </div>

        <div>
          <Button
            className="bg-transparent text-[#002A48] hover:bg-[#80808023] border-[1.5px] border-[#003459] rounded-[57px] py-3 px-7"
          >
            Xem thêm
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
}