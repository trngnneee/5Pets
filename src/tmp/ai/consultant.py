import os
from google import genai

from .retriever import Retriever
from .prompt_builder import PromptBuilder
from .order_service import OrderService

from dotenv import load_dotenv
import os
load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

class Consultant:
    """Class điều phối toàn bộ quy trình RAG (Retrieval-Augmented Generation)."""

    def __init__(self, retriever: Retriever, prompt_builder: PromptBuilder):
        self.retriever = retriever
        self.prompt_builder = prompt_builder
        self.order_service = OrderService(
            base_url="http://127.0.0.1:5000"
        )
        api_key = GEMINI_API_KEY
        if not api_key:
            raise EnvironmentError("GEMINI_API_KEY chưa được thiết lập trong biến môi trường.")
        self.client = genai.Client(api_key=api_key)

    def answer(self, query: str):
        """Xử lý câu hỏi của người dùng và tạo câu trả lời từ AI."""
        try:
            task = classify_task(query)
            # If client ask for checking their god damn stuffs
            if task == "order_check":
                return self.order_service.handle_query(query)

            # 1. Retrieval (Tìm kiếm ngữ nghĩa)
            retrieved_data = self.retriever.retrieve(query)

            # 2. Prompt Building (Tạo prompt với context)
            prompt = self.prompt_builder.build_prompt(query, retrieved_data)

            # 3. Generation (Gọi LLM API)
            response = self.client.models.generate_content(
                model="gemini-2.5-flash", 
                contents=prompt
            )
            return {
                "type": "text",
                "message": response.text
            }

        except Exception as e:
            print(f"Lỗi trong quá trình tạo câu trả lời AI: {e}")
            return "Xin lỗi, trợ lý AI đang gặp sự cố kỹ thuật. Vui lòng thử lại sau."
        
def classify_task(query: str) -> str:
    q = query.lower()

    order_keywords = [
        "đơn hàng",
        "mua hàng",
        "đã đặt",
        "đơn của tôi",
        "kiểm tra đơn",
        "trạng thái đơn"
    ]

    for kw in order_keywords:
        if kw in q:
            return "order_check"

    return "rag_question"