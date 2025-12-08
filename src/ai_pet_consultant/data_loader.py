from pathlib import Path
import json
import re

BASE_DIR = Path(__file__).resolve().parents[2]  
DATA_DIR = BASE_DIR / "data"

class DataLoader:
    """Class chịu trách nhiệm load và chuẩn hóa dữ liệu sản phẩm."""

    def __init__(self, cat_file='data_cat.json', dog_file='data_dog.json'):
        # Giả định các file data_cat.json và data_dog.json nằm cùng cấp
        self.cat_file = cat_file 
        self.dog_file = dog_file
        
    def _clean_price(self, price_str):
        """Hàm nội bộ làm sạch chuỗi giá thành số."""
        if price_str:
            # Loại bỏ đơn vị tiền tệ (₫), dấu phân cách hàng nghìn (.), và ký hiệu khoảng trắng (\xa0)
            return re.sub(r'[^\d]', '', price_str.split('\xa0')[0])
        return '0'

    def load_data(self):
        """Đọc và chuẩn hóa dữ liệu từ file JSON."""
        try:
            with open(DATA_DIR / "cat" / "data_cat.json", "r", encoding="utf-8") as f:
                data_cat = json.load(f)
            with open(DATA_DIR / "dog" / "data_dog.json", "r", encoding="utf-8") as f:
                data_dog = json.load(f)
        except FileNotFoundError:
             print("Lỗi: Không tìm thấy file dữ liệu (data_cat.json hoặc data_dog.json).")
             return {}

        products = {}
        
        # Hàm con để chuẩn hóa dữ liệu
        def _normalize_set(data, pet_type):
            for name, item in data.items():
                info_string = ' '.join(f"{k}: {v}" for k, v in item["more_information"].items())
                products[name] = {
                    "title": item["title"],
                    "category": item["category"],
                    "description_short": item["description"][0],
                    "price": self._clean_price(item["price"]),
                    "info_detailed": info_string,
                    "type": pet_type,
                }

        _normalize_set(data_cat, "Mèo")
        _normalize_set(data_dog, "Chó")

        return products