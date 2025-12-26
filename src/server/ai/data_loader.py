# from pathlib import Path
# import json
# import re

# BASE_DIR = Path(__file__).resolve().parents[2]  
# DATA_DIR = BASE_DIR / "data"

# class DataLoader:
#     """Class chịu trách nhiệm load và chuẩn hóa dữ liệu sản phẩm."""

#     def __init__(self, cat_file='data_cat.json', dog_file='data_dog.json'):
#         self.cat_file = cat_file 
#         self.dog_file = dog_file
        
#     def _clean_price(self, price_str):
#         """Hàm nội bộ làm sạch chuỗi giá thành số."""
#         if price_str:
#             return re.sub(r'[^\d]', '', price_str.split('\xa0')[0])
#         return '0'

#     def load_data(self):
#         """Load dữ liệu từ database với category là String ID"""
#         from model.pet import Pet 
#         from model.category import Category
        
#         # 1. Lấy tất cả Category và tạo một dictionary để tra cứu nhanh
#         category_map = {str(c.id): c.name for c in Category.objects.all()}

#         # 2. Lấy tất cả Pet
#         pets = Pet.objects.all()

#         products = {}
#         for p in pets:
#             # 3. Tra cứu tên category từ ID string
#             cat_id = str(p.category) if p.category else ""
#             cat_name = category_map.get(cat_id, "Thú cưng")

#             # 4. Tạo chuỗi thông tin chi tiết
#             detail_parts = [
#                 f"Giới tính: {getattr(p, 'gender', 'Chưa rõ')}",
#                 f"Độ tuổi: {getattr(p, 'age', 'Chưa rõ')}",
#                 f"Màu sắc: {getattr(p, 'color', 'Chưa rõ')}",
#             ]
            
#             # 5. Build object chuẩn cho RAG
#             products[str(p.id)] = {
#                 "title": p.name,
#                 "category": cat_name, 
#                 "description_short": p.description[:1000] if p.description else "Không có mô tả",
#                 "price": "{:,} VND".format(p.price) if getattr(p, 'price', None) else "Liên hệ",
#                 "info_detailed": " | ".join(detail_parts),
#                 "type": "Chó" if "chó" in p.name.lower() else "Mèo"
#             }

#         return products
from pathlib import Path
import json
import re

BASE_DIR = Path(__file__).resolve().parents[2]  
DATA_DIR = BASE_DIR / "data"

class DataLoader:
    """Class chịu trách nhiệm load và chuẩn hóa dữ liệu sản phẩm."""

    def __init__(self, cat_file='data_cat.json', dog_file='data_dog.json'):
        self.cat_file = cat_file 
        self.dog_file = dog_file
        
    def _clean_price(self, price_str):
        """Hàm nội bộ làm sạch chuỗi giá thành số."""
        if price_str:
            return re.sub(r'[^\d]', '', price_str.split('\xa0')[0])
        return '0'

    def load_data(self):
        """Load dữ liệu từ database với category là String ID"""
        from model.pet import Pet 
        from model.category import Category
        
        # 1. Lấy tất cả Category và tạo một dictionary để tra cứu nhanh
        category_map = {str(c.id): c.name for c in Category.objects.all()}

        # 2. Lấy tất cả Pet
        pets = Pet.objects.all()

        products = {}
        for p in pets:
            # 3. Tra cứu tên category từ ID string
            cat_id = str(p.category) if p.category else ""
            cat_name = category_map.get(cat_id, "Thú cưng")

            # 4. Tạo chuỗi thông tin chi tiết
            detail_parts = [
                f"Giới tính: {getattr(p, 'gender', 'Chưa rõ')}",
                f"Độ tuổi: {getattr(p, 'age', 'Chưa rõ')}",
                f"Màu sắc: {getattr(p, 'color', 'Chưa rõ')}",
            ]
            
            # 5. Build object chuẩn cho RAG
            products[str(p.id)] = {
                "title": p.name,
                "category": cat_name, 
                "description_short": p.description[:1000] if p.description else "Không có mô tả",
                "price": "{:,} VND".format(p.price) if getattr(p, 'price', None) else "Liên hệ",
                "info_detailed": " | ".join(detail_parts),
                "type": "Chó" if "chó" in p.name.lower() else "Mèo"
            }

        return products