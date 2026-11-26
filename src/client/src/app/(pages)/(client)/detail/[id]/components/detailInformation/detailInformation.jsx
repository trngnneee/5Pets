"use client"

import { InfoBreadCrumb } from "./components/InfoBreadCrumb"
import { PiChatCircleDotsBold } from "react-icons/pi"
import { FiShare2 } from "react-icons/fi"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CircleAlertIcon, Link2, ShoppingCart } from "lucide-react"
import { addItemToCart } from "@/helper/cartHelper"
import { openChatbot } from "@/helper/chatbotHelper"
import { useSyncExternalStore } from "react"
import { toast } from "sonner"

const noopSubscribe = () => () => {};

export const DetailInformation = ({ dogDetail }) => {
  const pageUrl = useSyncExternalStore(noopSubscribe, () => window.location.href, () => "");

  const infoList = [
    { label: "Mã", value: dogDetail.name.split(" ").slice(-1) },
    { label: "Giống", value: dogDetail.gender === "male" ? "Đực" : "Cái" },
    { label: "Tuổi", value: dogDetail.age },
    { label: "Màu sắc", value: dogDetail.color },
    { label: "Mô tả ngắn", value: dogDetail.description },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl || window.location.href);
      toast.success("Đã sao chép liên kết");
    } catch {
      toast.error("Không sao chép được, bạn hãy copy từ thanh địa chỉ nhé");
    }
  };

  const encodedUrl = encodeURIComponent(pageUrl);
  const shareLinkClass = "rounded-full p-1 text-[#99A2A5] transition-colors hover:text-[var(--main-color)] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

  return (
    <>
      <div className="flex flex-col gap-[18px] w-1/2 max-lg:w-full min-w-0">
        <InfoBreadCrumb />
        <div className="flex flex-col gap-[6px]">
          <h1 className="font-beVietnam font-bold text-[24px] leading-[36px] text-[#00171F]">
            {dogDetail.name}
          </h1>
          <span className="font-beVietnam font-bold text-[20px] leading-[32px] text-[var(--main-color)] tabular-nums">
            {Number(dogDetail.price || 0).toLocaleString("vi-VN")} VND
          </span>
        </div>
        <div className="flex flex-wrap gap-[18px] max-sm:gap-3">
          <AlertDialog>
            <AlertDialogTrigger
              asChild
            >
              <Button className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] rounded-full max-md:h-11 max-md:px-5">
                <ShoppingCart aria-hidden="true" />
                <span>Thêm vào giỏ hàng</span>
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <CircleAlertIcon className="opacity-80" size={16} />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận thêm vào giỏ hàng?</AlertDialogTitle>
                  <AlertDialogDescription>{dogDetail.name} sẽ được thêm vào giỏ hàng của bạn</AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={() => addItemToCart(dogDetail.id)}>Xác nhận</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            type="button"
            onClick={() => openChatbot(`Mình muốn được tư vấn thêm về ${dogDetail.name}`)}
            className="flex border-1 border-[var(--main-color)] rounded-full bg-white hover:bg-gray-100 shadow-none max-md:h-11 max-md:px-5"
          >
            <PiChatCircleDotsBold className="w-[26px] h-[28px] text-[var(--main-color)]" aria-hidden="true" />
            <span className="font-beVietnam font-bold text-[16px] leading-[24px] tracking-[0%] align-bottom text-[var(--main-color)]">
              Chat với 5Pets
            </span>
          </Button>
        </div>
        <dl className="flex flex-col">
          {infoList.map((info) => (
            <div key={info.label} className="flex py-[8px] border-b-[1px]">
              <dt className="w-[194px] max-sm:w-[110px] shrink-0 px-[11px] pt-[4px] pb-[2px] font-beVietnam font-medium text-[14px] leading-[20px] text-[#667479]">
                {info.label}
              </dt>
              <dd className="flex-1 min-w-0 px-[11px] pt-[4px] pb-[2px] font-beVietnam font-medium text-[14px] leading-[20px] text-[#00171F] whitespace-pre-line break-words">
                {info.value || "—"}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center gap-[21px] py-[6px]">
          <div className="flex items-center gap-[8px]">
            <FiShare2 className="w-[20px] h-[20px] text-[var(--main-color)]" aria-hidden="true" />
            <p className="font-beVietnam font-bold text-[14px] leading-[20px] tracking-[0%] text-[var(--main-color)]">
              Chia sẻ:
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chia sẻ lên Facebook (mở trong tab mới)"
              title="Chia sẻ lên Facebook"
              className={shareLinkClass}
            >
              <FaFacebook className="w-[18.77px] h-[18.77px]" aria-hidden="true" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(dogDetail.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chia sẻ lên Twitter (mở trong tab mới)"
              title="Chia sẻ lên Twitter"
              className={shareLinkClass}
            >
              <FaTwitter className="w-[18.77px] h-[18.77px]" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Sao chép liên kết"
              title="Sao chép liên kết"
              className={shareLinkClass}
            >
              <Link2 className="w-[18.77px] h-[18.77px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
