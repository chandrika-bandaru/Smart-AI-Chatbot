/**
 * Service to communicate with the backend Gemini API (/api/chat).
 * Encapsulates network calls, error normalization, and fallback logic.
 */

export async function sendChatMessage(message, history = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.error ||
        `Server responded with status ${response.status}: ${response.statusText}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.code = data?.code;
      throw error;
    }

    if (!data || typeof data.reply !== 'string') {
      throw new Error('Received an invalid response format from the server.');
    }

    return data.reply;
  } catch (error) {
    // Check if network failed completely (e.g., backend server not reachable)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to the backend server. Please ensure the backend is running (run `npm run server`).'
      );
    }
    throw error;
  }
}
