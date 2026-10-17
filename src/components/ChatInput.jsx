import React, { useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';

export function ChatInput({
  inputText,
  setInputText,
  onSendMessage,
  isTyping,
  inputRef,
}) {
  const localRef = useRef(null);
  const activeRef = inputRef || localRef;

  // Auto-resize textarea height
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.style.height = 'auto';
      const scrollHeight = activeRef.current.scrollHeight;
      activeRef.current.style.height = `${Math.min(scrollHeight, 180)}px`;
    }
  }, [inputText, activeRef]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    onSendMessage(inputText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isSendDisabled = !inputText.trim() || isTyping;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-end gap-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-700 p-2 shadow-lg shadow-gray-200/40 dark:shadow-none focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all"
      >
        <textarea
          ref={activeRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isTyping
              ? 'Smart AI is generating a response...'
              : 'Message Smart AI Chatbot... (Shift + Enter for new line)'
          }
          rows={1}
          disabled={isTyping}
          className="flex-1 max-h-44 resize-none bg-transparent px-3 py-2 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={isSendDisabled}
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all shadow-md active:scale-95 ${
            isSendDisabled
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
          }`}
          title="Send message (Enter)"
          aria-label="Send message"
        >
          {isTyping ? (
            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
          ) : (
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          )}
        </button>
      </form>

      <p className="text-[11px] text-center text-gray-500 dark:text-gray-400 mt-2">
        Smart AI Chatbot can make mistakes. Consider verifying important information.
      </p>
    </div>
  );
}
