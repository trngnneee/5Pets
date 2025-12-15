"use client"

import { ItemCard } from "@/app/(pages)/(client)/components/ItemCard/ItemCard";
import { Section3 } from "../../(home)/components/Section3/Section3";
import { Filter } from "./components/Filter";
import { SectionBreadcrumb } from "./components/SectionBreadcrumb";
import { SectionPagination } from "./components/SectionPagination";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { clientPetListByCategory } from "@/lib/clientAPI/pet";
import { ItemCardSkeleton } from "../../components/ItemCard/ItemCardSkeleton";

export default function CategoryPage() {
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender] = useState([]);
  const [color, setColor] = useState([]);
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      let params = "";
      if (currentPage) {
        params += `page=${currentPage}`;
      }
      if (gender.length > 0) {
        params += `&gender=${gender.join(",")}`;
      }
      if (color.length > 0) {
        params += `&color=${color.join(",")}`;
      }
      const promise = await clientPetListByCategory(id, params);
      if (promise.code == "success")
      {
        setData(promise.data.petList);
        setCategoryName(promise.data.categoryName);
        setTotalPages(promise.data.totalPages);
        setLoaded(true);
      }
    }
    fetchData();
  }, [currentPage, gender, color]);

  return (
    <>
      <SectionBreadcrumb
        id={id}
      />
      <Section3 />
      <div className="flex gap-5 container mx-auto mb-[60px] relative">
        <Filter
          gender={gender}
          setGender={setGender}
          color={color}
          setColor={setColor}
        />
        <div>
          <div className="font-bold text-[24px] text-[var(--main-color)] mb-3.5">{categoryName}</div>
          <div className="grid grid-cols-3 gap-5 mb-5">
            {(data.length > 0 && loaded) ? data.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
              />
            )) : (
              [...Array(9)].map((_, index) => (
                <ItemCardSkeleton key={index} />
              ))
            )}
          </div>
          {totalPages > 1 &&
            <SectionPagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        </div>
      </div>
    </>
  )
}