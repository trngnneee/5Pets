import { Button } from "@/components/ui/button";
import { featuredCategoryId } from "@/config/variable";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const SectionHeader = () => {
  return (
    <>
      <div className="flex justify-between items-end gap-4 mb-7 flex-wrap">
        <div>
          <div className="font-medium">Có gì mới?</div>
          <h2 className="text-[24px] font-bold text-[var(--main-color)] capitalize">một số vật nuôi của chúng tôi</h2>
        </div>

        <div>
          <Button
            asChild
            className="bg-transparent text-[var(--main-color)] hover:bg-[#80808023] border-[1.5px] border-[var(--main-color)] rounded-[57px] py-3 px-7 max-md:h-11"
          >
            <Link href={`/category/${featuredCategoryId}`}>
              Xem thêm
              <ChevronRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
