import React from 'react';
import { Plus, MessageSquare, Trash2, X, Bot, Sparkles } from 'lucide-react';

export function Sidebar({
  conversations,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 flex flex-col bg-gray-900 text-gray-100 border-r border-gray-800 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base tracking-tight text-white leading-tight">
                Smart AI Chatbot
              </h2>
              <p className="text-[11px] text-gray-300 font-medium">
                AI Assistant Interface
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm hover:shadow-emerald-900/30"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Chat</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-100 bg-emerald-700/80 rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Chat History Section */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="flex items-center justify-between px-2 pb-2 text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
            <span>Chat History</span>
            <span className="text-[10px] font-normal text-gray-400">
              {conversations.length} {conversations.length === 1 ? 'chat' : 'chats'}
            </span>
          </div>

          {conversations.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-400 px-4">
              No previous chats yet. Start a new conversation!
            </div>
          ) : (
            conversations.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <div
                  key={chat.id}
                  onClick={() => {
                    onSelectChat(chat.id);
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={`group relative flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-all border-l-4 ${
                    isActive
                      ? 'bg-gray-800 text-white font-semibold border-emerald-500 shadow-sm'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-gray-800/60'
                  }`}
                  title={chat.title || 'Untitled Chat'}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <MessageSquare
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-emerald-400' : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                    />
                    <span className="truncate">
                      {chat.title || 'New Conversation'}
                    </span>
                  </div>

                  {/* Active Indicator & Delete action */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1"
                        title="Current active chat"
                      />
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-gray-400 hover:text-red-400 hover:bg-gray-700/70 transition-all"
                      title="Delete conversation"
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Info */}
        <div className="p-3 border-t border-gray-800 bg-gray-950/60">
          <div className="flex items-center justify-between px-2 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-gray-200">Mock Engine Ready</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      </aside>
    </>
  );
}
