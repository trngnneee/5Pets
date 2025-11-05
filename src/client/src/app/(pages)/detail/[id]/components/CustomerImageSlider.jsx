"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"

export const CustomerSlider = () => {
  const [api, setApi] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const imgSlide = [
    "/detail1.jpg",
    "/detail2.jpg",
    "/detail3.jpg",
    "/detail4.jpg",
    "/detail5.jpg",
    "/detail1.jpg",
    "/detail2.jpg",
  ]

  // Hàm chuyển đến slide index
  const goToSlide = (index) => {
    if (!api) return
    api.scrollTo(index)
  }

  useEffect(() => {
    if (!api) return
    setCurrentIndex(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap())
    })
  }, [api])

  return (
    
    <div className="w-full">
        <div className="font-beVietnam font-bold text-[24px] opacity-100 leading-[32px] text-[#003459]">
            Khách hàng của chúng tôi
        </div>

        <Carousel className="mt-3" opts={{ align: "start", loop: true }} setApi={setApi}>
            <CarouselContent className="-ml-2">
            {imgSlide.map((item, index) => (
                <CarouselItem
                key={index}
                className="pl-2 basis-[20%] cursor-pointer"
                onClick={() => goToSlide(index)}
                >
                <div
                    className={`w-full overflow-hidden rounded-[10px] border-2 ${
                    currentIndex === index ? "border-blue-600" : "border-transparent"
                    }`}
                >
                    <img
                    src={item}
                    className="w-full h-[377px] object-cover rounded-[10px]"
                    />
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
        </Carousel>

      {/* Chấm tròn điều hướng */}
      <div className="flex justify-center gap-2 mt-2">
        {imgSlide.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
