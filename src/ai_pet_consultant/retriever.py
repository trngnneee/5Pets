# retriever.py (Đã sửa lỗi)

import numpy as np
import faiss
from .embedder import Embedder 

class Retriever:
    """Class quản lý Vector Store (FAISS) và tìm kiếm ngữ nghĩa."""

    def __init__(self, embedder: Embedder, documents: dict):
        self.embedder = embedder
        self.documents = documents
        self.product_keys = list(documents.keys()) # Lưu thứ tự các keys
        
        self.texts_to_index = [
            f"{p['title']} ({p['type']} - {p['category']}). {p['description_short']}. {p['info_detailed']}"
            for p in documents.values()
        ]
        
        self.faiss_index = self._build_vector_index() 
        

    def _build_vector_index(self):
        """Xây dựng chỉ mục FAISS từ dữ liệu sản phẩm."""
        print("Đang xây dựng Index FAISS...")
        
        # Tạo embeddings cho tất cả sản phẩm
        embeddings = self.embedder.get_embedding(self.texts_to_index)
        embeddings = np.asarray(embeddings).astype("float32")

        # Xây dựng index
        dim = embeddings.shape[1]
        faiss_index = faiss.IndexFlatL2(dim)
        faiss_index.add(embeddings)
        
        print(f"Xây dựng Index thành công với {len(self.product_keys)} tài liệu.")
        return faiss_index

    def retrieve(self, query: str, top_k: int = 5):
        if self.faiss_index is None:
            raise ValueError("FAISS Index chưa được xây dựng hoặc lỗi.")

        query_vec = self.embedder.get_embedding([query]).astype("float32")

        D, I = self.faiss_index.search(query_vec, top_k)

        results = []
        for idx in I[0]:
            if idx >= 0:
                key = self.product_keys[idx]
                results.append(self.documents[key])

        return results
    def add_documents(self, new_documents: dict):
        """Thêm tài liệu mới vào chỉ mục FAISS."""
        new_texts = [
            f"{p['title']} ({p['type']} - {p['category']}). {p['description_short']}. {p['info_detailed']}"
            for p in new_documents.values()
        ]
        
        new_embeddings = self.embedder.get_embedding(new_texts)
        new_embeddings = np.asarray(new_embeddings).astype("float32")
        
        self.faiss_index.add(new_embeddings)
        
        # Cập nhật danh sách tài liệu và keys
        self.documents.update(new_documents)
        self.product_keys.extend(new_documents.keys())
        
        print(f"Đã thêm {len(new_documents)} tài liệu mới vào Index FAISS.")
        faiss_index = self.faiss_index
        return faiss_index