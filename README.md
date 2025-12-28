# Google Gemini Clone

A fully responsive **dark-themed Google Gemini clone** built with **React.js**, **TypeScript**, and **Tailwind CSS**, powered by the official **Gemini API (gemini-2.5-flash)**.  
The application delivers a modern AI chat experience with multi-page navigation, chat management, and markdown-rendered AI responses.

---

## ✨ Features

### 🏠 Home Page

- Minimal landing interface
- Introduces the AI assistant experience
- Fully responsive and dark-themed design

### 💬 Chat Page

- AI-powered real-time conversations using **Gemini API**
- Markdown support for AI responses via `react-markdown`
- Sidebar chat management:
  - Create new chats
  - **Update chat titles**
  - **Delete chats**
  - **Search for a specific chat**
- Smooth message flow and auto-scrolling
- Clean and intuitive UI inspired by Google Gemini

### 🔍 Search Page

- Dedicated page for searching chats
- Fast filtering through chat history
- Improved accessibility and navigation

---

## 🛠 Tech Stack

- **React.js** – Component-based UI development
- **TypeScript** – Type safety and scalability
- **Tailwind CSS** – Utility-first styling
- **Context API** – Global state management
- **React Router DOM** – Client-side routing
- **NanoID** – Unique chat and message identifiers
- **React Markdown** – Markdown rendering for AI responses
- **React Icons** – Modern and consistent icons
- **Gemini API** – AI model (`gemini-2.5-flash`)

---

## Demo

![Demo](google-gemini-clone.gif)

---

## 📁 Project Structure

```bash
src/
│── assets/ # Static assets and icons
│── classes/
|   └── Chats.class.tsx
│── components/
│── config/ # Gemini API integration
│── context/ # Context API providers
│── data/
|   └── tools.json
│── interfaces/
│── libs/ # Helper functions
│── pages/
│── App.tsx # Root component
│── index.css
└── main.tsx # Application entry point

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Gemini API key

---

### Installation

```bash
# Clone the repository
git clone https://github.com/Mahmoud46/google-gemini-clone-frontend.git

# Navigate to the project directory
cd google-gemini-clone-frontend

# Install dependencies
npm install
```

### Setup Environment

- Add Gemini API key to `.env` file<br/>
  You can generate a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

```env
VITE_GEMINI_API_KEY = your_gemini_api_key_here
```

### Start the development server

```bash
npm run dev
```

## 🙌 Acknowledgements

- Chat UI inspired by [Gemini](https://gemini.google.com/)
- AI powered by [Gemini API](https://aistudio.google.com/app)
