import React from 'react';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 my-4">
      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-500/20">
        <Bot className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-sm">
          <div className="flex items-center gap-1.5 h-5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
            <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-300">
              AI is thinking...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
