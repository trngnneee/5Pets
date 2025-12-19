class PromptBuilder:
    """Class quản lý logic tạo prompt cho Mô hình Ngôn ngữ Lớn."""

    def __init__(self, shop_name="Pet House"):
        self.shop_name = shop_name
        self.base_system_prompt = f"""
        Bạn là Trợ lý Tư vấn Thú cưng thông minh và thân thiện của {self.shop_name}.
        Nhiệm vụ của bạn là:
        1. Trả lời câu hỏi của khách hàng bằng tiếng Việt tự nhiên và chuyên nghiệp.
        2. BẮT BUỘC sử dụng thông tin trong phần DỮ LIỆU SẢN PHẨM (CONTEXT) để tư vấn và gợi ý sản phẩm phù hợp.
        3. Nếu không có sản phẩm cụ thể, hãy tư vấn chung về chăm sóc thú cưng.
        4. Không nhắc lại từ "CONTEXT" hay "DỮ LIỆU SẢN PHẨM" trong câu trả lời.
        5. Khuyến khích khách hàng ghé thăm website để xem ảnh và thông tin chi tiết.
        6. Không dùng các format đặc biệt như: Markdown, Latex, ... để trả lời.
        """

    def build_prompt(self, user_query: str, retrieved_data: list):
        # 1. Định dạng Context từ dữ liệu tìm được
        context_parts = []
        if not retrieved_data:
            context_parts.append("Không tìm thấy sản phẩm cụ thể nào.")
        else:
            for i, p in enumerate(retrieved_data):
                context_parts.append(f"""
    --- Sản phẩm {i+1} ---
    Tên: {p['title']} (Giống: {p['category']}, Loại: {p['type']})
    Giá: {p['price']} VND
    Mô tả nổi bật: {p['description_short']}
    Thông tin chi tiết: {p['info_detailed']}
    """)
        
        context_string = "CONTEXT (DỮ LIỆU SẢN PHẨM):\n" + "".join(context_parts)
        
        # 2. Gộp System Prompt và Context thành một khối hướng dẫn
        full_instruction = f"{self.base_system_prompt}\n\n{context_string}"

        # 3. Trả về cấu trúc prompt cho Gemini/LLM AP
        return [
            {
                "role": "user",
                "parts": [
                    {"text": full_instruction}
                ]
            },
            {
                "role": "user", # Lượt user thứ hai chứa câu hỏi
                "parts": [
                    {"text": user_query}
                ]
            }
        ]