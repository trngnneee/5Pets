"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { clientColorList } from "@/lib/clientAPI/category"
import { ChevronDown, Funnel } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const genderOptions = [
  { value: "male", label: "Đực" },
  { value: "female", label: "Cái" },
];

export const Filter = ({ gender, setGender, color, setColor, onClear }) => {
  const [colorList, setColorList] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { id } = useParams();

  const activeCount = gender.length + color.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await clientColorList(id);
        setColorList(Array.isArray(promise?.data) ? promise.data : []);
      } catch {
        setColorList([]);
      }
    }
    fetchData();
  }, [id])

  const toggleValue = (list, setList, value, checked) => {
    setList(checked ? [...list, value] : list.filter((item) => item !== value));
  };

  return (
    <>
      <aside className="w-[280px] max-lg:w-full lg:sticky lg:top-[100px] h-fit self-start" aria-label="Bộ lọc thú cưng">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          {/* Desktop: tiêu đề tĩnh; Mobile: nút mở/đóng bộ lọc */}
          <div className="text-[var(--main-color)] flex items-center gap-1 max-lg:hidden">
            <Funnel aria-hidden="true" />
            <h2 className="text-[20px] font-bold">Bộ Lọc</h2>
            {activeCount > 0 && (
              <span className="ml-1 rounded-full bg-[var(--main-color)] px-2 py-0.5 text-xs font-bold text-white tabular-nums" aria-label={`${activeCount} bộ lọc đang chọn`}>{activeCount}</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="category-filter-panel"
            className="lg:hidden text-[var(--main-color)] flex items-center gap-1 rounded-md py-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <Funnel aria-hidden="true" />
            <span className="text-[20px] font-bold">Bộ Lọc</span>
            {activeCount > 0 && (
              <span className="ml-1 rounded-full bg-[var(--main-color)] px-2 py-0.5 text-xs font-bold text-white tabular-nums">{activeCount}</span>
            )}
            <ChevronDown className={cn("size-4 transition-transform", mobileOpen && "rotate-180")} aria-hidden="true" />
          </button>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-sm font-medium text-[var(--main-color)] underline-offset-4 hover:underline rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        <div id="category-filter-panel" className={cn(!mobileOpen && "max-lg:hidden")}>
          <div role="group" aria-labelledby="filter-gender-title" className="border-b border-b-[#EBEEEF] pb-4">
            <div id="filter-gender-title" className="font-bold text-[#00171F] mb-2.5">Giống</div>
            <div className="flex flex-col gap-1">
              {genderOptions.map((option) => (
                <div className="flex items-center gap-2" key={option.value}>
                  <Checkbox
                    id={`gender_${option.value}`}
                    checked={gender.includes(option.value)}
                    onCheckedChange={(checked) => toggleValue(gender, setGender, option.value, checked)}
                  />
                  <Label htmlFor={`gender_${option.value}`} className="font-medium text-sm text-[#00171F] py-1.5 flex-1">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div role="group" aria-labelledby="filter-color-title" className="border-b border-b-[#EBEEEF] py-4">
            <div id="filter-color-title" className="font-bold text-[#00171F] mb-2.5">Màu sắc</div>
            <div className="flex flex-col gap-1">
              {colorList.length > 0 ? colorList.map((item, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <Checkbox
                    id={`color_${item.color_slug}`}
                    checked={color.includes(item.color_slug)}
                    onCheckedChange={(checked) => toggleValue(color, setColor, item.color_slug, checked)}
                  />
                  <Label htmlFor={`color_${item.color_slug}`} className="font-medium text-sm text-[#00171F] py-1.5 flex-1">{item.color}</Label>
                </div>
              )) : (
                <div className="text-sm text-[#667479]">Chưa có dữ liệu màu sắc</div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
