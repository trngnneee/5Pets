"use client"

import { ItemCard } from "@/app/(pages)/(client)/components/ItemCard/ItemCard";
import { Section3 } from "../../(home)/components/Section3/Section3";
import { Filter } from "./components/Filter";
import { SectionBreadcrumb } from "./components/SectionBreadcrumb";
import { SectionPagination } from "./components/SectionPagination";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { clientPetListByCategory } from "@/lib/clientAPI/pet";

export default function CategoryPage() {
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const promise = await clientPetListByCategory(id);
      if (promise.code == "success")
      {
        setData(promise.data.petList);
        setCategoryName(promise.data.categoryName);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <SectionBreadcrumb
        id={id}
      />
      <Section3 />
      <div className="flex gap-5 container mx-auto mb-[60px] relative">
        <Filter />
        <div>
          <div className="font-bold text-[24px] text-[#003459] mb-3.5">{categoryName}</div>
          <div className="grid grid-cols-3 gap-5 mb-5">
            {data.length > 0 && data.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
              />
            ))}
          </div>
          <SectionPagination
            currentPage={1}
            totalPages={10}
          />
        </div>
      </div>
    </>
  )
}