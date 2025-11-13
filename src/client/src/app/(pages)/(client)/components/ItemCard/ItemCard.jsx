import { Dot } from "lucide-react";
import Link from "next/link";

export const ItemCard = ({ item }) => {
  return (
    <>
      <Link href={`/detail/${item.id}`} className="p-2 shadow-xl rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <div className="overflow-hidden mb-4 w-full h-[250px]">
          <img
            src={item.imageList[0]}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="px-2">
          <div className="font-bold mb-1">{item.name}</div>
          <div className="text-[12px] text-[#667479] font-mediun flex items-center mb-1">
            <div>Giống: <span className="font-bold">{item.gender == "male" ? "Đực" : "Cái"}</span></div>
            <div><Dot /></div>
            <div>Tuổi: <span className="font-bold">{item.age}</span></div>
          </div>
          <div className="text-sm font-bold mb-5">{item.price.toLocaleString("vi-VN")} VND</div>
        </div>
      </Link>
    </>
  );
}