🧠 MediMindAI – AI-Powered Medical Chatbot
📌 Overview
MediMindAI is an intelligent medical chatbot built with Google Gemini API and a local fallback model. It provides reliable, AI-driven responses to healthcare queries while ensuring secure API key management and modular architecture.

🚀 Features
🔗 Gemini API Integration – Securely connects to Google’s Gemini for advanced AI responses.

🛡️ Local Fallback – Ensures chatbot availability even if the API fails.

⚙️ Backend API Routes – Built with TypeScript for clean and scalable endpoints.

🔒 Secure Environment Variables – API keys stored in .env.local (never exposed).

🎨 Modern UI/UX – Simple, responsive interface for seamless interaction.

🛠️ Tech Stack
Frontend: Next.js, React

Backend: Node.js, TypeScript

AI Integration: Google Gemini API (@google/generative-ai)

Environment Management: .env.local

Version Control: GitHub

📂 Project Structure
Code
src/
 ├── app/api/chat/route.ts   # API route handling chatbot requests
 ├── lib/gemini.ts           # Gemini client setup
 └── components/...          # UI components
.env.local                   # Environment variables (ignored by Git)
⚡ Getting Started
Clone the repo:

bash
git clone https://github.com/SyedAsgerMehdi/MediMindAI.git
Install dependencies:

bash
npm install
Add your Gemini API key in .env.local:

Code
GEMINI_API_KEY=your_api_key_here
Run the development server:

bash
npm run dev

🎯 Why This Project Matters
Demonstrates AI integration skills with real-world APIs.

Showcases secure coding practices (environment variables, modular design).

Highlights problem-solving ability (fallback logic for reliability).

Aligns with data science & AI career goals.

📈 Future Improvements
Add user authentication for personalized sessions.

Expand to multi-language support.

👨‍💻 Author
Syed Asger Mehdi  
