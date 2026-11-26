"use client"

import { ItemCard } from "@/app/(pages)/(client)/components/ItemCard/ItemCard";
import { Section3 } from "../../(home)/components/Section3/Section3";
import { Filter } from "./components/Filter";
import { SectionBreadcrumb } from "./components/SectionBreadcrumb";
import { SectionPagination } from "./components/SectionPagination";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { clientPetListByCategory } from "@/lib/clientAPI/pet";
import { ItemCardSkeleton } from "../../components/ItemCard/ItemCardSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { PawPrint, SearchX } from "lucide-react";

export default function CategoryPage() {
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender] = useState([]);
  const [color, setColor] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);
  const { id } = useParams();
  const resultsRef = useRef(null);

  const hasFilter = gender.length > 0 || color.length > 0;

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
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
      try {
        const promise = await clientPetListByCategory(id, params);
        setData(promise.data.petList || []);
        setCategoryName(promise.data.categoryName);
        setTotalPages(promise.data.totalPages || 1);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    fetchData();
  }, [id, currentPage, gender, color, reloadKey]);

  // Đổi bộ lọc thì quay về trang 1 để không rơi vào trang rỗng
  const handleGenderChange = (value) => {
    setGender(value);
    setCurrentPage(1);
  };

  const handleColorChange = (value) => {
    setColor(value);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setGender([]);
    setColor([]);
    setCurrentPage(1);
  };

  const handlePageChange = (updater) => {
    setCurrentPage(updater);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SectionBreadcrumb
        id={id}
      />
      <Section3 />
      <div className="flex max-lg:flex-col gap-5 container mx-auto mb-[60px] relative">
        <Filter
          gender={gender}
          setGender={handleGenderChange}
          color={color}
          setColor={handleColorChange}
          onClear={handleClearFilter}
        />
        <div ref={resultsRef} className="flex-1 min-w-0 scroll-mt-6">
          <h1 className="font-bold text-[24px] text-[var(--main-color)] mb-3.5 min-h-9">{categoryName}</h1>
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
          ) : status === "ready" && data.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title={hasFilter ? "Không có thú cưng phù hợp bộ lọc" : "Danh mục này chưa có thú cưng"}
              description={hasFilter ? "Thử bỏ bớt điều kiện lọc để xem thêm kết quả." : "Các bé mới sẽ sớm được cập nhật, bạn quay lại sau nhé."}
              action={hasFilter && (
                <Button onClick={handleClearFilter} className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-[57px] px-7">
                  Xóa bộ lọc
                </Button>
              )}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-5" aria-busy={status === "loading"}>
              {status === "ready" ? data.map((item, index) => (
                <ItemCard
                  key={item.id || index}
                  item={item}
                />
              )) : (
                [...Array(9)].map((_, index) => (
                  <ItemCardSkeleton key={index} />
                ))
              )}
            </div>
          )}
          {totalPages > 1 && status !== "error" &&
            <SectionPagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          }
        </div>
      </div>
    </>
  )
}
