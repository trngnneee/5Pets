"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;

    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "bot", text: data.answer || "AI không có câu trả lời" },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "❌ Không kết nối được AI" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 320,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 10,
        zIndex: 9999,
      }}
    >
      <h4>🤖 5Pets AI (Test)</h4>

      <div
        style={{
          height: 220,
          overflowY: "auto",
          marginBottom: 8,
          fontSize: 14,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              marginBottom: 4,
            }}
          >
            <b>{m.role === "user" ? "Bạn" : "AI"}:</b> {m.text}
          </div>
        ))}
        {loading && <i>Đang trả lời...</i>}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Hỏi về thú cưng..."
        style={{ width: "100%" }}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        style={{ width: "100%", marginTop: 6 }}
      >
        Gửi
      </button>
    </div>
  );
}
