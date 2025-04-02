"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2, ShieldAlert } from 'lucide-react';

// Types
interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp?: string;
}

// Constants
const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'Hello! I am Ira, your medical AI assistant. I can help you with health-related questions and provide general medical information. Please note that I am not a replacement for professional medical care - always consult with a qualified healthcare provider for specific medical advice.',
};

const SYSTEM_PROMPT = `"You are a highly professional and knowledgeable Medical AI Assistant. Your sole purpose is to provide clear, structured, and easy-to-read health-related information.

- Always use bullet points, numbered lists, and headers to improve readability.
- Ensure responses are well-organized, with separate sections for causes, remedies, and when to seek medical attention.
- Avoid long paragraphs; instead, break information into digestible sections.
- Always end responses with a professional disclaimer, reminding users to consult a healthcare provider for personalized medical advice.

You must not answer non-medical questions. If asked, politely inform the user that you can only discuss medical and health-related topics."`;

const IRA_IMAGE = "https://media-hosting.imagekit.io/1b7a9c823d964ea2/Ira.png?Expires=1838141441&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=zepo1vWAC7UXA74FIhfEB7Z4kfcVGDaZ~Q~q3zPB6MVIMkrFAtszCFfkw7ZR0iohoHh2h1BalcVz63X0ZlQxp~U80JJJxBTWDVydY87608XwVur86k5OsleV5BVmD91UeMUmwEpyKGOwYEs8f5XKkeJOwt6MSDFqqaUbJZaSjKJ7fkDnDAaBq00qGDhjvP~1Mi9xDafVUXKg7Y-mOjbdKsZl9z-ch3JPthE7F2uUEG97hjQwae7aRoNzuEgvPI4-Fe8eGZMIXzG5yZC2nX2ipMlnmRUPRPH3Tjh0qlCX1THqeM1sz1ErR7x33BpnHL-ODOFUU3Czkos2c7c4PuJtJg__";

function Assistant() {
  // State
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    setMessages(prevMessages => 
      prevMessages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp || new Date().toLocaleTimeString(),
      }))
    );
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handlers
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

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
          "X-Title": " Medical Assistant"
        },
        body: JSON.stringify({
          model: "sophosympatheia/rogue-rose-103b-v0.2:free",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: "user", content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server.');
      }

      const data = await response.json();
      const trimmedResponse = data.choices[0].message.content.replace(/(?:\r\n|\r|\n)/g, ' ').trim();
      const formattedResponse = formatResponse(trimmedResponse);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: formattedResponse,
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

  const formatResponse = (response: string) => {
    const sections = response.split('\n\n').map(section => {
      const points = section.split('. ').map(point => `• ${point.trim()}`).join('\n');
      return points;
    });
    return sections.join('\n\n');
  };

  // Render message component
  const renderMessage = (message: Message, index: number) => (
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
          <img src={IRA_IMAGE} alt="AI Assistant" className="w-12 h-10 object-cover rounded-2xl" />
        ) : (
          <User  className="w-6 h-6 text-white" />
        )}
      </div>
      <div className="flex-1 max-w-[80%]">
        <div className={`px-6 py-4 rounded-2xl ${
          message.role === 'assistant' 
            ? 'bg-white/10 text-white/90' 
            : 'bg-white/20 text-white'
        }`}>
          <pre className="whitespace-pre-wrap">{message.content}</pre>
        </div>
        <div className="mt-1 text-xs text-white/40 px-6">
          {message.timestamp}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Chat Messages */}
          <div ref={chatContainerRef} className="h-[calc(100vh-320px)] overflow-y-auto p-6 scroll-smooth">
            {messages.map(renderMessage)}
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <img src={IRA_IMAGE} alt="AI Assistant" className="w-12 h-10 object-cover rounded-2xl" />
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

          {/* Input Area */}
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

            {/* Disclaimer */}
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

export default Assistant;