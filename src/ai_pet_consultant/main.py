from .data_loader import DataLoader  
from .embedder import Embedder
from .retriever import Retriever   
from .prompt_builder import PromptBuilder 
from .consultant import Consultant   

def main():
    print("=== AI Pet Consultant - Test Run ===\n")

    # 1. Load data
    print("1. Loading pet knowledge base...")
    loader = DataLoader(cat_file='data_cat.json', dog_file='data_dog.json') 
    documents = loader.load_data()
    print(f"Loaded {len(documents)} documents.")

    # 2. Initialize embedder
    print("2. Initializing embedder...")
    embedder = Embedder()

    # 3. Build vector store / retriever
    # Retriever nhận Embedder và Documents (Dependency Injection)
    print("3. Building retriever (Semantic Index)...")
    retriever = Retriever(embedder=embedder, documents=documents)

    # 4. Initialize prompt builder
    print("4. Initializing prompt builder...")
    prompt_builder = PromptBuilder(shop_name="5Pets")

    # 5. Initialize AI consultant (Core logic)
    # Consultant nhận Retriever và PromptBuilder
    consultant = Consultant(
        retriever=retriever,
        prompt_builder=prompt_builder
    )

    # 6. User test input
    question_1 = "Tôi muốn tìm một con mèo có bộ lông dày, dài và thích được ôm ấp."
    question_2 = "Giống chó nào thích hợp với căn hộ nhỏ và ít rụng lông?"

    print("\n--- Test 1: Tìm kiếm Sản phẩm ---")
    print(f"User Query: {question_1}")
    answer_1 = consultant.answer(question_1)
    print("\n=== AI Answer ===")
    print(answer_1)
    
    print("\n" + "="*50 + "\n")

    print("\n--- Test 2: Tư vấn Chăm sóc ---")
    print(f"User Query: {question_2}")
    answer_2 = consultant.answer(question_2)
    print("\n=== AI Answer ===")
    print(answer_2)


if __name__ == "__main__":
    main()