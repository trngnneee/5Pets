"use client"

import { clientPetSearch } from "@/lib/clientAPI/pet";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { ItemCard } from "../components/ItemCard/ItemCard";
import { ItemCardSkeleton } from "../components/ItemCard/ItemCardSkeleton";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [petList, setPetList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (!keyword){
      router.push("/");
      return;
    }
    const fetchData = async () => {
      const promise = await clientPetSearch(keyword);
      if (promise.code == "success") {
        setPetList(promise.data);
      }
      setLoaded(true);
    }
    fetchData();
  }, [searchParams])

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between items-center my-7">
          <div>
            <div className="font-medium">Kết quả tìm kiếm</div>
            <div className="text-[24px] font-bold text-[#003459]">Tìm kiếm cho: <span>"{searchParams.get("keyword")}"</span></div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[30px] mb-[30px]">
          {!loaded ? (
            [...Array(16)].map((_, index) => (
              <ItemCardSkeleton key={index} />
            ))
          ) : (
            petList.length > 0 ? (
              petList.map((item, index) => (
                <ItemCard key={index} item={item} />
              ))
            ) : (
              <div className="text-xl">Không tìm thấy kết quả phù hợp</div>
            )
          )}
        </div>
      </div>
    </>
  )
}