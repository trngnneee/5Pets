from __init__ import create_app
# from src.ai_pet_consultant.data_loader import normalize_product_data
# from src.ai_pet_consultant.embedder import build_vector_index
# from src.ai_pet_consultant.consultant import get_ai_consultation

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)