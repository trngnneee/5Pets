import { NewsItem } from "./components/NewsItem";
import { SectionHeader } from "./components/SectionHeader";

export const Section4 = () => {
  const data = [
    {
      title: "Khi chó trung thành với bạn, nó nghĩ bạn là con chó đầu đàn",
      desc: "Con chó nghĩ đơn giản, khi nó thân thiện với bạn, nó nghĩ bạn là một con chó; khi nó trung thành với bạn, nó nghĩ bạn là con chó đầu đàn’ - nhà báo Hoàng Hải Vân nói",
      link: "https://tuoitre.vn/khi-cho-trung-thanh-voi-ban-no-nghi-ban-la-con-cho-dau-dan-20241022132917911.htm",
      image: "news2.jpg"
    },
    {
      title: "Chó Phốc sóc (Pomeranian): Nguồn gốc, đặc điểm, giá bán",
      desc: "Chó Pomeranian là loài cún dễ thương được nhiều người ưa thích trong thời gian gần đây. Nếu bạn đang muốn sở hữu một em cún Pomeranian (phốc sóc) thì hãy cùng với Bách hóa XANH theo dõi những thông tin thú vị về giống chó này dưới đây nhé!",
      link: "https://www.bachhoaxanh.com/kinh-nghiem-hay/tim-hieu-giong-cho-pomeranian-nguon-goc-dac-diem-cach-nuoi-bang-gia-1343922",
      image: "news1.jpg"
    },
    {
      title: "Những câu chuyện vô cùng cảm động về loài chó",
      desc: "Chú chó bị lạc tinh khôn tìm cách trở về với chủ, chó hiểu tiếng người, chó chết theo chủ... là những câu chuyện vô cùng cảm động về loài chó nuôi. Chú chó bị lạc tinh khôn tìm cách trở về với chủ, chó hiểu tiếng người, chó chết theo chủ... là những câu chuyện vô cùng cảm động về loài chó nuôi mà độc giả Nguyễn Hữu Huấn Số nhà 184 Mai Anh Tuấn, Ba Đình, Hà Nội chia sẻ.",
      link: "https://vietnamnet.vn/nhung-cau-chuyen-vo-cung-cam-dong-ve-loai-cho-117228.html",
      image: "dog3.jpg"
    }
  ]
  
  return (
    <div className="container mx-auto mb-[60px]">
      <SectionHeader/>
      <div className="grid grid-cols-3 gap-7">
        {data.map((item, index) => (
          <NewsItem
            key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}