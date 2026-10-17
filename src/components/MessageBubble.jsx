import React, { useState } from 'react';
import { Bot, User, Copy, Check, AlertCircle } from 'lucide-react';

export function MessageBubble({ message }) {
  const isUser = message.sender === 'user';
  const isError = Boolean(message.isError);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleCopyCode = (codeText, index) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Helper to render bold text
  const renderBoldText = (segment, keyPrefix) => {
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const pieces = [];
    let lastIdx = 0;
    let match;

    while ((match = boldRegex.exec(segment)) !== null) {
      if (match.index > lastIdx) {
        pieces.push(segment.substring(lastIdx, match.index));
      }
      pieces.push(
        <strong key={`${keyPrefix}-bold-${match.index}`} className="font-semibold text-gray-900 dark:text-white">
          {match[1]}
        </strong>
      );
      lastIdx = match.index + match[0].length;
    }

    if (lastIdx < segment.length) {
      pieces.push(segment.substring(lastIdx));
    }

    return pieces.length > 0 ? pieces : segment;
  };

  // Helper to render text with inline code and bold formatting
  const renderInlineText = (textSegment) => {
    const inlineCodeRegex = /`([^`]+)`/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = inlineCodeRegex.exec(textSegment)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderBoldText(textSegment.substring(lastIndex, match.index), `sub-${lastIndex}`));
      }
      parts.push(
        <code
          key={`inline-${match.index}`}
          className="px-1.5 py-0.5 mx-0.5 rounded text-xs font-mono bg-gray-100 dark:bg-gray-800 text-emerald-600 dark:text-emerald-300 font-medium"
        >
          {match[1]}
        </code>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < textSegment.length) {
      parts.push(renderBoldText(textSegment.substring(lastIndex), `sub-${lastIndex}`));
    }

    return parts.length > 0 ? parts : renderBoldText(textSegment, 'root');
  };

  // Parse code blocks vs regular text
  const renderContent = (fullText) => {
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\s*([\s\S]*?)```/g;
    const blocks = [];
    let lastIdx = 0;
    let match;
    let blockIndex = 0;

    while ((match = codeBlockRegex.exec(fullText)) !== null) {
      if (match.index > lastIdx) {
        blocks.push({
          type: 'text',
          content: fullText.substring(lastIdx, match.index),
        });
      }

      blocks.push({
        type: 'code',
        index: blockIndex++,
        language: match[1]?.trim() || 'code',
        content: match[2]?.trim() || '',
      });

      lastIdx = match.index + match[0].length;
    }

    if (lastIdx < fullText.length) {
      blocks.push({
        type: 'text',
        content: fullText.substring(lastIdx),
      });
    }

    if (blocks.length === 0) {
      return (
        <p className="whitespace-pre-wrap leading-relaxed">
          {renderInlineText(fullText)}
        </p>
      );
    }

    return (
      <div className="space-y-3">
        {blocks.map((block, i) => {
          if (block.type === 'code') {
            const isCodeCopied = copiedCodeIndex === block.index;
            return (
              <div
                key={`code-${i}`}
                className="my-2.5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700/80 bg-gray-950 text-gray-100 shadow-sm"
              >
                {/* Code Block Header with Language and Visible Copy Button */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs">
                  <span className="uppercase text-[11px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                    {block.language}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(block.content, block.index)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors text-xs font-medium"
                    title="Copy code to clipboard"
                    aria-label="Copy code to clipboard"
                  >
                    {isCodeCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                        <span>Copy code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Block Content */}
                <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed bg-gray-950 text-emerald-300 dark:text-emerald-300">
                  <code>{block.content}</code>
                </pre>
              </div>
            );
          }

          return (
            <p key={`text-${i}`} className="whitespace-pre-wrap leading-relaxed">
              {renderInlineText(block.content)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`flex items-start gap-3 my-4 group ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
          isUser
            ? 'bg-blue-600 text-white'
            : isError
            ? 'bg-red-500 text-white shadow-red-500/20'
            : 'bg-emerald-600 text-white shadow-emerald-500/20'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Bubble Container */}
      <div
        className={`flex flex-col max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        {/* Author Label & Timestamp */}
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
            {isUser ? 'You' : isError ? 'System Notice' : 'Smart AI'}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-400">
            {message.timestamp}
          </span>
        </div>

        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm sm:text-[15px] shadow-sm transition-all ${
            isUser
              ? 'bg-emerald-600 text-white rounded-tr-sm'
              : isError
              ? 'bg-red-50/80 dark:bg-red-950/30 text-red-900 dark:text-red-200 border border-red-200 dark:border-red-900/50 rounded-tl-sm'
              : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 rounded-tl-sm'
          }`}
        >
          {renderContent(message.text)}
        </div>

        {/* Message Actions */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopyMessage}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 py-1 px-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 transition-colors"
              title="Copy entire response"
              aria-label="Copy entire response"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Copy message</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
