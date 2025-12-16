import sys
import os
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
sys.path.append(BASE_DIR)

from ai_pet_consultant.data_loader import DataLoader
from ai_pet_consultant.embedder import Embedder
from ai_pet_consultant.retriever import Retriever
from ai_pet_consultant.prompt_builder import PromptBuilder
from ai_pet_consultant.consultant import Consultant

# Pet Consultant Initialization
loader = DataLoader(cat_file="data_cat.json", dog_file="data_dog.json")
documents = loader.load_data()
embedder = Embedder()
retriever = Retriever(embedder=embedder, documents=documents)
prompt_builder = PromptBuilder(shop_name="5Pets")
pet_consultant = Consultant(retriever=retriever, prompt_builder=prompt_builder)

def ask_pet_consultant(query: str) -> str:
    return pet_consultant.answer(query)