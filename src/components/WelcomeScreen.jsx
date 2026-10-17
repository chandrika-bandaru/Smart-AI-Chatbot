import React from 'react';
import { Sparkles, Code2, Lightbulb, Compass, MessageSquareText, ArrowUpRight } from 'lucide-react';

const SUGGESTIONS = [
  {
    icon: Code2,
    title: 'Code an algorithm',
    prompt: 'Write a JavaScript function to reverse a string and check for palindromes.',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
  },
  {
    icon: Lightbulb,
    title: 'Brainstorm ideas',
    prompt: 'Give me 5 unique product ideas for an AI-powered productivity app.',
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
  },
  {
    icon: Compass,
    title: 'Explain a concept',
    prompt: 'Explain how machine learning models learn patterns in simple words.',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
  },
  {
    icon: MessageSquareText,
    title: 'Draft a message',
    prompt: 'Draft a polite follow-up email to a client after a project demonstration.',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40',
  },
];

export function WelcomeScreen({ onSelectPrompt }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-3xl mx-auto w-full text-center">
      {/* Bot Icon with glowing badge */}
      <div className="relative mb-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
        How can I help you today?
      </h2>
      <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md">
        Select a suggestion below to start, or type any question into the message input.
      </p>

      {/* Suggested Starter Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full text-left">
        {SUGGESTIONS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectPrompt(item.prompt, false)}
              className="flex items-start justify-between p-3.5 sm:p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex items-start min-w-0 flex-1 mr-2">
                <div
                  className={`p-2 rounded-xl mr-3 flex-shrink-0 ${item.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {item.prompt}
                  </div>
                </div>
              </div>

              {/* Instant Start button icon */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPrompt(item.prompt, true);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
                title="Send immediately"
                aria-label={`Send prompt: ${item.title}`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
