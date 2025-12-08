import os
from google import genai

from .retriever import Retriever
from .prompt_builder import PromptBuilder

from dotenv import load_dotenv
import os
load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

class Consultant:
    """Class điều phối toàn bộ quy trình RAG (Retrieval-Augmented Generation)."""

    def __init__(self, retriever: Retriever, prompt_builder: PromptBuilder):
        self.retriever = retriever
        self.prompt_builder = prompt_builder
        api_key = GEMINI_API_KEY
        if not api_key:
            raise EnvironmentError("GEMINI_API_KEY chưa được thiết lập trong biến môi trường.")
        self.client = genai.Client(api_key=api_key)

    def answer(self, query: str):
        """Xử lý câu hỏi của người dùng và tạo câu trả lời từ AI."""
        try:
            # 1. Retrieval (Tìm kiếm ngữ nghĩa)
            retrieved_data = self.retriever.retrieve(query)

            # 2. Prompt Building (Tạo prompt với context)
            prompt = self.prompt_builder.build_prompt(query, retrieved_data)

            # 3. Generation (Gọi LLM API)
            response = self.client.models.generate_content(
                model="gemini-2.5-flash", # Lựa chọn mô hình tối ưu cho Chatbot
                contents=prompt
            )
            return response.text

        except Exception as e:
            print(f"Lỗi trong quá trình tạo câu trả lời AI: {e}")
            return "Xin lỗi, trợ lý AI đang gặp sự cố kỹ thuật. Vui lòng thử lại sau."