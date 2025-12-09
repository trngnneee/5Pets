export const clientOrderCreate = async (finalData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(finalData)
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Tạo đơn hàng thất bại");
  }

  return data;
}

export const clientOrderDetail = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/detail/${id}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy thông tin đơn hàng thất bại");
  }

  return data;
}