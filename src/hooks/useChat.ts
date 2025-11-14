import { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// 统一后端 API 基础地址：开发环境使用相对路径，生产环境使用环境变量
const API_BASE_URL = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL || 'https://api.rowlandw3ai.shop' || 'https://mastra-food-app.zengjx1998.workers.dev');

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  sendQuickAction: (dishName: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          threadId,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || t('chat.error'));
      }

      // Update threadId for conversation continuity
      if (data.threadId) {
        setThreadId(data.threadId);
      }

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const msg = err instanceof Error ? err.message : t('chat.error');
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [threadId, language, t]);

  const sendQuickAction = useCallback(async (dishName: string) => {
    const quickQuery = language === 'zh-CN'
      ? `${dishName}怎么做？`
      : `How to make ${dishName}?`;
    await sendMessage(quickQuery);
  }, [sendMessage, language]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setThreadId(null);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    sendQuickAction,
    clearMessages,
  };
};
