import numpy as np
import re

def normalize_price(price_str):
    """Chuẩn hóa giá tiền từ chuỗi 'X.XXX.XXX ₫' thành số nguyên."""
    if isinstance(price_str, str):
        return int(re.sub(r'[^\d]', '', price_str))
    return 0

def normalize_cat_data(raw_data):
    """Chuẩn hóa dữ liệu mèo thô."""
    normalized_pets = []
    
    # Định nghĩa các mối quan hệ (ví dụ: Mèo Anh lông dài = British Longhair)
    breed_map = {
        "Mèo anh lông dài": "British Longhair",
        "Mèo Anh lông dài chân lùn tai cụp": "British Longhair / Scottish Fold"
    }
    
    for title, pet_info in raw_data.items():
        info = pet_info.get("more_information", {})
        
        # Trích xuất từ more_information
        month_age_str = info.get("Tháng tuổi: 2 tháng tuổi", "").split(":")[1].strip().replace("tháng tuổi", "").strip()
        # Cập nhật key để trích xuất đúng tháng tuổi cho entry 2
        if title == "Mèo anh lông dài chân lùn màu blue golden mã ALD4117":
             month_age_str = info.get("Tháng tuổi: 3 tháng tuổi", "").split(":")[1].strip().replace("tháng tuổi", "").strip()
             
        gender_str = info.get("Giới tính: Đực", "").split(":")[1].strip()
        color_str = info.get("Màu: Trắng đuôi xám", "").split(":")[1].strip()
        
        # Trích xuất từ description (tính cách/đặc điểm)
        description_text = " ".join(pet_info.get("description", []))
        
        # Mapping tính cách/đặc điểm sang chỉ số (1: Thấp, 3: Cao)
        # Đặc điểm chung của Mèo Anh Lông Dài/Tai Cụp:
        
        normalized_data = {
            "title": title,
            "species": "Mèo",
            "breed": breed_map.get(pet_info.get("category", ""), pet_info.get("category", "")),
            "gender": "Đực" if "Đực" in gender_str else "Cái",
            "coat_color": color_str,
            "age_months": int(month_age_str) if month_age_str.isdigit() else 2, 
            "price": normalize_price(pet_info.get("price")),
            
            # Tính cách/Lối sống (Gán cố định theo giống mèo)
            "activity_level": 1,  # Thấp (thích nằm, cuộn mình)
            "grooming_needs": 3,  # CAO (Lông dài, cần chải chuốt thường xuyên)
            "independence_level": 2,  # Trung bình (Quấn chủ nhưng không bằng chó)
            "space_required": 1,  # Thấp (Phù hợp chung cư)
            "beginner_friendly": 3, # Cao (Rất dễ nuôi, không cần huấn luyện phức tạp)
            "personality_keywords": ["đáng yêu", "sang trọng", "ngoan ngoãn", "tình cảm", "hiền lành", "bình yên", "nhẹ nhàng"]
        }
        normalized_pets.append(normalized_data)
        
    return normalized_pets

def normalize_dog_data(raw_data):
    """Chuẩn hóa dữ liệu thô thành cấu trúc Pet Profile."""
    normalized_pets = []
    
    # Định nghĩa các mối quan hệ (ví dụ: Chó Phốc sóc = Pomeranian)
    breed_map = {
        "Chó phốc sóc": "Pomeranian",
        "Chó Phốc sóc mini": "Pomeranian"
        # Thêm các giống khác nếu có
    }
    
    for title, pet_info in raw_data.items():
        # Trích xuất từ more_information
        info = pet_info.get("more_information", {})
        month_age_str = info.get("Tháng tuổi: 2 tháng tuổi", "").split(":")[1].strip().replace("tháng tuổi", "").strip()
        gender_str = info.get("Giới tính: Cái", "").split(":")[1].strip()
        color_str = info.get("Màu: Vàng cam", "").split(":")[1].strip()
        health_str = info.get("Sức khỏe: Nhanh nhẹn, ăn uống tốt", "").split(":")[1].strip()
        
        # Trích xuất từ description (tính cách/đặc điểm)
        description_text = " ".join(pet_info.get("description", []))
        
        # Mapping tính cách/đặc điểm sang chỉ số (1=Thấp, 3=Cao)
        # Vì đây là Phốc Sóc/Pomeranian, ta mặc định các chỉ số của giống chó này
        # Lưu ý: Cần điều chỉnh khi thêm các giống khác
        
        normalized_data = {
            "title": title,
            "species": "Chó",
            "breed": breed_map.get(pet_info.get("category", ""), pet_info.get("category", "")),
            "gender": "Đực" if "Đực" in gender_str else "Cái",
            "coat_color": color_str,
            "age_months": int(month_age_str) if month_age_str.isdigit() else 2, # Mặc định 2 tháng nếu không trích xuất được
            "price": normalize_price(pet_info.get("price")),
            
            # Tính cách/Lối sống (Gán cố định theo giống chó)
            "activity_level": 3,  # Cao (Phốc sóc rất năng động)
            "grooming_needs": 3,  # Cao (Lông xù cần chăm sóc)
            "independence_level": 1,  # Thấp (Rất quấn chủ, không thích ở một mình)
            "space_required": 1,  # Thấp (Mini, phù hợp chung cư)
            "beginner_friendly": 2, # Trung bình (Khó huấn luyện hơn Golden/Lab)
            "health_status": health_str,
            "personality_keywords": ["kiêu kỳ", "tinh nghịch", "thân thiện", "tình cảm", "lanh lợi", "thông minh", "hoạt bát"]
        }
        normalized_pets.append(normalized_data)
        
    return normalized_pets

RAW_DOG_DATA = {
  "Chó Phốc sóc mini màu vàng cam mã PS4131": {
    "title": "Chó Phốc sóc mini màu vàng cam mã PS4131",
    "category": "Chó phốc sóc",
    "description": ["Chó Phốc sóc mini màu vàng cam mã PS4131nổi bật với vẻ ngoài nhỏ nhắn nhưng vô cùng kiêu kỳ, như một chú sư tử con thu nhỏ. Toàn thân được bao phủ bởi lớp lông dày, bông xù và mềm mượt, mang sắc vàng cam rực rỡ, càng thêm nổi bật dưới ánh nắng. Khuôn mặt tròn xinh, mũi nhỏ đen nhánh, đôi mắt đen long lanh và tai nhỏ dựng đứng tạo nên vẻ lanh lợi, thông minh. Thân hình gọn gàng, chân ngắn, đuôi cong phủ lông xù vắt gọn trên lưng khiến chúng trông như một quả cầu lửa di động. Phốc sóc mini vàng cam không chỉ đẹp mà còn rất tinh nghịch, thân thiện và tình cảm, luôn thích được bồng bế, vuốt ve và là “ngôi sao nhỏ” trong mọi ánh nhìn.", "Quyền lợi có được khi muaChó Phốc sóc mini màu vàng cam mã PS4131tại Pet House", "Bảo hành thuần chủng trọn đời.", "Bảo hành bệnh truyền nhiễm nguy hiểm ở chó là Care và Parvo 7 ngày đầu về nhà mới. Ngoài ra, quý khách có thể mua thêm gói bảo hiểm sức khỏe 1 năm nếu có nhu cầu. (Thú cưng là động vật sống, nhạy cảm với môi trường sống, thức ăn… bởi vậy hãy chăm sóc theo hướng dẫn của PetHouse hướng dẫn nhé)", "Miễn phí vận chuyển toàn quốc (đối với tàu hỏa và xe khách, taxi) – hỗ trợ 50-80% chi phí vận chuyển máy bay.", "Tặng kèm phụ kiện cho thú cưng gồm: Dây dắt cún, Vòng cổ, Bát ăn, Bình nước thông minh, Đồ chơi, Lược chải cho bé, Túi vận chuyển cho thú cảnh nhỏ.", "Giấy tờ đi kèm: Sổ theo dõi sức khoẻ (sổ tiêm phòng vacxin), hợp đồng mua bán, hướng dẫn chăm sóc, giấy chứng nhận nguồn gốc của trại cung cấp, thiệp cảm ơn.", "Giảm giá 10% cho các lần mua thú cưng tiếp theo.", "Giảm 20% cho các dịch vụ Spa cắt tỉa trọn đời, giảm 10% dịch vụ trông giữ cún tại cửa hàng. Giảm 5% mua phụ kiện trọn đời.", "Hỗ trợ bảo hiểm sức khỏe 1.000.000 Vnđ (trong trường hợp cún bị ốm và trong thời gian bảo hành theo điều khoản trong hợp đồng mua bán.)", "Tặng quà tặng trị giá 500.000 Vnđ khi giới thiệu bạn bè mua thú cưng tại Pet House. (Có thể quy đổi thành tiền mặt)", "Nói không với chó tàu bệnh, chó thải loại.", "Đồng hành cùng khách chăm sóc cún trọn đời.", "Hỗ trợ thu mua thú cưng khi sinh sản ra đời con với giá tốt nhất."],
    "price": "8.500.000 ₫",
    "more_information": {"Tháng tuổi: 2 tháng tuổi": "Bố: Nhím", "Giới tính: Cái": "Mẹ: Bông", "Màu: Vàng cam": "Sức khỏe: Nhanh nhẹn, ăn uống tốt", "Tình trạng: Có Sẵn": "Vận chuyển: Miễn phí", "Tẩy giun: 1 lần": "Tiêm phòng: 1 mũi vacxin", "Nguồn gốc: Thuần chủng, sinh sản tại Trại Pethouse": "Đặc điểm: Nhỏ gọn"},
    "link_image_file": ["https://pethouse.com.vn/wp-content/uploads/2025/10/cho-phoc-soc-mini-mau-vang-cam-ma-PS4131.jpg", "https://pethouse.com.vn/wp-content/uploads/2025/10/cho-phoc-soc-mini-mau-vang-cam-ma-PS4131.jpg"]
  },
  "Chó Pomeranian vip màu vàng mini mã PS4130": {
    "title": "Chó Pomeranian vip màu vàng mini mã PS4130",
    "category": "Chó phốc sóc",
    "description": ["Chó Pomeranian vip màu vàng mini mã PS4130có vẻ ngoài nhỏ nhắn, rực rỡ và vô cùng đáng yêu, như một quả cầu lông vàng óng. Toàn thân được bao phủ bởi lớp lông dày, xù và mềm mịn, với gam vàng tươi hoặc vàng kem tỏa sáng dưới ánh nắng, khiến chúng trông lúc nào cũng nổi bật và đáng yêu. Khuôn mặt nhỏ xinh, mũi đen, đôi mắt tròn long lanh cùng đôi tai tam giác nhỏ dựng đứng tạo nên biểu cảm tinh nghịch và thông minh. Thân hình nhỏ gọn, dáng đi nhanh nhẹn, đuôi lông xù cong lên lưng càng làm tăng nét duyên dáng. Pomeranian vàng không chỉ đẹp mà còn rất hoạt bát, thân thiện và lanh lợi, luôn thích được chơi đùa, chạy nhảy và là nguồn năng lượng vui vẻ cho mọi người xung quanh.", "Quyền lợi có được khi muaChó Pomeranian mini màu vàng mã PS4130tại Pet House", "Bảo hành thuần chủng trọn đời.", "Bảo hành bệnh truyền nhiễm nguy hiểm ở chó là Care và Parvo 7 ngày đầu về nhà mới. Ngoài ra, quý khách có thể mua thêm gói bảo hiểm sức khỏe 1 năm nếu có nhu cầu. (Thú cưng là động vật sống, nhạy cảm với môi trường sống, thức ăn… bởi vậy hãy chăm sóc theo hướng dẫn của PetHouse hướng dẫn nhé)", "Miễn phí vận chuyển toàn quốc (đối với tàu hỏa và xe khách, taxi) – hỗ trợ 50-80% chi phí vận chuyển máy bay.", "Tặng kèm phụ kiện cho thú cưng gồm: Dây dắt cún, Vòng cổ, Bát ăn, Bình nước thông minh, Đồ chơi, Lược chải cho bé, Túi vận chuyển cho thú cảnh nhỏ.", "Giấy tờ đi kèm: Sổ theo dõi sức khoẻ (sổ tiêm phòng vacxin), hợp đồng mua bán, hướng dẫn chăm sóc, giấy chứng nhận nguồn gốc của trại cung cấp, thiệp cảm ơn.", "Giảm giá 10% cho các lần mua thú cưng tiếp theo.", "Giảm 20% cho các dịch vụ Spa cắt tỉa trọn đời, giảm 10% dịch vụ trông giữ cún tại cửa hàng. Giảm 5% mua phụ kiện trọn đời.", "Hỗ trợ bảo hiểm sức khỏe 1.000.000 Vnđ (trong trường hợp cún bị ốm và trong thời gian bảo hành theo điều khoản trong hợp đồng mua bán.)", "Tặng quà tặng trị giá 500.000 Vnđ khi giới thiệu bạn bè mua thú cưng tại Pet House. (Có thể quy đổi thành tiền mặt)", "Nói không với chó tàu bệnh, chó thải loại.", "Đồng hành cùng khách chăm sóc cún trọn đời.", "Hỗ trợ thu mua thú cưng khi sinh sản ra đời con với giá tốt nhất."],
    "price": "15.000.000 ₫",
    "more_information": {"Tháng tuổi: 2 tháng tuổi": "Bố: Mi", "Giới tính: Đực": "Mẹ: Cun", "Màu: Vàng": "Sức khỏe: Nhanh nhẹn, ăn uống tốt", "Tình trạng: Có Sẵn": "Vận chuyển: Miễn phí", "Tẩy giun: 1 lần": "Tiêm phòng: 1 mũi vacxin", "Nguồn gốc: Thuần chủng, sinh sản tại Trại Pethouse": "Đặc điểm: Nhỏ gọn"},
    "link_image_file": ["https://pethouse.com.vn/wp-content/uploads/2025/10/cho-phoc-soc-pomeranian-ma-PS4130.jpg", "https://pethouse.com.vn/wp-content/uploads/2025/10/cho-phoc-soc-vip-ma-PS4130.jpg", "https://pethouse.com.vn/wp-content/uploads/2025/10/cho-phoc-soc-ma-PS4130.jpg"]
  }
}

NORMALIZED_DOG_DATA = normalize_dog_data(RAW_DOG_DATA)

# Dữ liệu mèo mới
RAW_CAT_DATA = {
  "Mèo Anh lông dài chân lùn tai cụp mã ALD4168": {
    "title": "Mèo Anh lông dài chân lùn tai cụp mã ALD4168", "category": "Mèo anh lông dài", "description": ["Mèo Anh lông dài chân lùn tai cụp mã ALD4168mang vẻ ngoài đáng yêu và sang trọng như một bé búp bê mềm mại. Bộ lông dài, dày và mềm mượt, phủ đều khắp cơ thể, khiến chú mèo trông như một chiếc gối bông sống động. Khuôn mặt tròn phúng phính, má bầu, mũi nhỏ xinh, cùng đôi tai cụp ôm sát đầu tạo nên biểu cảm hiền lành, dịu dàng nhưng vẫn rất tinh nghịch. Thân hình thấp, tròn trịa, chân ngắn mập mạp, dáng đi lững thững nhưng duyên dáng, khiến mỗi bước chân đều đáng yêu và duyên dáng. Mèo Anh lông dài chân lùn tai cụp rất tình cảm, ngoan ngoãn và thích được vuốt ve, luôn quấn quýt bên chủ và mang đến cảm giác ấm áp, dễ chịu cho mọi người xung quanh.", "Quyền lợi có được khi muaMèo Anh lông dài chân lùn tai cụp mã ALD4168tại Pet House", "Bảo hành thuần chủng trọn đời.", "Bảo hành bệnh giảm bạch cầu trong vòng 7 ngày đầu về nhà mới.", "Ngoài ra, quý khách có thể mua thêm gói bảo hiểm sức khỏe 1 năm nếu có nhu cầu. (Thú cưng là động vật sống, nhạy cảm với môi trường sống, thức ăn… bởi vậy hãy chăm sóc theo hướng dẫn của PetHouse hướng dẫn nhé)", "Miễn phí vận chuyển toàn quốc (đối với tàu hỏa và xe khách, taxi) – hỗ trợ 50-80% chi phí vận chuyển máy bay.", "Tặng kèm phụ kiện cho thú cưng gồm: Dây dắt, Vòng cổ, Bát ăn, Bình nước thông minh, Đồ chơi, Lược chải, Túi vận chuyển cho thú cảnh nhỏ.", "Giấy tờ đi kèm: Sổ theo dõi sức khoẻ (sổ tiêm phòng vacxin), hợp đồng mua bán, hướng dẫn chăm sóc, giấy chứng nhận nguồn gốc của trại cung cấp, thiệp cảm ơn.", "Giảm giá 10% cho các lần mua thú cưng tiếp theo.", "Giảm 20% cho các dịch vụ Spa cắt tỉa trọn đời, giảm 10% dịch vụ trông giữ thú cưng tại cửa hàng. Giảm 5% mua phụ kiện trọn đời.", "Hỗ trợ bảo hiểm sức khỏe 1.000.000 Vnđ (trong trường hợp thú cưng bị ốm và trong thời gian bảo hành theo điều khoản trong hợp đồng mua bán.)", "Tặng quà tặng trị giá 500.000 Vnđ khi giới thiệu bạn bè mua thú cưng tại Pet House. (Có thể quy đổi thành tiền mặt)", "Nói không với chó mèo tàu bệnh, thải loại.", "Đồng hành cùng khách hàng chăm sóc thú cưng trọn đời."],
    "price": "28.000.000 ₫",
    "more_information": {"Tháng tuổi: 2 tháng tuổi": "Bố: Cacao", "Giới tính: Đực": "Mẹ: Money", "Màu: Trắng đuôi xám": "Sức khỏe: Nhanh nhẹn, ăn uống tốt", "Tình trạng: Có Sẵn": "Vận chuyển: Miễn phí", "Tẩy giun: 1 lần": "Tiêm phòng: 1 mũi vacxin", "Nguồn gốc: Thuần chủng, sinh sản tại Trại Pethouse": "Đặc điểm: Lông mượt"},
    "link_image_file": ["https://pethouse.com.vn/wp-content/uploads/2025/11/meo-anh-long-dai-ma-ALD4168.jpg", "https://pethouse.com.vn/wp-content/uploads/2025/11/meo-anh-long-dai-chan-lun-tai-cup-ma-ALD4168.jpg"]
  },
  "Mèo anh lông dài chân lùn màu blue golden mã ALD4117": {
    "title": "Mèo anh lông dài chân lùn màu blue golden mã ALD4117", "category": "Mèo anh lông dài", "description": ["Mèo Anh lông dài chân lùn màu blue golden mã ALD4117mang nét đẹp thanh tao và ấm áp, như một quý cô nhỏ khoác áo sương mai. Toàn thân phủ lớp lông dài, mềm mượt với sắc blue golden độc đáo, nơi gam vàng mật ong hòa quyện cùng xám xanh dịu nhẹ, tạo nên hiệu ứng ánh sáng vừa tinh tế vừa sang trọng. Thân hình thấp, tròn trịa, đôi chân ngắn đáng yêu khiến mỗi bước đi của chúng trông chậm rãi, duyên dáng như đang catwalk. Khuôn mặt tròn đầy đặn, đôi mắt to sâu màu xanh ngọc hoặc xanh xám, cùng đôi tai nhỏ nhắn giúp biểu cảm của chúng trở nên hiền hậu, ngọt ngào. Mèo Anh lông dài chân lùn blue golden có tính cách hiền lành, nhẹ nhàng và rất tình cảm, thường thích nằm sưởi nắng hoặc cuộn mình trong lòng chủ, toát lên vẻ bình yên và sang trọng một cách tự nhiên.", "Quyền lợi có được khi muaMèo Anh lông dài chân lùn màu blue golden mã ALD4117tại Pet House", "Bảo hành thuần chủng trọn đời.", "Bảo hành bệnh giảm bạch cầu trong vòng 7 ngày đầu về nhà mới.", "Ngoài ra, quý khách có thể mua thêm gói bảo hiểm sức khỏe 1 năm nếu có nhu cầu. (Thú cưng là động vật sống, nhạy cảm với môi trường sống, thức ăn… bởi vậy hãy chăm sóc theo hướng dẫn của PetHouse hướng dẫn nhé)", "Miễn phí vận chuyển toàn quốc (đối với tàu hỏa và xe khách, taxi) – hỗ trợ 50-80% chi phí vận chuyển máy bay.", "Tặng kèm phụ kiện cho thú cưng gồm: Dây dắt, Vòng cổ, Bát ăn, Bình nước thông minh, Đồ chơi, Lược chải, Túi vận chuyển cho thú cảnh nhỏ.", "Giấy tờ đi kèm: Sổ theo dõi sức khoẻ (sổ tiêm phòng vacxin), hợp đồng mua bán, hướng dẫn chăm sóc, giấy chứng nhận nguồn gốc của trại cung cấp, thiệp cảm ơn.", "Giảm giá 10% cho các lần mua thú cưng tiếp theo.", "Giảm 20% cho các dịch vụ Spa cắt tỉa trọn đời, giảm 10% dịch vụ trông giữ thú cưng tại cửa hàng. Giảm 5% mua phụ kiện trọn đời.", "Hỗ trợ bảo hiểm sức khỏe 1.000.000 Vnđ (trong trường hợp thú cưng bị ốm và trong thời gian bảo hành theo điều khoản trong hợp đồng mua bán.)", "Tặng quà tặng trị giá 500.000 Vnđ khi giới thiệu bạn bè mua thú cưng tại Pet House. (Có thể quy đổi thành tiền mặt)", "Nói không với chó mèo tàu bệnh, thải loại.", "Đồng hành cùng khách hàng chăm sóc thú cưng trọn đời."],
    "price": "36.000.000 ₫",
    "more_information": {"Tháng tuổi: 3 tháng tuổi": "Bố: Cat", "Giới tính: Cái": "Mẹ: Sen", "Màu: Blue golden": "Sức khỏe: Nhanh nhẹn, ăn uống tốt", "Tình trạng: Có Sẵn": "Vận chuyển: Miễn phí", "Tẩy giun: 1 lần": "Tiêm phòng: 2 mũi vacxin", "Nguồn gốc: Thuần chủng, sinh sản tại Trại Pethouse": "Đặc điểm: hiếu động, khuôn mặt xinh xắn"},
    "link_image_file": ["https://pethouse.com.vn/wp-content/uploads/2025/10/meo-anh-long-dai-ma-ALD4117.jpg", "https://pethouse.com.vn/wp-content/uploads/2025/10/meo-anh-long-dai-chan-lun-mau-golden-ma-ALD4117.jpg", "https://pethouse.com.vn/wp-content/uploads/2025/10/meo-anh-long-dai-chan-lun-mau-blue-golden-ma-ALD4117.jpg", "https://pethouse.com.vn/wp-content/uploads/2025/10/meo-anh-long-dai-chan-lun-ma-ALD4117.jpg"]
  }
}

NORMALIZED_CAT_DATA = normalize_cat_data(RAW_CAT_DATA)


# Lấy lại LIFESTYLE_DICT từ câu trả lời trước
LIFESTYLE_DICT = {
    "activity_level": {
        "năng động": 3, "thích vận động": 3, "ít vận động": 1, "thích thư giãn": 1, "bình thường": 2
    },
    "time_availability": { 
        "bận rộn": 1, "đi làm cả ngày": 1, "thường xuyên ở nhà": 3, "có nhiều thời gian": 3, "khá bận": 2
    },
    "space_size": {
        "chung cư nhỏ": 1, "phòng trọ": 1, "nhà không sân": 2, "nhà có sân": 3, "biệt thự": 3
    },
    "experience": {
        "mới nuôi": 1, "chưa có kinh nghiệm": 1, "đã từng nuôi": 3, "có kinh nghiệm": 3, "nuôi nhiều loại": 3
    }
}

class PetAIEngine:
    def __init__(self, pet_db, lifestyle_dict):
        self.pet_db = pet_db
        self.lifestyle_dict = lifestyle_dict
        self.customer_profile = {}

    # --- HÀM HỖ TRỢ CHUNG (Cho cả Retrieval và Consultant) ---
    def _extract_attributes(self, query):
        """Trích xuất thuộc tính vật lý (Retrieval) và Lối sống (Consultant)."""
        attributes = {"retrieval": {}, "lifestyle": {}}
        query_lower = query.lower()

        # 1. Trích xuất thuộc tính Retrieval (Loài, Giới tính, Tuổi, Màu sắc)
        # Sử dụng Regex/Rule-Based cho thuộc tính cứng
        
        # Giới tính
        if "đực" in query_lower:
            attributes["retrieval"]["gender"] = "Đực"
        elif "cái" in query_lower:
            attributes["retrieval"]["gender"] = "Cái"
        
        # Tuổi (Regex)
        age_match = re.search(r"(\d+)\s*(tháng|năm)\s*tuổi", query_lower)
        if age_match:
            number = int(age_match.group(1))
            unit = age_match.group(2)
            attributes["retrieval"]["age_months"] = number * 12 if unit == "năm" else number
        
        # Màu sắc (ví dụ đơn giản)
        if "vàng cam" in query_lower or "vàng" in query_lower:
            attributes["retrieval"]["coat_color"] = "Vàng cam" if "vàng cam" in query_lower else "Vàng"
        
        # 2. Trích xuất thuộc tính Lifestyle (Dùng cho Khớp cặp)
        for category, mapping in self.lifestyle_dict.items():
            for keyword, value in mapping.items():
                if keyword in query_lower:
                    attributes["lifestyle"][category] = value
                    break

        return attributes

    # --- TÍNH NĂNG 1: RETRIEVAL (Tìm kiếm Thuộc tính) ---
    def simple_retrieval_search(self, query):
        """Tìm kiếm thú cưng dựa trên thuộc tính vật lý (ví dụ: 'chó đực lông vàng 3 tháng')."""
        attrs = self._extract_attributes(query)
        r_filters = attrs["retrieval"]
        
        if not r_filters:
            return []

        matching_pets = []
        for pet in self.pet_db:
            is_match = True
            
            # Lọc Giới tính
            if "gender" in r_filters and pet.get("gender") != r_filters["gender"]:
                is_match = False
            # Lọc Màu sắc (chấp nhận khớp một phần)
            if "coat_color" in r_filters and r_filters["coat_color"] not in pet.get("coat_color", ""):
                is_match = False
            # Lọc Tuổi (chấp nhận lân cận)
            if "age_months" in r_filters and abs(pet.get("age_months", 0) - r_filters["age_months"]) > 1:
                is_match = False
                
            if is_match:
                matching_pets.append(pet)
                
        # Sắp xếp theo giá (ví dụ)
        matching_pets.sort(key=lambda x: x['price'])
        
        return {"filters": r_filters, "results": matching_pets}


    # --- TÍNH NĂNG 2: TƯ VẤN KHỚP CẶP (Lối sống) ---
    def analyze_and_score(self, query):
        """Phân tích lối sống và tính điểm phù hợp."""
        attrs = self._extract_attributes(query)
        l_filters = attrs["lifestyle"]
        
        if not l_filters:
             return {"customer_profile": {}, "top_recommendations": []}

        # Xây dựng Hồ sơ Khách hàng (Ánh xạ ngược như đã giải thích)
        self.customer_profile = {
            "needed_activity_level": l_filters.get("activity_level"),
            "needed_independence_level": 4 - l_filters.get("time_availability", 4) if "time_availability" in l_filters else None,
            "needed_space_required": l_filters.get("space_size"),
            "needed_beginner_friendly": 4 - l_filters.get("experience", 4) if "experience" in l_filters else None
        }

        # Tính điểm Khớp cặp
        scored_pets = []
        for pet in self.pet_db:
            score = 0
            
            # 1. Hoạt động (Khớp càng gần càng tốt)
            if self.customer_profile.get("needed_activity_level"):
                score += (4 - abs(self.customer_profile["needed_activity_level"] - pet["activity_level"]))
                
            # 2. Độc lập (Khớp càng gần càng tốt)
            if self.customer_profile.get("needed_independence_level"):
                score += (4 - abs(self.customer_profile["needed_independence_level"] - pet["independence_level"]))
            
            # 3. Không gian (Pet phải <= yêu cầu KH)
            if self.customer_profile.get("needed_space_required"):
                space_diff = pet["space_required"] - self.customer_profile["needed_space_required"]
                score += 3 if space_diff <= 0 else -5 # Phạt nặng nếu không gian không đủ
                    
            # 4. Độ khó Nuôi
            if self.customer_profile.get("needed_beginner_friendly"):
                score += (4 - abs(self.customer_profile["needed_beginner_friendly"] - pet["beginner_friendly"]))
            
            pet_copy = pet.copy()
            pet_copy["compatibility_score"] = score
            scored_pets.append(pet_copy)
            
        scored_pets.sort(key=lambda x: x["compatibility_score"], reverse=True)
        return {"customer_profile": self.customer_profile, "top_recommendations": scored_pets[:3]}


# Gộp dữ liệu mới
FULL_PET_DATABASE = NORMALIZED_DOG_DATA + NORMALIZED_CAT_DATA

# Khởi tạo lại AI Engine với bộ dữ liệu đầy đủ
ai_engine_full = PetAIEngine(FULL_PET_DATABASE, LIFESTYLE_DICT)

# --- KỊCH BẢN KIỂM TRA TƯ VẤN KHỚP CẶP (Tình huống phân vân) ---

# Tình huống 1: Khách hàng bận rộn, thích yên tĩnh, không thích chải lông
query_C = "Tôi sống ở chung cư, đi làm cả ngày, tôi cần một bé ít quậy và không cần chải chuốt nhiều."
result_C = ai_engine_full.analyze_and_score(query_C)

print("="*60)
print(f"KỊCH BẢN KHỚP CẶP 1: BẬN RỘN & ÍT CHĂM SÓC")
print(f"Query: {query_C}")
print(f"Hồ sơ KH mong muốn:")
print(f"- Độc lập: CAO (3) | Hoạt động: THẤP (1) | Chăm sóc lông: THẤP (1)") 
# Lưu ý: Grooming Needs (Nhu cầu chải lông) không có trong filters, nhưng sẽ ảnh hưởng đến điểm.

print("\nKẾT QUẢ ĐỀ XUẤT:")
for pet in result_C['top_recommendations']:
    print(f"-> {pet['title']}")
    print(f"   | Điểm Khớp: {pet['compatibility_score']} | Hoạt động/Độc lập/Chải lông: {pet['activity_level']}/{pet['independence_level']}/{pet['grooming_needs']}")
print("="*60)

# Tình huống 2: Khách hàng có thời gian, thích cún năng động, thích chăm sóc lông
query_D = "Tôi có nhiều thời gian rảnh, thích được chơi đùa với cún và không ngại chăm sóc lông."
result_D = ai_engine_full.analyze_and_score(query_D)

print("\nKỊCH BẢN KHỚP CẶP 2: RẢNH RỖI & NĂNG ĐỘNG")
print(f"Query: {query_D}")
print(f"Hồ sơ KH mong muốn:")
print(f"- Độc lập: THẤP (1) | Hoạt động: CAO (3) | Chăm sóc lông: CAO (3)")

print("\nKẾT QUẢ ĐỀ XUẤT:")
for pet in result_D['top_recommendations']:
    print(f"-> {pet['title']}")
    print(f"   | Điểm Khớp: {pet['compatibility_score']} | Hoạt động/Độc lập/Chải lông: {pet['activity_level']}/{pet['independence_level']}/{pet['grooming_needs']}")
print("="*60)