import { ItemCard } from "@/app/(pages)/(client)/components/ItemCard/ItemCard";
import { SectionHeader } from "./components/SectionHeader";

export const Section2 = () => {
  const itemList = [
    {
      image: "/dog1.jpg",
      name: "MO231 - Pomeranian White",
      gender: "Đực",
      age: "02 tháng",
      price: "6.900.000"
    },
    {
      image: "/dog2.jpg",
      name: "MO231 - Pomeranian White",
      gender: "Cái",
      age: "02 tháng",
      price: "3.900.000"
    },
    {
      image: "/dog3.jpg",
      name: "MO102 - Poodle Tiny Sepia",
      gender: "Đực",
      age: "02 tháng",
      price: "4.000.000"
    },
    {
      image: "/dog4.jpg",
      name: "MO231 - Pomeranian White",
      gender: "Đực",
      age: "02 tháng",
      price: "6.900.000"
    },
    {
      image: "/dog5.jpg",
      name: "MO231 - Pomeranian White",
      gender: "Đực",
      age: "02 tháng",
      price: "6.900.000"
    },
    {
      image: "/dog6.jpg",
      name: "MO231 - Pomeranian White",
      gender: "Đực",
      age: "02 tháng",
      price: "6.900.000"
    },
  ]
  
  return (
    <>
      <div className="container mx-auto my-[60px]">
        <SectionHeader />
        <div className="grid grid-cols-4 gap-7">
          {itemList.map((item, index) => (
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