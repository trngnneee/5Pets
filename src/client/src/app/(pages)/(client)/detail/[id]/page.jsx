import { DetailInformation } from "./components/detailInformation/detailInformation";
import { ImageSlider } from "./components/ImageSlider";
import { OtherProducts } from "./components/ProductSection";

export default function Detail() {
  return (
    <>
      <div className="container mx-auto mt-[42px] mb-[60px] border-radius-[20px] gap-[20px]">
        <div className="flex w-full gap-[34px] opacity-100 border-[1px] rounded-[20px] pt-[22px] pr-[20px] pb-[22px] pl-[20px] mx-auto">
          <ImageSlider />
          <DetailInformation />
        </div>
        <div className="flex w-full mt-[20px]">
          <OtherProducts />
        </div>
      </div>
    </>
  );
}