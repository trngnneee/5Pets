import { ExternalLink } from "lucide-react"

export const NewsItem = ({ item }) => {
  return (
    <>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col shadow-2xl rounded-2xl p-2 bg-white hover:scale-[1.02] transition-transform duration-300 ease-in-out outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <div className="w-full h-[200px] overflow-hidden mb-4 rounded-[10px] bg-muted">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-[10px] transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="px-2 pb-2 flex flex-col flex-1">
          <div className="py-1 px-3 bg-[var(--main-color)] rounded-[28px] text-white text-[10px] font-bold w-fit text-center mb-2.5">Kiến thức thú cưng</div>
          <h3 className="font-bold mb-1.5 text-[#00171F] group-hover:text-[var(--main-color)] transition-colors">{item.title}</h3>
          <p className="text-sm text-[#242B33] line-clamp-3">{item.desc}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--main-color)]">
            Đọc bài viết
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span className="sr-only">(mở trong tab mới)</span>
          </span>
        </div>
      </a>
    </>
  )
}
