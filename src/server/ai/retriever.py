import numpy as np
import faiss
import os
from .embedder import Embedder 

class Retriever:
    """Class quản lý Vector Store (FAISS) và tìm kiếm ngữ nghĩa."""

    def __init__(self, embedder: Embedder, documents: dict, index_path="pet_data.index"):
        self.embedder = embedder
        self.documents = documents
        self.product_keys = list(documents.keys()) # Lưu thứ tự các keys từ MongoDB ID 
        self.index_path = index_path
        
        # Tạo danh sách văn bản để vector hóa dựa trên cấu trúc dữ liệu mới từ DataLoader
        self.texts_to_index = [
            f"{p['title']} ({p['type']} - {p['category']}). {p['description_short']}. {p['info_detailed']}"
            for p in documents.values()
        ]
        
        # Kiểm tra nếu có file index sẵn thì load, không thì mới xây dựng
        if os.path.exists(self.index_path):
            print(f"Đang tải Index FAISS từ {self.index_path}...")
            self.faiss_index = faiss.read_index(self.index_path)
        else:
            self.faiss_index = self._build_vector_index() 

    def _build_vector_index(self):
        """Xây dựng chỉ mục FAISS từ dữ liệu sản phẩm."""
        print("Đang xây dựng Index FAISS mới từ Database...")
        
        # Tạo embeddings cho tất cả sản phẩm 
        embeddings = self.embedder.get_embedding(self.texts_to_index)
        embeddings = np.asarray(embeddings).astype("float32")

        # Xây dựng index 
        dim = embeddings.shape[1]
        faiss_index = faiss.IndexFlatL2(dim)
        faiss_index.add(embeddings)
        
        # Lưu index xuống ổ đĩa để lần sau dùng luôn
        faiss.write_index(faiss_index, self.index_path)
        
        print(f"Xây dựng và lưu Index thành công với {len(self.product_keys)} tài liệu.")
        return faiss_index

    def retrieve(self, query: str, top_k: int = 5):
        """Tìm kiếm các sản phẩm phù hợp nhất với câu hỏi """
        if self.faiss_index is None:
            raise ValueError("FAISS Index chưa được xây dựng hoặc lỗi.")

        # Biến câu hỏi của user thành vector 
        query_vec = self.embedder.get_embedding([query]).astype("float32")

        # Tìm kiếm top_k kết quả gần nhất 
        D, I = self.faiss_index.search(query_vec, top_k)

        results = []
        for idx in I[0]:
            if idx >= 0 and idx < len(self.product_keys):
                key = self.product_keys[idx] # Lấy ID sản phẩm tương ứng 
                results.append(self.documents[key])

        return results