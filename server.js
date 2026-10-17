import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateGeminiResponse } from './server/geminiService.js';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const ACTIVE_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  const isKeyConfigured = Boolean(
    process.env.GEMINI_API_KEY &&
    process.env.GEMINI_API_KEY.trim() !== '' &&
    process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
  );

  res.json({
    status: 'ok',
    service: 'Smart AI Chatbot Backend',
    geminiConfigured: isKeyConfigured,
    model: ACTIVE_MODEL,
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Message is required and cannot be empty.',
        code: 'INVALID_REQUEST',
      });
    }

    const reply = await generateGeminiResponse(message.trim(), history || []);
    res.json({ reply, success: true });
  } catch (error) {
    const statusCode = error.status || 500;
    const errorMessage =
      error.message || 'An unexpected error occurred while processing your request with Gemini.';

    console.error(`[API Error] /api/chat (${statusCode}) [${error.code || 'UNKNOWN'}]: ${errorMessage}`);

    res.status(statusCode).json({
      error: errorMessage,
      code: error.code || 'GEMINI_API_ERROR',
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Smart AI Backend] Server running on http://localhost:${PORT} (Model: ${ACTIVE_MODEL})`);
});
