import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const SectionHeader = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <div>
          <div className="font-medium">Có thể bạn đã biết?</div>
          <div className="text-[24px] font-bold text-[var(--main-color)] capitalize">Kiến thức thú cưng hữu ích</div>
        </div>
      </div>
    </>
  );
}