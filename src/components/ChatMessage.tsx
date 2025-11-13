import React from 'react';
import type { ChatMessage as ChatMessageType } from '../hooks/useChat';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatMessageProps {
  message: ChatMessageType;
  onQuickAction?: (dishName: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onQuickAction }) => {
  const { t } = useLanguage();
  const isUser = message.role === 'user';

  // Extract potential dish names from assistant messages (simple heuristic)
  const extractDishNames = (content: string): string[] => {
    // Look for quoted dish names or capitalized words that might be dishes
    const quoted = content.match(/"([^"]+)"|「([^」]+)」/g);
    if (quoted) {
      return quoted.map(q => q.replace(/[""「」]/g, '').trim());
    }
    return [];
  };

  const dishNames = !isUser ? extractDishNames(message.content) : [];

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>

        {/* Quick action button for assistant messages with dish names */}
        {!isUser && dishNames.length > 0 && onQuickAction && (
          <div className="mt-2 flex flex-wrap gap-2">
            {dishNames.slice(0, 3).map((dish, index) => (
              <button
                key={index}
                onClick={() => onQuickAction(dish)}
                className="text-xs px-2 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
              >
                {t('chat.quickAction')} "{dish}"
              </button>
            ))}
          </div>
        )}

        <div className="text-xs opacity-60 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
