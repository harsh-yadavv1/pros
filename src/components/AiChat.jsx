"use client";

import { useState, useRef, useEffect } from "react";

export default function AiChat({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const MAX_MESSAGES = 100;

  let debounceTimer = null;

  const sendMessage = async () => {
    if (!input.trim() || debounceTimer) return;

    debounceTimer = setTimeout(() => (debounceTimer = null), 1000);

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg].slice(-MAX_MESSAGES));
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) =>
        [...prev, { role: "assistant", content: data.reply }].slice(
          -MAX_MESSAGES
        )
      );
    } catch {
      setMessages((prev) =>
        [
          ...prev,
          { role: "assistant", content: "Connection error. Try again!" },
        ].slice(-MAX_MESSAGES)
      );
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="w-full sm:w-[360px] max-w-full h-[80vh] mb-[50px] sm:mb-0 sm:h-[500px] flex flex-col bg-[var(--portfolio-secondary-bg)] border border-[var(--main-color)] rounded-2xl shadow-lg overflow-hidden relative text-[var(--portfolio-text-color)]">
      {/* Header */}
      <div className="bg-[var(--portfolio-bg-color)] border-b border-[var(--main-color)] p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-lg font-semibold">HarshAI</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages([])}
            title="Clear Chat"
            className="text-[var(--main-color)] hover:text-[var(--accent-color)] text-xl"
          >
            <i className="bx bx-trash"></i>
          </button>
          <button
            onClick={onClose}
            title="Close"
            className="text-red-600 hover:text-red-800 text-2xl"
          >
            <i className="bx bx-x"></i>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom">
        {messages.length === 0 && (
          <div className="text-center text-[var(--text-light)] mt-20">
            <div className="mb-4 flex justify-center">
              <img
                src="/harshai.png"
                alt="HarshAI Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md"
              />
            </div>
            <p>Start a conversation with HarshAI</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm break-words whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[var(--main-color)] text-[var(--text-lightt)] rounded-br-md"
                  : "bg-[var(--portfolio-bg-color)] text-[var(--portfolio-text-color)] border border-[var(--main-color)] rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 bg-[var(--portfolio-bg-color)] text-[var(--portfolio-text-color)] rounded-2xl border border-[var(--main-color)]">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-[var(--portfolio-bg-color)] border-t border-[var(--main-color)] px-4 py-4">
        <div className="flex flex-row gap-2 items-center">
          <input
            className="flex-1 bg-[var(--portfolio-secondary-bg)] border border-[var(--main-color)] 
                 px-4 py-4 rounded-xl text-sm focus:outline-none 
                 focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent 
                 transition-all"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="h-12 w-12 flex items-center justify-center 
                 bg-[var(--main-color)] hover:bg-[var(--accent-color)]  hover:text-[var(--portfolio-text-color)]
                 text-[var(--text-lightt)] rounded-xl transition-colors duration-200 
                 shadow-sm hover:shadow-md text-xl"
          >
            <i className="bx bx-send"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
