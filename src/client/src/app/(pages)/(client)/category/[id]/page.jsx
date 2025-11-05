import { ItemCard } from "@/app/(pages)/(client)/components/ItemCard/ItemCard";
import { Section3 } from "../../(home)/components/Section3/Section3";
import { Filter } from "./components/Filter";
import { SectionBreadcrumb } from "./components/SectionBreadcrumb";
import { SectionPagination } from "./components/SectionPagination";

export default function CategoryPage() {
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
      <SectionBreadcrumb />
      <Section3 />
      <div className="flex gap-5 container mx-auto mb-[60px] relative">
        <Filter />
        <div>
          <div className="font-bold text-[24px] text-[#003459] mb-3.5">Chó Nhỏ</div>
          <div className="grid grid-cols-3 gap-5 mb-5">
            {itemList.map((item, index) => (
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