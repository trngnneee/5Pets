import { Suspense } from "react";
import { SearchContent } from "./components/MainContent";
import { ItemCardSkeleton } from "../components/ItemCard/ItemCardSkeleton";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto my-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]">
          {[...Array(8)].map((_, index) => (
            <ItemCardSkeleton key={index} />
          ))}
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
