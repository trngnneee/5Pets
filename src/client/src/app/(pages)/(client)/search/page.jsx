import { Suspense } from "react";
import { SearchContent } from "./components/MainContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10">Đang tải kết quả...</div>}>
      <SearchContent />
    </Suspense>
  );
}
