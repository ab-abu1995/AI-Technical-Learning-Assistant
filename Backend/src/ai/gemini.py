import google.generativeai as genai

# Set your API key here
genai.configure(api_key="YOUR_GEMINI_API_KEY")

model = genai.GenerativeModel("gemini-1.5-flash")

def ask_gemini(question):
    response = model.generate_content(question)
    return response.text
