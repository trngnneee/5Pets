import { Dot } from "lucide-react";

export const ItemCard = ({ item }) => {
  return (
    <>
      <div className="p-2 shadow-xl rounded-2xl">
        <div className="overflow-hidden mb-4">
          <img
            src={item.image}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="px-2">
          <div className="font-bold mb-1">{item.name}</div>
          <div className="text-[12px] text-[#667479] font-mediun flex items-center mb-1">
            <div>Giống: <span className="font-bold">{item.gender}</span></div>
            <div><Dot /></div>
            <div>Tuổi: <span className="font-bold">{item.age}</span></div>
          </div>
          <div className="text-sm font-bold mb-5">{item.price} VND</div>
        </div>
      </div>
    </>
  );
}