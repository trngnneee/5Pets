from google import genai
import os

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

def classify_task(user_query: str) -> tuple[str, str]:
    prompt_intro = (
        "Bạn là trợ lý ảo thông minh và thân thiện của trang web bán thú cưng 5Pets.\n"
        "Bạn sẽ phân loại message của người dùng.\n"
    )

    prompt_pet_consultant = (
        "Nếu message của người dùng là câu hỏi liên quan đến việc tìm hoặc gợi ý thú cưng "
        "theo đặc điểm (giống, lông, không gian sống, tính cách, v.v.) "
        "thì CHỈ trả lời đúng một từ: pet_consultant.\n"
    )

    prompt_general = (
        "Nếu KHÔNG phải câu hỏi gợi ý thú cưng thì:\n"
        "- Hãy trả lời nội dung câu hỏi\n"
        "- Trả lời bằng text thường (không Markdown, không Latex)\n"
        "- Không quá 200 từ\n"
    )

    full_prompt = (
        f"{prompt_intro}\n"
        f"{prompt_pet_consultant}\n"
        f"{prompt_general}\n"
        f"Câu hỏi người dùng: \"{user_query}\""
    )

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt,
        )

        reply_text = response.text.strip()
        print("[Gemini reply]\n", reply_text)

        if "pet_consultant" in reply_text:
            return reply_text, 'pet_consultant'
        else: 
            return reply_text, 'general'

    except Exception as e:
        print(f"[Task Classifier] Lỗi khi gọi Gemini SDK: {e}")
        return "Xin lỗi, hệ thống AI đang bận. Vui lòng thử lại sau.", "general"

