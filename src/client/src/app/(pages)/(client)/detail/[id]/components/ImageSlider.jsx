"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"

export const ImageSlider = () => {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imgSlide = [
    "/detail1.jpg",
    "/detail2.jpg",
    "/detail3.jpg",
    "/detail4.jpg",
    "/detail5.jpg",
    "/detail1.jpg",
    "/detail2.jpg",
  ]

  useEffect(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api])

  return (
    <>
      <div className="w-1/2">
        <div className="overflow-hidden rounded-[10px]">
          <img
            src={imgSlide[currentIndex]}
            className="w-full h-[476px] object-cover"
          />

          <div className="text-muted-foreground py-2 text-center text-sm">
            Image {currentIndex + 1} of {imgSlide.length}
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
            {imgSlide.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-1/5"
                onClick={() => api?.scrollTo(index)}
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