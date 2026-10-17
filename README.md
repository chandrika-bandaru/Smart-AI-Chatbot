# 🤖 Smart AI Chatbot

An AI-powered chatbot built using **React, Vite, Node.js, Express, and the Google Gemini API**. It provides an interactive chat interface where users can ask questions and receive AI-generated responses.

## ✨ Features

- 💬 Interactive chat interface
- 🧠 AI-generated responses using the Gemini API
- 🗂️ Sidebar for conversation history
- ➕ Start a new conversation
- 🌙 Dark and light theme support
- ⏳ Typing/loading indicator
- ⚠️ Error handling for failed API requests
- 📱 Modern, user-friendly interface

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express.js

**AI Integration**
- Google Gemini API

**Development Tools**
- Git and GitHub
- npm

## 📁 Project Structure

```text
Smart-AI-Chatbot/
├── server/
│   └── geminiService.js
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── server.js
└── vite.config.js
```

## ⚙️ Prerequisites

- Node.js and npm
- A Google Gemini API key

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/chandrika-bandaru/Smart-AI-Chatbot.git
cd Smart-AI-Chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root using `.env.example` as a reference.

Add your Gemini API key and the model configuration supported by your project:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_model_name
```

Replace the placeholder values with your actual configuration. Never commit your real API key to GitHub.

### 4. Start the backend

Open a terminal and run:

```bash
npm run server
```

### 5. Start the frontend

Open a second terminal in the project directory and run:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser, usually:

http://localhost:5173

## 🔐 Security

- Keep API keys in environment variables.
- Never upload `.env` to GitHub.
- Keep `.env` listed in `.gitignore`.
- Use `.env.example` only for placeholder configuration values.

## 🎯 Project Objective

The objective of this project is to build a user-friendly AI chatbot by integrating a modern React frontend with a Node.js backend and a generative AI API.

## 📌 Future Enhancements

- Persistent conversation storage
- Automatic retry for temporary API failures
- Deploy the application online
- Add more chat customization options
