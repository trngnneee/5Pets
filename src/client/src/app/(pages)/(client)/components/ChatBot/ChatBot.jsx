"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { chatBot } from "@/lib/clientAPI/chatbot";
import { BotMessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;

    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    const promise = await chatBot({
      message: userMsg,
    });
    if (promise.code == "success") {
      const botReply = promise.response;
      setMessages(prev => [...prev, { role: "bot", text: botReply }]);
    }

    setLoading(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          className="fixed bottom-5 right-5 z-50 rounded-full bg-[var(--main-color)] hover:bg-[var(--main-color)] text-white p-4 shadow-lg"
        >
          <BotMessageSquare size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="w-[350px] flex justify-center p-4"
        style={{
          transform: "translateX(-10%)",
        }}
      >
        <div
          className="w-[300px]"
        >
          <div className="text-[20px] font-semibold mb-5">🤖 5Pets AI</div>

          <div
            className="h-[350px] overflow-y-auto mb-2 flex flex-col gap-2"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-md ${m.role === "user"
                  ? "self-end bg-blue-100 text-right"
                  : "self-start bg-gray-100 text-left"
                  }`}
              >
                <b>{m.role === "user" ? "Bạn" : "AI"}:</b> {m.text}
              </div>
            ))}
            {loading && (
              <div className="self-start text-gray-500 italic">Đang trả lời...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-3">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Hỏi về thú cưng..."
              style={{ width: "100%" }}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              className={"w-[80%]"}
            />

            <Button
              onClick={sendMessage}
              disabled={loading}
              className="bg-[var(--main-color)] hover:bg-[var(--main-color)] text-white"
            >
              Gửi
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}