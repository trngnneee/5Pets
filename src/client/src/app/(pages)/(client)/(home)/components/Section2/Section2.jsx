"use client"

import { ItemCard } from "@/app/(pages)/(client)/components/ItemCard/ItemCard";
import { SectionHeader } from "./components/SectionHeader";
import { useEffect, useState } from "react";
import { clientPetList } from "@/lib/clientAPI/pet";
import { ItemCardSkeleton } from "../../../components/ItemCard/ItemCardSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

export const Section2 = () => {
  const [petList, setPetList] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const promise = await clientPetList('8', true);
        setPetList(promise.data || []);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    fetchData();
  }, [reloadKey])

  return (
    <>
      <section id="section2" className="container mx-auto my-[60px] scroll-mt-6">
        <SectionHeader />
        {status === "error" ? (
          <EmptyState
            icon={PawPrint}
            title="Không tải được danh sách thú cưng"
            description="Có lỗi kết nối tới máy chủ. Bạn thử tải lại nhé."
            action={
              <Button onClick={() => setReloadKey((k) => k + 1)} className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-[57px] px-7">
                Thử lại
              </Button>
            }
          />
        ) : status === "ready" && petList.length === 0 ? (
          <EmptyState
            icon={PawPrint}
            title="Chưa có thú cưng nào"
            description="Các bé thú cưng mới sẽ sớm được cập nhật."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7" data-aos="fade-up" aria-busy={status === "loading"}>
            {status === "ready" ? petList.map((item, index) => (
              <ItemCard
                key={item.id || index}
                item={item}
              />
            )) : (
              [...Array(8)].map((_, index) => (
                <ItemCardSkeleton key={index} />
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
}
