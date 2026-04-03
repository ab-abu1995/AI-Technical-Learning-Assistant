from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader

from sentence_transformers import SentenceTransformer
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = SentenceTransformer('all-MiniLM-L6-v2')

document_chunks = []
chunk_embeddings = []

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global document_chunks, chunk_embeddings

    try:
        reader = PdfReader(file.file)

        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""

        # Better chunking
        document_chunks = [
            chunk.strip()
            for chunk in text.split(".")
            if len(chunk.strip()) > 30
        ]

        chunk_embeddings = model.encode(document_chunks)

        return {
            "message": f"PDF processed successfully. {len(document_chunks)} chunks loaded."
        }

    except Exception as e:
        return {"error": str(e)}

def search_docs(query):
    if not document_chunks:
        return ""

    query_embedding = model.encode([query])[0]

    similarities = np.dot(chunk_embeddings, query_embedding)

    # Get top 3 results
    top_indices = np.argsort(similarities)[-3:][::-1]

    results = [document_chunks[i] for i in top_indices]

    return " ".join(results)


def generate_answer(text, style):
    if not text:
        return "I couldn't find anything in the document."

    if style == "short":
        return f"📘 {text[:200]}..."

    elif style == "detailed":
        return f"""
Detailed Explanation:
{text}

In simple words:
{text[:300]}
"""

    elif style == "example":
        return f"""
Explanation:
{text}

Example:
Imagine a real-world scenario where this concept is applied.
"""

    else:
        return text

@app.post("/ask")
async def ask(request: Request):
    data = await request.json()

    question = data.get("question")
    style = data.get("style", "short")

    docs = search_docs(question)

    if not docs and document_chunks:
        docs = " ".join(document_chunks[:2])

    answer = generate_answer(docs, style)

    return {"answer": answer}


@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}
