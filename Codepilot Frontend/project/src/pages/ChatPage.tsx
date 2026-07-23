import { useEffect, useRef, useState } from 'react';
import { ToolHeader } from '@/components/ToolHeader';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { LoadingDots } from '@/components/Spinner';
import { CopyButton } from '@/components/CopyButton';
import { useSpeechToText } from '@/lib/useSpeechToText';
import { useToast } from '@/lib/toast';
import type { ChatMessage } from '@/lib/types';
import { MessageSquare, Send, Mic, MicOff, Trash2, User } from 'lucide-react';
import api from "../services/api";
import ReactMarkdown from "react-markdown";

const SAMPLE_AI =
  "Sure! Here's a quick tip: in React, prefer derived state over syncing state with props via useEffect. Compute values during render instead — it's simpler and avoids extra renders.";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { notify } = useToast();

  const { listening, toggle, supported } = useSpeechToText((text) => {
    setInput((prev) => (prev ? `${prev} ${text}` : text));
    notify('info', 'Voice captured — edit if needed');
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = { id: Math.random().toString(36).slice(2), role: 'user', content: text, timestamp: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
  setLoading(true);

  try {
    const response = await api.post("", {
      message: text,
    });

    const aiMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      role: "ai",
     content: response.data.message,
      timestamp: Date.now(),
    };

    setMessages((m) => [...m, aiMsg]);
 } catch (error: any) {
     console.error("Full Error:", error);

     if (error.response) {
       console.log("Status:", error.response.status);
       console.log("Response:", error.response.data);
     }

     const message =
       error.response?.data?.message ||
       error.response?.data ||
       "Something went wrong. Please try again.";

     notify("error", message);

   } finally {
     setLoading(false);
   }
  };

  const clearChat = () => {
    setMessages([]);
    notify('info', 'Chat cleared');
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
      <ToolHeader title="AI Chat" action={
        <Button variant="outline" size="sm" onClick={clearChat} disabled={!messages.length}>
          <Trash2 className="h-4 w-4" /> Clear Chat
        </Button>
      } />

      <div ref={scrollRef} className="glass flex-1 overflow-y-auto rounded-2xl p-4 md:p-6">
        {messages.length === 0 && !loading && (
          <EmptyState
            icon={<MessageSquare className="h-7 w-7" />}
            title="Start a conversation"
            description="Ask anything about your code, architecture, or best practices. Use the mic for hands-free input."
          />
        )}
        <div className="space-y-5">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'ai' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark text-[#04140D]">
                  <MessageSquare className="h-4 w-4" />
                </div>
              )}
              <div className={`max-w-[78%] ${m.role === 'user' ? 'order-2' : ''}`}>
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'btn-glow text-[#04140D]'
                    : 'glass text-white/85'
                }`}
              >
                {m.role === "ai" ? (
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
                {m.role === 'ai' && (
                  <div className="mt-2 flex items-center gap-2">
                    <CopyButton text={m.content} />
                  </div>
                )}
              </div>
              {m.role === 'user' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-base-card text-white/70">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark text-[#04140D]">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="glass flex items-center rounded-2xl px-4 py-3">
                <LoadingDots />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="glass mt-4 rounded-2xl p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Type your message... (Enter to send, Shift+Enter for newline)"
            className="max-h-40 flex-1 resize-none rounded-xl bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none"
          />
          <button
            onClick={toggle}
            disabled={!supported}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
              listening
                ? 'border-brand-primary bg-brand-primary/20 text-brand-primary animate-pulse-glow'
                : 'border-border text-white/70 hover:border-brand-primary/60 hover:text-brand-primary disabled:opacity-40'
            }`}
            title={supported ? 'Speech to text' : 'Speech recognition not supported'}
          >
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <Button onClick={send} disabled={!input.trim() || loading} className="h-11 px-5">
            <Send className="h-4 w-4" /> Send
          </Button>
        </div>
        {listening && <p className="mt-2 px-2 text-xs text-brand-primary">Listening... speak now</p>}
      </div>
    </div>
  );
}
