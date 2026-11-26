"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { ItemCard } from "../../../components/ItemCard/ItemCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { clientPetList } from "@/lib/clientAPI/pet";
import { ItemCardSkeleton } from "../../../components/ItemCard/ItemCardSkeleton";
import { featuredCategoryId } from "@/config/variable";

export const OtherProducts = ({ currentId }) => {
  const [itemList, setItemList] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dư 1 con để loại bé đang xem ra khỏi danh sách gợi ý
        const promise = await clientPetList(5);
        const list = (promise.data || []).filter((item) => item.id !== currentId).slice(0, 4);
        setItemList(list);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    fetchData();
  }, [currentId])

  // Không có gì để gợi ý thì ẩn hẳn khu vực này
  if (status === "error" || (status === "ready" && itemList.length === 0)) return null;

  return (
    <section className="w-full">
      <div className="flex justify-between items-end gap-4 my-7 flex-wrap">
        <div>
          <div className="font-medium">Có gì mới?</div>
          <h2 className="text-[24px] font-bold text-[var(--main-color)] capitalize">Xem thêm thú cưng</h2>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5" aria-busy={status === "loading"}>
        {status === "ready" ? itemList.map((item, index) => (
          <ItemCard key={item.id || index} item={item} />
        )) : [...Array(4)].map((_, index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
