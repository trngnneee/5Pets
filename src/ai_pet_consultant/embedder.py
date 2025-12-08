from sentence_transformers import SentenceTransformer

class Embedder:
    """Class quản lý Sentence Transformer Model và tạo Embeddings."""

    def __init__(self, model_name='all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)
        print(f"Embedder initialized with model: {model_name}")

    def get_embedding(self, texts):
        """Tạo vector nhúng cho một danh sách văn bản."""
        # convert_to_tensor=False để trả về numpy array
        return self.model.encode(texts, convert_to_tensor=False)