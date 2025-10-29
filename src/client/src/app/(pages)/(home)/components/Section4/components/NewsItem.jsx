export const NewsItem = () => {
  return (
    <>
      <div className="shadow-2xl rounded-2xl p-2">
        <div className="w-full overflow-hidden mb-4">
          <img
            src="/news1.jpg"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
        <div className="px-2 pb-2">
          <div className="py-1 bg-[#00A7E7] rounded-[28px] text-white text-[10px] font-bold w-[111px] text-center mb-2.5">Kiến thức thú cưng</div>
          <div className="font-bold mb-1.5 text-[#00171F]">Pomeranian là gì? Cách nhận biết chó Pomeranian</div>
          <div className="text-sm text-[#242B33] line-clamp-3">Pomeranian hay còn gọi là chó Pomeranian (chó Pom) luôn nằm trong top những thú cưng dễ thương nhất. Không chỉ vậy, giống chó xiếc nhỏ nhắn, đáng yêu, thông minh, thân thiện và khéo léo.</div>
        </div>
      </div>
    </>
  )
}