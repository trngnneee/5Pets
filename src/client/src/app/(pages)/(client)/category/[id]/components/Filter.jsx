import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Funnel } from "lucide-react"

export const Filter = ({ gender, setGender, color, setColor }) => {
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
              <Checkbox 
                id="gender_male" 
                checked={gender.includes("male")} 
                onCheckedChange={(checked) => {
                if (checked) {
                  setGender([...gender, "male"]);
                } else {
                  setGender(gender.filter(g => g !== "male"));
                }
              }} />
              <Label htmlFor="gender_male" className="font-medium text-sm text-[#00171F]">Đực</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="gender_female" 
                checked={gender.includes("female")} 
                onCheckedChange={(checked) => {
                if (checked) {
                  setGender([...gender, "female"]);
                } else {
                  setGender(gender.filter(g => g !== "female"));
                }
              }} />
              <Label htmlFor="gender_female" className="font-medium text-sm text-[#00171F]">Cái</Label>
            </div>
          </div>
        </div>

        <div className="border-b border-b-[#EBEEEF] py-4">
          <div className="font-bold text-[#00171F] mb-2.5">Màu sắc</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="color_black"
                checked={color.includes("Đen")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setColor([...color, "Đen"]);
                  } else {
                    setColor(color.filter(c => c !== "Đen"));
                  }
                }}
              />
              <Label htmlFor="color_black" className="font-medium text-sm text-[#00171F]">Đen</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="color_white"
                checked={color.includes("Trắng")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setColor([...color, "Trắng"]);
                  } else {
                    setColor(color.filter(c => c !== "Trắng"));
                  }
                }}
              />
              <Label htmlFor="color_white" className="font-medium text-sm text-[#00171F]">Trắng</Label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}