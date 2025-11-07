import Link from "next/link"

export const NewsItem = ({ item }) => {
  return (
    <>
      <Link href={item.link} target="_blank" className="shadow-2xl rounded-2xl p-2 hover:scale-[1.02] transition-all duration-300 ease-in-out">
        <div className="w-full h-[200px] overflow-hidden mb-4">
          <img
            src={item.image}
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
        <div className="px-2 pb-2">
          <div className="py-1 bg-[#00A7E7] rounded-[28px] text-white text-[10px] font-bold w-[111px] text-center mb-2.5">Kiến thức thú cưng</div>
          <div className="font-bold mb-1.5 text-[#00171F]">{item.title}</div>
          <div className="text-sm text-[#242B33] line-clamp-3">{item.desc}</div>
        </div>
      </Link>
    </>
  )
}