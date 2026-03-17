import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bot, MessageSquare, RotateCcw, Send, Sparkles, User, X } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot = () => {
  const initialBotMessage: Message = {
    role: 'model',
    text: "Hi, I'm Mostafa's assistant. Ask me about his skills, experience, or projects.",
  };
  const baseQuickPrompts = [
    'What are his top skills?',
    'Tell me about recent projects',
    'How can I contact him?',
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(baseQuickPrompts);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFollowUpPrompts = (question: string): string[] => {
    const lower = question.toLowerCase();
    if (lower.includes('skill')) {
      return [
        'Which backend stack does he prefer?',
        'Can you summarize frontend strengths?',
        'What tools does he use daily?',
      ];
    }
    if (lower.includes('project')) {
      return [
        'Which project is best for enterprise?',
        'What impact did these projects deliver?',
        'Which technologies were most used?',
      ];
    }
    if (lower.includes('contact') || lower.includes('email')) {
      return [
        'Can you draft a short intro message for me?',
        'What type of projects is he open to?',
        'How quickly does he usually respond?',
      ];
    }
    if (lower.includes('experience') || lower.includes('work')) {
      return [
        'What did he do at TechNova Systems?',
        'How many years of experience does he have?',
        'Has he led teams before?',
      ];
    }
    return baseQuickPrompts;
  };

  const resetConversation = () => {
    if (isLoading) return;
    setMessages([initialBotMessage]);
    setSuggestedPrompts(baseQuickPrompts);
    setInput('');
  };

  const submitMessage = async (rawText?: string) => {
    const text = (rawText ?? input).trim();
    if (!text || isLoading) return;
    const userMessage: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const response = await chatWithGemini(text, history);
      if (response) {
        setMessages((prev) => [...prev, { role: 'model', text: response }]);
      }
      setSuggestedPrompts(getFollowUpPrompts(text));
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: "Sorry, I couldn't respond right now. Please try again in a moment.",
        },
      ]);
      setSuggestedPrompts(baseQuickPrompts);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            className="absolute bottom-[4rem] right-0 w-[calc(100vw-1rem)] max-w-[390px] h-[72svh] sm:h-[70vh] max-h-[580px] glass rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
          >
            <div className="p-4 sm:p-6 bg-gradient-to-r from-primary/20 to-secondary/10 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shadow-inner">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold tracking-tight">NAG-DEY Assistant</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetConversation}
                  disabled={isLoading}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all disabled:opacity-50"
                  title="Restart chat"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all hover:rotate-90"
                  title="Close"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 scrollbar-hide bg-slate-950/20">
              {messages.length === 1 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Try one of these quick starters
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {baseQuickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => submitMessage(prompt)}
                        disabled={isLoading}
                        className="text-xs px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors disabled:opacity-60"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg ${msg.role === 'user' ? 'bg-primary/20' : 'bg-slate-800'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-slate-400" />}
                    </div>
                    <div className={`p-3.5 sm:p-4 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                      ? 'bg-primary text-slate-950 rounded-tr-none font-medium'
                      : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5 backdrop-blur-md'
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 backdrop-blur-md">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">AI is crafting a response...</span>
                  </div>
                </div>
              )}

              {messages.length > 1 && !isLoading && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Suggested follow-up</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => submitMessage(prompt)}
                        className="text-xs px-3 py-2 rounded-xl border border-white/10 bg-slate-900/40 text-slate-200 hover:bg-white/10 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 sm:p-6 bg-slate-900/40 border-t border-white/10 backdrop-blur-xl">
              <div className="relative group">
                <input
                  type="text"
                  maxLength={240}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      submitMessage();
                    }
                  }}
                  placeholder="Ask about Mostafa's work..."
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-4 sm:pl-5 pr-14 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-600 shadow-inner"
                />
                <button
                  onClick={() => submitMessage()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-slate-950 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-primary/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>Press Enter to send</span>
                <span>{input.length}/240</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group relative ${isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-primary text-slate-950'
          }`}
      >
        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />}
        {!isOpen && (
          <span className="absolute right-full mr-4 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-white/10 hidden sm:block">
            Chat with AI
          </span>
        )}
      </motion.button>
    </div>
  );
};
