"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"

export const ImageSlider = ({ dogDetail }) => {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api, dogDetail])

  return (
    <>
      <div className="w-1/2">
        <div className="overflow-hidden rounded-[10px]">
          <img
            src={dogDetail && dogDetail.imageList[currentIndex]}
            className="w-full h-[476px] object-cover rounded-[10px]"
          />
          <div className="text-muted-foreground py-2 text-center text-sm">
            Ảnh {currentIndex + 1} của {dogDetail && dogDetail.imageList.length || 0}
          </div>
        </div>
        <Carousel
          className="mt-3"
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-2">
            {dogDetail && dogDetail.imageList.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2"
                onClick={() => api?.scrollTo(index)}
                style={{
                  flexBasis: `${100 / Math.min(dogDetail.imageList.length - 1, 5)}%`,
                }}
              >
                <div className="w-full overflow-hidden rounded-[10px]">
                  <img
                    src={item}
                    className="w-full h-[100px] object-cover rounded-[10px]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}