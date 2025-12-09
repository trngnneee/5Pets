export const adminOrderList = async (params) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/order/list` + (params != null ? `?${params}` : ""), { 
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy thông tin đơn hàng thất bại");
  }

  return data;
}

export const adminOrderUpdate = async (finalData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/order/update`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(finalData),
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Cập nhật thông tin đơn hàng thất bại");
  }

  return data;
}