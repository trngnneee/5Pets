"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export const ImageSlider = ({ dogDetail }) => {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageList = dogDetail?.imageList || [];
  const total = imageList.length;

  // Ảnh lớn do state riêng điều khiển; carousel bên dưới chỉ để cuộn thumbnail

  const goTo = (index) => {
    if (total === 0) return;
    const next = (index + total) % total;
    setCurrentIndex(next);
    api?.scrollTo(next);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(currentIndex - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(currentIndex + 1);
    }
  };

  const navButtonClass = "absolute top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/90 text-[var(--main-color)] shadow-md transition hover:bg-white outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

  return (
    <>
      <div className="w-1/2 max-lg:w-full min-w-0">
        <div
          className="relative overflow-hidden rounded-[10px] bg-muted"
          role="group"
          aria-roledescription="carousel"
          aria-label={`Ảnh của ${dogDetail?.name || "thú cưng"}`}
          onKeyDown={handleKeyDown}
        >
          {total > 0 && (
            <img
              key={currentIndex}
              src={imageList[currentIndex]}
              alt={`${dogDetail.name} - ảnh ${currentIndex + 1}`}
              className="w-full h-[476px] max-md:h-[320px] object-cover rounded-[10px] animate-in fade-in duration-300"
            />
          )}
          {total > 1 && (
            <>
              <button type="button" onClick={() => goTo(currentIndex - 1)} aria-label="Ảnh trước" className={cn(navButtonClass, "left-3")}>
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => goTo(currentIndex + 1)} aria-label="Ảnh sau" className={cn(navButtonClass, "right-3")}>
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        <div className="text-muted-foreground py-2 text-center text-sm tabular-nums" aria-live="polite">
          Ảnh {total > 0 ? currentIndex + 1 : 0} của {total}
        </div>
        {total > 1 && (
          <Carousel
            className="mt-3"
            opts={{
              align: "start",
              dragFree: true,
              containScroll: "trimSnaps",
            }}
            setApi={setApi}
          >
            <CarouselContent className="-ml-2">
              {imageList.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 basis-1/4 sm:basis-1/5"
                >
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Xem ảnh ${index + 1}`}
                    aria-current={currentIndex === index ? "true" : undefined}
                    className={cn(
                      "block w-full overflow-hidden rounded-[10px] border-2 transition outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      currentIndex === index
                        ? "border-[var(--main-color)]"
                        : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img
                      src={item}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[100px] max-md:h-[72px] object-cover rounded-[8px]"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="max-md:hidden" />
            <CarouselNext className="max-md:hidden" />
          </Carousel>
        )}
      </div>
    </>
  )
}
