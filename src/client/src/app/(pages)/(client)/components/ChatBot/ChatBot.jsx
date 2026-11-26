"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { chatBot } from "@/lib/clientAPI/chatbot";
import { CHATBOT_OPEN_EVENT } from "@/helper/chatbotHelper";
import { BotMessageSquare, ReceiptText, SendHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "Nên nuôi chó hay mèo khi sống ở chung cư?",
  "Giống chó nào phù hợp với gia đình có trẻ nhỏ?",
  "Cách chăm sóc mèo con mới về nhà",
];

const formatPrice = (value) => Number(value || 0).toLocaleString("vi-VN");

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  // Cho phép nơi khác mở chat (kèm câu hỏi gợi ý)
  useEffect(() => {
    const handleOpen = (e) => {
      setOpen(true);
      if (e.detail?.message) setInput(e.detail.message);
      setTimeout(() => inputRef.current?.focus(), 50);
    };
    window.addEventListener(CHATBOT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CHATBOT_OPEN_EVENT, handleOpen);
  }, []);

  const sendMessage = async (text = input) => {
    const userMessage = text.trim();
    if (!userMessage || loading) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", type: "text", text: userMessage },
    ]);

    setLoading(true);

    try {
      const res = await chatBot({ message: userMessage });

      if (res?.code === "success" && res.response) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            type: res.response.type || "text",
            ...res.response,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            type: "text",
            text: "Xin lỗi, mình chưa thể xử lý yêu cầu này.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          type: "text",
          text: "Có lỗi kết nối, bạn thử gửi lại sau ít phút nhé.",
        },
      ]);
    }

    setLoading(false);
  };

  // Dùng submit của form thay vì bắt phím Enter: không gửi nhầm khi đang gõ dấu tiếng Việt (IME)
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-label={open ? "Đóng trợ lý AI" : "Mở trợ lý AI 5Pets"}
          title="Trợ lý AI 5Pets"
          className="fixed bottom-5 right-5 z-50 size-14 rounded-full bg-[var(--main-color)] hover:bg-[var(--main-hover)] text-white shadow-lg [&_svg:not([class*='size-'])]:size-6"
        >
          {open ? <X aria-hidden="true" /> : <BotMessageSquare aria-hidden="true" />}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        className="w-[min(380px,calc(100vw-2rem))] p-0 overflow-hidden rounded-2xl"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        {/* ===== HEADER ===== */}
        <div className="flex items-center gap-3 bg-[var(--main-color)] px-4 py-3 text-white">
          <div className="flex size-9 items-center justify-center rounded-full bg-white/15" aria-hidden="true">
            <BotMessageSquare className="size-5" />
          </div>
          <div className="flex-1">
            <div className="font-semibold leading-tight">5Pets AI</div>
            <div className="text-xs text-white/80">Trợ lý tư vấn thú cưng & đơn hàng</div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng"
            className="flex size-8 items-center justify-center rounded-full hover:bg-white/15 outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* ===== MESSAGES ===== */}
        <div
          role="log"
          aria-live="polite"
          aria-label="Hội thoại với trợ lý AI"
          className="h-[350px] max-h-[55vh] overflow-y-auto overscroll-contain flex flex-col gap-2 p-4 text-sm"
        >
          {messages.length === 0 && (
            <div className="flex flex-col gap-3">
              <div className="self-start max-w-[85%] rounded-2xl rounded-bl-sm bg-gray-100 px-3 py-2 text-[#00171F]">
                Xin chào! Mình là trợ lý AI của 5Pets. Bạn cần tư vấn chọn thú cưng hay tra cứu đơn hàng?
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-xs font-medium text-[#667479]">Gợi ý câu hỏi</div>
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-[var(--main-color)]/30 px-3 py-1.5 text-left text-xs text-[var(--main-color)] transition-colors hover:bg-[#FCEED5] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => {
            /* ===== TEXT MESSAGE ===== */
            if (m.type === "text") {
              const isUser = m.role === "user";
              return (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-2xl whitespace-pre-line break-words ${isUser
                    ? "self-end rounded-br-sm bg-[var(--main-color)] text-white"
                    : "self-start rounded-bl-sm bg-gray-100 text-[#00171F]"
                    }`}
                >
                  <span className="sr-only">{isUser ? "Bạn: " : "5Pets AI: "}</span>
                  {m.text || m.message}
                </div>
              );
            }

            /* ===== ORDER LIST ===== */
            if (m.type === "order_list") {
              const orders = Array.isArray(m.orders) ? m.orders : [];

              return (
                <div
                  key={i}
                  className="self-start bg-gray-100 rounded-2xl rounded-bl-sm p-3 w-full"
                >
                  <div className="font-semibold mb-2 text-[#00171F]">
                    {m.message || "Danh sách đơn hàng"}
                  </div>

                  {orders.length === 0 && (
                    <div className="text-sm text-gray-500 italic">
                      Không có đơn hàng nào
                    </div>
                  )}

                  {orders.map((order, orderIdx) => {
                    const details = Array.isArray(order.order_details)
                      ? order.order_details
                      : [];

                    return (
                      <div
                        key={orderIdx}
                        className="bg-white border rounded-lg p-2 mb-2 last:mb-0"
                      >
                        <div className="flex items-center gap-1.5 text-sm font-medium mb-2 break-all">
                          <ReceiptText className="size-4 shrink-0 text-[var(--main-color)]" aria-hidden="true" />
                          Mã đơn: {order.order_id || "---"}
                        </div>

                        {details.length === 0 && (
                          <div className="text-xs text-gray-500 italic">
                            Không có chi tiết đơn hàng
                          </div>
                        )}

                        {details.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex gap-2 mb-2 items-center"
                          >
                            <div className="w-[40px] h-[40px] shrink-0 overflow-hidden rounded bg-gray-200">
                              {item?.imageList?.[0] && (
                                <img
                                  src={item.imageList[0]}
                                  alt={item.name}
                                  loading="lazy"
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>

                            <div className="text-xs">
                              <div className="font-semibold">
                                {item.name || "Sản phẩm"}
                              </div>
                              <div className="tabular-nums">
                                SL: {item.quantity || 0} × {formatPrice(item.price)} VND
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="text-sm font-semibold text-right mt-1 tabular-nums">
                          Tổng: {formatPrice(order.total)} VND
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }

            return null;
          })}

          {loading && (
            <div className="self-start flex items-center gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-3 py-3" role="status">
              <span className="sr-only">Đang trả lời...</span>
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-[#667479] animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ===== INPUT ===== */}
        <form onSubmit={handleSubmit} className="flex gap-2 border-t p-3">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi về thú cưng, đơn hàng..."
            aria-label="Nhập câu hỏi cho trợ lý AI"
            enterKeyHint="send"
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] text-white"
          >
            <SendHorizontal aria-hidden="true" />
            Gửi
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
