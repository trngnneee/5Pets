"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { chatBot } from "@/lib/clientAPI/chatbot";
import { BotMessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
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
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          type: "text",
          text: "Có lỗi xảy ra, bạn thử lại nhé 😥",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="fixed bottom-5 right-5 z-50 rounded-full bg-[var(--main-color)] text-white p-4 shadow-lg">
          <BotMessageSquare size={24} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="center"
        className="w-[350px] p-4"
        style={{ transform: "translateX(-10%)" }}
      >
        <div className="w-[300px]">
          <div className="text-[20px] font-semibold mb-3">
            🤖 5Pets AI
          </div>

          {/* ===== MESSAGES ===== */}
          <div className="h-[350px] overflow-y-auto flex flex-col gap-2 mb-3">
            {messages.map((m, i) => {
              /* ===== TEXT MESSAGE ===== */
              if (m.type === "text") {
                return (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-md whitespace-pre-line ${
                      m.role === "user"
                        ? "self-end bg-blue-100 text-right"
                        : "self-start bg-gray-100 text-left"
                    }`}
                  >
                    <div className="font-semibold mb-1">
                      {m.role === "user" ? "Bạn" : "AI"}
                    </div>
                    <div>{m.text || m.message}</div>
                  </div>
                );
              }

              /* ===== ORDER LIST ===== */
              if (m.type === "order_list") {
                const orders = Array.isArray(m.orders) ? m.orders : [];

                return (
                  <div
                    key={i}
                    className="self-start bg-gray-100 rounded-md p-3 w-full"
                  >
                    <div className="font-semibold mb-2">
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
                          className="bg-white border rounded-md p-2 mb-2"
                        >
                          <div className="text-sm font-medium mb-2">
                            🧾 Mã đơn: {order.order_id || "---"}
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
                              <div className="w-[40px] h-[40px] overflow-hidden rounded bg-gray-200">
                                {item?.imageList?.[0] && (
                                  <img
                                    src={item.imageList[0]}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>

                              <div className="text-xs">
                                <div className="font-semibold">
                                  {item.name || "Sản phẩm"}
                                </div>
                                <div>
                                  SL: {item.quantity || 0} ×{" "}
                                  {Number(item.price || 0).toLocaleString(
                                    "vi-VN"
                                  )}{" "}
                                  VND
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="text-sm font-semibold text-right mt-1">
                            Tổng:{" "}
                            {Number(order.total || 0).toLocaleString("vi-VN")} VND
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
              <div className="self-start text-gray-500 italic">
                Đang trả lời...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ===== INPUT ===== */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về thú cưng, đơn hàng..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              disabled={loading}
              className="bg-[var(--main-color)] text-white"
            >
              Gửi
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
