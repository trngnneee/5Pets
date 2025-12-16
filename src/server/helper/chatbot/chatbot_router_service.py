from .task_classifier_service import classify_task
from .pet_consultant_service import ask_pet_consultant

def handle_query(user_query: str) -> str:
    print("Call the function handle_query")
    rep, task = classify_task(user_query)

    print(task)

    if task == "pet_consultant":
        print("Handle pet consultant")
        return ask_pet_consultant(user_query)
    elif task == "general":
        return rep
    else:
        return "Xin lỗi, tôi chưa hiểu câu hỏi. Vui lòng thử lại."