
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, BrainCircuit, RefreshCcw } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello Sarah! I'm your Nexus AI HR Assistant. How can I help you today? I can help draft performance reviews, generate job descriptions, or answer policy questions." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response || 'Sorry, I encountered an issue. Please try again.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred while connecting to the AI service.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const templates = [
    "Write a job description for a Senior Frontend Engineer",
    "Draft a performance review for Michael Chen (Exceeds Expectations)",
    "Explain our Remote Work policy based on common standards",
    "How to handle a difficult performance conversation?"
  ];

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-500 fill-indigo-500/20" />
            Nexus AI HR Assistant
          </h1>
          <p className="text-slate-500">Intelligent automation for your HR workflows.</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          {/* Chat Window */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-indigo-600'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-indigo-600 flex items-center justify-center animate-pulse">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center border border-slate-100">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me to help draft a review, job post, or policy..."
                className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm text-slate-800"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4 hidden lg:block">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-4">
              <BrainCircuit className="w-5 h-5 text-indigo-500" />
              Quick Prompts
            </div>
            <div className="space-y-2">
              {templates.map((t, i) => (
                <button 
                  key={i} 
                  onClick={() => setInput(t)}
                  className="w-full text-left p-3 text-xs bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 rounded-xl transition-all border border-transparent hover:border-indigo-100"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              AI Insights
            </h3>
            <p className="text-xs text-indigo-100 leading-relaxed mb-4">
              I can analyze employee sentiment or summarize meeting transcripts if provided. How can I speed up your day?
            </p>
            <button className="flex items-center gap-2 text-xs font-bold py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg transition-all">
              <RefreshCcw className="w-3 h-3" /> Reset Context
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
