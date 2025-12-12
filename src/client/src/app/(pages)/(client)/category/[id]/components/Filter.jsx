"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { clientColorList } from "@/lib/clientAPI/category"
import { Funnel } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const Filter = ({ gender, setGender, color, setColor }) => {
  const [colorList, setColorList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const promise = await clientColorList(id);
      setColorList(promise.data);
    }
    fetchData();
  }, [])

  return (
    <>
      <div className="w-[280px] sticky top-[100px] h-fit self-start">
        <div className="text-[var(--main-color)] flex items-center gap-1 mb-3.5">
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
            {colorList.length > 0 && colorList.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <Checkbox
                  id={`${item.color_slug}`}
                  checked={color.includes(item.color_slug)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setColor([...color, item.color_slug]);
                    } else {
                      setColor(color.filter(c => c !== item.color_slug));
                    }
                  }}
                />
                <Label htmlFor={`${item.color_slug}`} className="font-medium text-sm text-[#00171F]">{item.color}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}