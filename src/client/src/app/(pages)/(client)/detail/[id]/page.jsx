"use client"

import { useParams } from "next/navigation";
import Link from "next/link";
import { DetailInformation } from "./components/detailInformation/detailInformation";
import { ImageSlider } from "./ImageSlider/ImageSlider";
import { OtherProducts } from "./components/ProductSection";
import { useEffect, useState } from "react";
import { clientPetDetail } from "@/lib/clientAPI/pet";
import { DetailInformationSkeleton } from "./components/detailInformation/detailInformationSkeleton";
import { ImageSliderSkeleton } from "./ImageSlider/ImageSliderSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

export default function Detail() {
  const [dogDetail, setDogDetail] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const promise = await clientPetDetail(id);
        setDogDetail(promise.data);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    fetchData();
  }, [id])

  return (
    <>
      <div className="container mx-auto mt-[42px] max-md:mt-6 mb-[60px]">
        {status === "error" ? (
          <EmptyState
            icon={PawPrint}
            title="Không tìm thấy thú cưng"
            description="Bé này có thể đã có chủ mới hoặc đường dẫn không còn đúng."
            action={
              <Button asChild className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-[57px] px-7">
                <Link href="/">Về trang chủ</Link>
              </Button>
            }
          />
        ) : (
          <div className="flex max-lg:flex-col gap-[100px] max-xl:gap-12 max-lg:gap-8">
            {status === "ready" ? <ImageSlider key={dogDetail.id} dogDetail={dogDetail} /> : <ImageSliderSkeleton />}
            {status === "ready" ? <DetailInformation dogDetail={dogDetail} /> : <DetailInformationSkeleton />}
          </div>
        )}
        <div className="flex w-full mt-5">
          <OtherProducts currentId={id} />
        </div>
      </div>
    </>
  );
}
