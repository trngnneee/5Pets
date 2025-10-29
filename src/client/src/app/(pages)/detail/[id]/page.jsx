import { DetailInformation } from "./components/detailInformation/detailInformation";
import { ImageSlider } from "./components/ImageSlider";

export default function Detail(){
  return (
    <>
      <div className="container mx-auto mt-[42px] mb-[60px]">
        <div className="flex gap-[30px]">
          <ImageSlider />
          <DetailInformation />
        </div>
      </div>
    </>
  );
}