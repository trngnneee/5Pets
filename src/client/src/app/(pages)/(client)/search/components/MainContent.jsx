"use client"

import { clientPetSearch } from "@/lib/clientAPI/pet";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link";
import { ItemCardSkeleton } from "../../components/ItemCard/ItemCardSkeleton";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { featuredCategoryId } from "@/config/variable";
import { SearchX } from "lucide-react";

export const SearchContent = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword")?.trim() || "";
  const [petList, setPetList] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!keyword) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      // Tìm từ khóa mới thì hiện lại skeleton, không giữ kết quả cũ
      setStatus("loading");
      try {
        const promise = await clientPetSearch(keyword);
        setPetList(promise.code === "success" ? promise.data || [] : []);
        setStatus("ready");
      } catch {
        setPetList([]);
        setStatus("error");
      }
    };

    fetchData();
  }, [keyword, reloadKey]);

  return (
    <div className="container mx-auto mb-[60px]">
      <div className="flex justify-between items-end gap-4 my-7 flex-wrap">
        <div className="min-w-0">
          <div className="font-medium">Kết quả tìm kiếm</div>
          <h1 className="text-[24px] font-bold text-[#003459] break-words">
            Tìm kiếm cho: <span>&ldquo;{keyword}&rdquo;</span>
          </h1>
        </div>
        {status === "ready" && petList.length > 0 && (
          <p className="text-sm text-[#667479]" aria-live="polite">
            Tìm thấy <span className="font-bold text-[#00171F] tabular-nums">{petList.length}</span> thú cưng
          </p>
        )}
      </div>

      {status === "ready" && petList.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Không tìm thấy kết quả phù hợp"
          description={`Không có thú cưng nào khớp với “${keyword}”. Thử từ khóa ngắn hơn hoặc tên giống, ví dụ: Poodle, Corgi, Mèo Anh.`}
          action={
            <Button asChild className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-[57px] px-7">
              <Link href={`/category/${featuredCategoryId}`}>Xem tất cả thú cưng</Link>
            </Button>
          }
        />
      ) : status === "error" ? (
        <EmptyState
          icon={SearchX}
          title="Không thể tìm kiếm lúc này"
          description="Có lỗi kết nối tới máy chủ. Bạn thử lại sau ít phút nhé."
          action={
            <Button onClick={() => setReloadKey((k) => k + 1)} className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-[57px] px-7">
              Thử lại
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]" aria-busy={status === "loading"}>
          {status === "loading" ? (
            [...Array(8)].map((_, index) => (
              <ItemCardSkeleton key={index} />
            ))
          ) : (
            petList.map((item, index) => (
              <ItemCard key={item.id || index} item={item} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
