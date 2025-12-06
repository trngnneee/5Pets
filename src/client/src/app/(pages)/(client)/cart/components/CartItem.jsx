import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

export const CartItem = ({ pet }) => {
  return (
    <>
      <div className="flex gap-[30px] border-b border-b-gray-200 pb-5">
        <div className="flex flex-col items-center justify-between">
          <Button className={"bg-transparent hover:bg-transparent shadow-none text-[var(--main-color)]"}>
            <X/>
          </Button>
          <Checkbox defaultChecked={true} className={"checked:bg-[var(--main-color)]"} />
          <div></div>
        </div>
        <div className="w-[180px] h-[150px] overflow-hidden rounded-xl">
          <img 
            src={pet.imageList[0]}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between flex-1">
          <div>
            <div className="font-bold text-[var(--main-color)]">{pet.name}</div>
            <div className="mt-3">
              <div className="text-sm text-gray-500">Giống: <span className="font-bold">{pet.gender == "male" ? "Đực" : "Cái"}</span></div>
              <div className="text-sm text-gray-500">Tuổi: <span className="font-bold">{pet.age}</span></div>
              <div className="text-sm text-gray-500">Màu sắc: <span className="font-bold">{pet.color}</span></div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-bold mb-[30px]">Số lượng:</div>
            <div className="flex items-center gap-5">
              <div>Con:</div>
              <div>1 x <span className="text-[var(--main-color)] font-semibold">{pet.price} VND</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}