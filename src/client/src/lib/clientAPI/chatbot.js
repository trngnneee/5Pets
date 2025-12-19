export const chatBot = async (finalData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatbot/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Chatbot request thất bại");
  }

  return data;
}