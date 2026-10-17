import React from 'react';
import { Menu, Trash2, MessageSquare } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header({
  chatTitle,
  hasMessages,
  onClearChat,
  onOpenSidebar,
  theme,
  toggleTheme,
}) {
  const displayTitle = chatTitle || 'New Conversation';

  return (
    <header className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-30 transition-colors">
      {/* Left: Mobile Sidebar Toggle & Chat Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          title="Open conversation list"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 hidden sm:block" />
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
            {displayTitle}
          </h1>
        </div>
      </div>

      {/* Right Actions: Clear Chat & Theme Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {hasMessages && (
          <button
            onClick={onClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200/70 dark:border-red-900/60 transition-colors"
            title="Clear current chat"
            aria-label="Clear current chat"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Clear Chat</span>
          </button>
        )}

        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
}
