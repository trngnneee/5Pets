"use client"

import { ItemCard } from "@/app/(pages)/(client)/components/ItemCard/ItemCard";
import { SectionHeader } from "./components/SectionHeader";
import { useEffect, useState } from "react";
import { clientPetList } from "@/lib/clientAPI/pet";

export const Section2 = () => {
  const [petList, setPetList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const promise = await clientPetList('8');
      console.log(promise);
      if (promise.code == "success")
      {
        setPetList(promise.data);
      }
    }
    fetchData();
  }, [])
  
  return (
    <>
      <div className="container mx-auto my-[60px]">
        <SectionHeader />
        <div className="grid grid-cols-4 gap-7" data-aos="fade-up">
          {petList.length > 0 && petList.map((item, index) => (
            <ItemCard
              key={index}
              item={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}