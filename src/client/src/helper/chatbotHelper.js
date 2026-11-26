// Mở khung chat AI từ bất kỳ đâu (vd: nút "Chat với 5Pets" ở trang chi tiết)
export const CHATBOT_OPEN_EVENT = "open-chatbot";

export const openChatbot = (message = "") => {
  window.dispatchEvent(new CustomEvent(CHATBOT_OPEN_EVENT, { detail: { message } }));
}
