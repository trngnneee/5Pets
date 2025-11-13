"use client"

import { useParams } from "next/navigation";
import { DetailInformation } from "./components/detailInformation/detailInformation";
import { ImageSlider } from "./ImageSlider/ImageSlider";
import { OtherProducts } from "./components/ProductSection";
import { useEffect, useState } from "react";
import { clientPetDetail } from "@/lib/clientAPI/pet";
import { DetailInformationSkeleton } from "./components/detailInformation/detailInformationSkeleton";
import { ImageSliderSkeleton } from "./ImageSlider/ImageSliderSkeleton";

export default function Detail() {
  const [dogDetail, setDogDetail] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      const promise = await clientPetDetail(id);
      if (promise.code == "success")
      {
        setDogDetail(promise.data);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <div className="container mx-auto mt-[42px] mb-[60px] border-radius-[20px] gap-5">
        <div className="flex gap-[100px]">
          {dogDetail ? <ImageSlider dogDetail={dogDetail} /> : <ImageSliderSkeleton />}
          {dogDetail ? <DetailInformation dogDetail={dogDetail} /> : <DetailInformationSkeleton />}
        </div>
        <div className="flex w-full mt-5]">
          <OtherProducts />
        </div>
      </div>
    </>
  );
}