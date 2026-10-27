import { useEffect, useRef, useState } from 'react';
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16, x: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16, x: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-[4.5rem] right-0 w-[calc(100vw-2rem)] max-w-[390px] h-[72svh] sm:h-[70vh] max-h-[580px] rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200/60 dark:border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/20 dark:bg-primary/25 backdrop-blur-md border border-primary/20 flex items-center justify-center shadow-inner">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold tracking-tight text-slate-950 dark:text-white">
                    NAG-DEY Assistant
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetConversation}
                  disabled={isLoading}
                  className="p-2 hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-xl transition-all disabled:opacity-50 text-slate-500 dark:text-slate-400"
                  title="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-xl transition-all hover:rotate-90 text-slate-500 dark:text-slate-400"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5 scrollbar-hide bg-slate-50/40 dark:bg-slate-950/40 backdrop-blur-sm">
              {messages.length === 1 && (
                <div className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
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
                        className="text-xs px-3 py-2 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:border-primary/40 dark:hover:bg-white/10 transition-colors disabled:opacity-60"
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
                  <div
                    className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300'}`}
                    >
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-primary/95 text-white rounded-tr-none font-medium backdrop-blur-md'
                          : 'bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/70 dark:border-white/10 backdrop-blur-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center bg-white/80 dark:bg-slate-900/80 p-3.5 sm:p-4 rounded-2xl rounded-tl-none border border-slate-200/70 dark:border-white/10 backdrop-blur-md shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      AI is crafting a response...
                    </span>
                  </div>
                </div>
              )}

              {messages.length > 1 && !isLoading && (
                <div className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 space-y-3 shadow-sm">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    Suggested follow-up
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => submitMessage(prompt)}
                        className="text-xs px-3 py-2 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:border-primary/40 dark:hover:bg-white/10 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3.5 sm:p-4 bg-white/80 dark:bg-slate-900/80 border-t border-slate-200/60 dark:border-white/10 backdrop-blur-xl">
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
                  className="w-full bg-white/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 rounded-2xl py-3 sm:py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 backdrop-blur-sm"
                />
                <button
                  onClick={() => submitMessage()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 bg-primary/95 text-white rounded-xl hover:bg-primary hover:scale-105 transition-all disabled:opacity-40 disabled:hover:scale-100 shadow-md shadow-primary/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1">
                <span>Press Enter to send</span>
                <span>{input.length}/240</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button with Glassmorphism */}
      <motion.button
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 group relative backdrop-blur-xl border border-white/25 shadow-[0_8px_28px_rgba(0,0,0,0.25)] ${
          isOpen
            ? 'bg-slate-900/85 text-white rotate-90 shadow-slate-950/50'
            : 'bg-primary/80 hover:bg-primary/95 text-white shadow-primary/30 hover:shadow-primary/50'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
        {!isOpen && (
          <span className="absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-white/10 hidden sm:block">
            Chat with AI
          </span>
        )}
      </motion.button>
    </div>
  );
};
