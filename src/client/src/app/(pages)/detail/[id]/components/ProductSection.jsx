"use client"
import { useEffect, useState } from "react";
import { ItemCard } from "@/app/components/ItemCard/ItemCard";

export const OtherProducts = () => {
  const itemList = [
    { image: "/dog1.jpg", name: "MO231 - Pomeranian White", gender: "Đực", age: "02 tháng", price: "6.900.000" },
    { image: "/dog2.jpg", name: "MO231 - Pomeranian White", gender: "Cái", age: "02 tháng", price: "3.900.000" },
    { image: "/dog3.jpg", name: "MO102 - Poodle Tiny Sepia", gender: "Đực", age: "02 tháng", price: "4.000.000" },
    { image: "/dog4.jpg", name: "MO231 - Pomeranian White", gender: "Đực", age: "02 tháng", price: "6.900.000" },
    { image: "/dog5.jpg", name: "MO231 - Pomeranian White", gender: "Đực", age: "02 tháng", price: "6.900.000" },
    { image: "/dog6.jpg", name: "MO231 - Pomeranian White", gender: "Đực", age: "02 tháng", price: "6.900.000" },
  ];

  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    const shuffled = [...itemList].sort(() => 0.5 - Math.random());
    setRandomItems(shuffled.slice(0, 4));
  }, []);

  if (randomItems.length === 0) return null; 
  return (
    <div className="w-full"> 
        <div className="font-beVietnam gap-[2px]">
            <p className="font-beVietnam font-bold text-[16px] opacity-100 leading-[24px]">
                Có gì mới ?
            </p>

            <p className="font-beVietnam font-bold text-[24px] opacity-100 leading-[36px] text-[#003459]">
                Xem thêm chó con
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
            {randomItems.map((item, index) => (
            <ItemCard key={index} item={item} />
            ))}
        </div>
    </div>


    
  );
}
