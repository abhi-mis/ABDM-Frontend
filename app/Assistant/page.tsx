"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, ShieldAlert } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp?: string; // Make timestamp optional initially
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your medical AI assistant. I can help you with health-related questions and provide general medical information. Please note that I am not a replacement for professional medical care - always consult with a qualified healthcare provider for specific medical advice.',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Set timestamps once the component mounts on the client
  useEffect(() => {
    setMessages(prevMessages => 
      prevMessages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp || new Date().toLocaleTimeString(),
      }))
    );
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date().toLocaleTimeString()
    }]);

    setIsLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Medical Assistant"
        },
        body: JSON.stringify({
          model: "sophosympatheia/rogue-rose-103b-v0.2:free",
          messages: [
            {
              role: "system",
              content: "You are a medical AI assistant. Only provide health-related information and medical suggestions. For any non-medical questions, politely explain that you can only discuss health topics. Always remind users to consult healthcare professionals for specific medical advice."
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user",
              content: userMessage
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server.');
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again later.',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div ref={chatContainerRef} className="h-[calc(100vh-320px)] overflow-y-auto p-6 scroll-smooth">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 mb-6 ${message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${
                  message.role === 'assistant' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {message.role === 'assistant' ? (
                    <Bot className="w-6 h-6 text-white" />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 max-w-[80%]">
                  <div className={`px-6 py-4 rounded-2xl ${
                    message.role === 'assistant' 
                      ? 'bg-white/10 text-white/90' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {message.content}
                  </div>
                  <div className="mt-1 text-xs text-white/40 px-6">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 max-w-[80%]">
                  <div className="px-6 py-4 rounded-2xl bg-white/10">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 text-white/90 animate-spin" />
                      <span className="text-white/60">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-white/20 bg-black/20 p-6">
            <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a health-related question..."
                className="flex-1 bg-white/10 text-white placeholder-white/50 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center gap-2 font-medium"
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </form>

            <div className="flex items-start gap-3 text-white/60 text-sm bg-white/5 rounded-xl p-4">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>
                This AI assistant provides general health information only. It is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
