import { InfoBreadCrumb } from "./components/InfoBreadCrumb"
import { PiChatCircleDotsBold } from "react-icons/pi"
import { FiShare2 } from "react-icons/fi"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6"
import { FaTwitter } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa"

export const DetailInformation = ({ dogDetail }) => {
  return (
    <>
      <div className="flex flex-col gap-[18px] w-1/2">
        <InfoBreadCrumb />
        <div className="flex flex-col gap-[6px]">
          <p className="font-beVietnam font-bold text-[24px] leading-[36px] text-[#00171F]">
            {dogDetail && dogDetail.name}
          </p>
          <span className="font-beVietnam font-bold text-[20px] leading-[32px] text-[#002A48]">
            {dogDetail && dogDetail.price} ₫
          </span>
        </div>
        <div className="flex gap-[18px]">
          <button className="bg-[#003459] rounded-[57px] px-[28px] py-[12px] flex items-center justify-center gap-[10px] w-[111px] h-[44px]">
            <p className="font-beVietnam font-bold text-[16px] leading-[24px] tracking-[0%] align-bottom text-white">
              Liên hệ
            </p>
          </button>
          <button className="flex border-[2px] border-[#002A48] rounded-[57px] px-[28px] pl-[24px] py-[8px] gap-[10px] w-[210px] h-[44px] items-center justify-center">
            <PiChatCircleDotsBold className="w-[26px] h-[28px] text-[#002A48]" />
            <p className="font-beVietnam font-bold text-[16px] leading-[24px] tracking-[0%] align-bottom text-[#002A48]">
              Chat với 5Pets
            </p>
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex  py-[8px] border-b-[1px]">
            <div className="flex flex-row w-[194px] h-[26px] px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                Mã
              </p>
            </div>
            <div className="flex-1 flex-row px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                {dogDetail && dogDetail.name.split(" ").slice(-1)}
              </p>
            </div>
          </div>
          <div className="flex  py-[8px] border-b-[1px]">
            <div className="flex  w-[194px] h-[26px] px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                Giống
              </p>
            </div>
            <div className="flex-1  px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                {dogDetail && dogDetail.gender === "male" ? "Đực" : "Cái"}
              </p>
            </div>
          </div>
          <div className="flex  py-[8px] border-b-[1px]">
            <div className="flex  w-[194px] h-[26px] px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                Tuổi
              </p>
            </div>
            <div className="flex-1  px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                {dogDetail && dogDetail.age}
              </p>
            </div>
          </div>
          <div className="flex py-[8px] border-b-[1px]">
            <div className="flex w-[194px] h-[26px] px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                Màu sắc
              </p>
            </div>
            <div className="flex-1 px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                {dogDetail && dogDetail.color}
              </p>
            </div>
          </div>
          <div className="flex  py-[8px] border-b-[1px]">
            <div className="flex w-[194px] h-[26px] px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                Mô tả ngắn
              </p>
            </div>
            <div className="flex-1 px-[11px] gap-[10px] pt-[4px] pb-[2px]">
              <p className="font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                {dogDetail && dogDetail.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-[252px] h-[32px] gap-[21px] py-[6px] px-[10]">
          <div className="flex w-[82px] h-[20px] gap-[8px]">
            <FiShare2 className="w-[20px] h-[20px] text-[#002A48]" />
            <p className="font-beVietnam font-bold text-[14px] leading-[20px] tracking-[0%] align-bottom text-[#002A48]">
              Chia sẻ:
            </p>
          </div>
          <div className="flex w-[129px] h-[18.77px] justify-between">
            <FaFacebook className="w-[18.77px] h-[18.77px] text-[#99A2A5]" />
            <FaTwitter className="w-[18.77px] h-[18.77px] text-[#99A2A5]" />
            <FaInstagram className="w-[18.77px] h-[18.77px] text-[#99A2A5]" />
            <FaYoutube className="w-[18.77px] h-[18.77px] text-[#99A2A5]" />
          </div>
        </div>
      </div>
    </>
  )
}