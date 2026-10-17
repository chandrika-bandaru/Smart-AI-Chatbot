# Smart AI Chatbot

A modern, clean, and responsive AI Chatbot web application built with **React**, **Vite**, and **Google Gemini API** (`@google/genai`).

## 🚀 Features

- **Google Gemini API Integration**: Secure server-side integration powered by official Google GenAI SDK (`gemini-3.8-flash`), with multi-turn conversation memory.
- **Secure Architecture**: API keys are strictly kept on the Node.js backend environment and never exposed to the client-side bundle.
- **Modern & Polished UI**: Designed with clean typography (Plus Jakarta Sans), high-contrast surfaces, and a modern aesthetic inspired by ChatGPT/Claude.
- **Responsive Layout**: Seamless experience across mobile devices, tablets, and desktop displays.
- **Left Sidebar**:
  - Smart AI Chatbot logo & branding
  - **New Chat** button (plus `Ctrl+K` / `⌘K` keyboard shortcut)
  - **Chat History** section with active conversation visual distinction and deletion
- **Main Chat Area**:
  - **Welcome Screen**: Clean empty state with prompt starter cards (Code algorithm, Brainstorm ideas, Explain concept, Draft email) with instant execution and input fill.
  - **Message Bubbles**: Distinct styling and avatars for User and Smart AI messages.
  - **Timestamps**: Clear timestamps on all messages.
  - **Code Block Formatting**: Monospace syntax card formatting with one-click copy functionality.
  - **Typing Indicator**: Animated 3-dot thinking indicator simulating AI response generation.
  - **Error Handling**: Friendly in-chat notices for missing keys, network issues, or API limits without crashing.
- **Chat Controls**:
  - **Clear Chat** button in the header.
  - **Light / Dark Mode Toggle** with system preference detection and localStorage persistence.

---

## 🛠️ Project Structure

```
Smart AI Chatbot/
├── .env.example            # Environment variables template (GEMINI_API_KEY)
├── .gitignore              # Git ignore rules ensuring .env is never tracked
├── server.js               # Node/Express API server (POST /api/chat, GET /api/health)
├── server/
│   └── geminiService.js    # Gemini API wrapper with history formatting & model config
├── vite.config.js          # Vite configuration with /api backend proxy
├── package.json            # Project dependencies and npm scripts
├── tailwind.config.js      # Tailwind CSS configuration with dark mode support
├── postcss.config.js       # PostCSS plugins configuration
├── src/
│   ├── main.jsx            # React root application entry point
│   ├── App.jsx             # Main layout, state orchestration, and chat flow
│   ├── index.css           # Tailwind base styles and custom scrollbar styling
│   ├── services/
│   │   └── chatService.js  # Frontend chat API client communicating with /api/chat
│   ├── components/
│   │   ├── Header.jsx          # Top navigation bar with chat title, Clear Chat, and theme toggle
│   │   ├── Sidebar.jsx         # Left navigation sidebar with history and New Chat
│   │   ├── WelcomeScreen.jsx   # Empty state greeting and starter suggestion cards
│   │   ├── MessageList.jsx     # Scrollable messages view with auto-scroll
│   │   ├── MessageBubble.jsx   # User and AI chat bubbles with code copying & bold formatting
│   │   ├── ChatInput.jsx       # Expanding message input and send button
│   │   ├── TypingIndicator.jsx # AI thinking animation
│   │   └── ThemeToggle.jsx     # Light / Dark mode toggle switch
│   ├── hooks/
│   │   └── useTheme.js         # Theme management and localStorage persistence
│   └── utils/
│       └── mockAi.js           # Offline mock response generator fallback
```

---

## 🔑 Environment Configuration

1. Copy `.env.example` to create your local `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Google Gemini API key to `.env`:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3001
   ```
   *(Get an API key for free from [Google AI Studio](https://aistudio.google.com/))*

---

## 💻 How to Run

### 1. Start Backend Server
```bash
npm run server
```
Runs the Express backend on `http://localhost:3001`.

### 2. Start Frontend Development Server
In a separate terminal:
```bash
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173). Requests to `/api/*` are automatically proxied to the backend server.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized static production build in `dist/`.
