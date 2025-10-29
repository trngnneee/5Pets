import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Funnel } from "lucide-react"

export const Filter = () => {
  return (
    <>
      <div className="w-[280px] sticky top-[100px] h-fit self-start">
        <div className="text-[#003459] flex items-center gap-1 mb-3.5">
          <Funnel />
          <div className="text-[20px] font-bold">Bộ Lọc</div>
        </div>

        <div className="border-b border-b-[#EBEEEF] pb-4">
          <div className="font-bold text-[#00171F] mb-2.5">Giống</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="gender_male" />
              <Label htmlFor="gender_male" className="font-medium text-sm text-[#00171F]">Đực</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="gender_female" />
              <Label htmlFor="gender_female" className="font-medium text-sm text-[#00171F]">Cái</Label>
            </div>
          </div>
        </div>

        <div className="border-b border-b-[#EBEEEF] py-4">
          <div className="font-bold text-[#00171F] mb-2.5">Màu sắc</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="color_gray" />
              <Label htmlFor="color_gray" className="font-medium text-sm text-[#00171F]">Xám</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="color_black" />
              <Label htmlFor="color_black" className="font-medium text-sm text-[#00171F]">Đen</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="color_white" />
              <Label htmlFor="color_white" className="font-medium text-sm text-[#00171F]">Trắng</Label>
            </div>
          </div>
        </div>

        <div className="border-b border-b-[#EBEEEF] py-4">
          <div className="font-bold text-[#00171F] mb-2.5">Kích thước</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="size_sm" />
              <Label htmlFor="size_sm" className="font-medium text-sm text-[#00171F]">Nhỏ</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="size_medium" />
              <Label htmlFor="size_medium" className="font-medium text-sm text-[#00171F]">Vừa</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="size_lg" />
              <Label htmlFor="size_lg" className="font-medium text-sm text-[#00171F]">Lớn</Label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}