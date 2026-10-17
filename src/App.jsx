import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { useTheme } from './hooks/useTheme';
import { sendChatMessage } from './services/chatService';
import { generateMockResponse } from './utils/mockAi';

const STORAGE_KEY = 'smart_ai_conversations';
const ACTIVE_KEY = 'smart_ai_active_id';

function createNewChatObject() {
  return {
    id: `chat-${Date.now()}`,
    title: 'New Conversation',
    messages: [],
    createdAt: new Date().toISOString(),
  };
}

function getInitialConversations() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fallback if corrupted
    }
  }

  // Initial default conversation
  return [
    {
      id: 'chat-default',
      title: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString(),
    },
  ];
}

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [conversations, setConversations] = useState(getInitialConversations);
  const [activeChatId, setActiveChatId] = useState(() => {
    const savedActive = localStorage.getItem(ACTIVE_KEY);
    return savedActive || conversations[0]?.id || 'chat-default';
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const inputRef = useRef(null);

  // Sync conversations to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  // Sync activeChatId to localStorage
  useEffect(() => {
    localStorage.setItem(ACTIVE_KEY, activeChatId);
  }, [activeChatId]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K for New Chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeConversation =
    conversations.find((c) => c.id === activeChatId) || conversations[0];
  const messages = activeConversation?.messages || [];

  const handleNewChat = () => {
    const newChat = createNewChatObject();
    setConversations((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setInputText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setInputText('');
  };

  const handleDeleteChat = (id) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        const fresh = createNewChatObject();
        setActiveChatId(fresh.id);
        return [fresh];
      }
      if (activeChatId === id) {
        setActiveChatId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleClearChat = () => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [], title: 'New Conversation' }
          : c
      )
    );
    setInputText('');
  };

  const handleSelectPrompt = (promptText, shouldAutoSend = false) => {
    if (shouldAutoSend) {
      handleSendMessage(promptText);
    } else {
      setInputText(promptText);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.selectionStart = inputRef.current.value.length;
          inputRef.current.selectionEnd = inputRef.current.value.length;
        }
      }, 50);
    }
  };

  const handleSendMessage = async (rawText) => {
    const textToSend = rawText || inputText;
    if (!textToSend.trim() || isTyping) return;

    const timeString = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: timeString,
    };

    // Calculate title update if this is the first message in the chat
    const isFirstMessage = messages.length === 0;
    const computedTitle = isFirstMessage
      ? textToSend.trim().length > 26
        ? textToSend.trim().slice(0, 26) + '...'
        : textToSend.trim()
      : activeConversation.title;

    // Previous history to pass to Gemini
    const conversationHistory = [...messages];

    // Append user message immediately
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            title: computedTitle,
            messages: [...c.messages, userMessage],
          };
        }
        return c;
      })
    );

    // Clear input
    setInputText('');

    // Trigger AI thinking / typing state
    setIsTyping(true);

    try {
      // Call backend Gemini API endpoint (/api/chat)
      const geminiReply = await sendChatMessage(textToSend.trim(), conversationHistory);

      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: geminiReply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeChatId) {
            return {
              ...c,
              messages: [...c.messages, aiMessage],
            };
          }
          return c;
        })
      );
    } catch (error) {
      console.warn('Backend Gemini API call error:', error.message);

      const errorText =
        error.message ||
        'Unable to process request with Google Gemini API. Please check your network and configuration.';

      const title =
        error.code === 'QUOTA_EXCEEDED'
          ? 'Quota / Rate Limit Exceeded'
          : error.code === 'HIGH_DEMAND'
          ? 'Temporary High Demand'
          : error.code === 'INVALID_API_KEY'
          ? 'Authentication Error'
          : error.code === 'MODEL_NOT_FOUND'
          ? 'Model Error'
          : 'API Notice';

      const errorMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        isError: true,
        text: `⚠️ **${title}:** ${errorText}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeChatId) {
            return {
              ...c,
              messages: [...c.messages, errorMessage],
            };
          }
          return c;
        })
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        <Header
          chatTitle={activeConversation?.title}
          hasMessages={messages.length > 0}
          onClearChat={handleClearChat}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Content: Welcome Screen or Message List */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {messages.length === 0 ? (
            <WelcomeScreen onSelectPrompt={handleSelectPrompt} />
          ) : (
            <MessageList messages={messages} isTyping={isTyping} />
          )}
        </main>

        {/* Bottom Input Area */}
        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}

export default App;
