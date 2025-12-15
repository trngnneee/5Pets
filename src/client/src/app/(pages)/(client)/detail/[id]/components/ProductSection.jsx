"use client"
import { useEffect, useState } from "react";
import { ItemCard } from "../../../components/ItemCard/ItemCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { clientPetList } from "@/lib/clientAPI/pet";
import { ItemCardSkeleton } from "../../../components/ItemCard/ItemCardSkeleton";

export const OtherProducts = () => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const promise = await clientPetList(4);
      if (promise.code == "success")
      {
        setItemList(promise.data);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center my-7">
        <div>
          <div className="font-medium">Có gì mới?</div>
          <div className="text-[24px] font-bold text-[var(--main-color)] capitalize">Xem thêm thú cưng</div>
        </div>

        <div>
          <Button
            className="bg-transparent text-[var(--main-color)] hover:bg-[#80808023] border-[1.5px] border-[var(--main-color)] rounded-[57px] py-3 px-7"
          >
            Xem thêm
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
        {itemList.length > 0 ? itemList.map((item, index) => (
          <ItemCard key={index} item={item} />
        )) : [...Array(4)].map((_, index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
