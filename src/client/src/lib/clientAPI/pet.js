export const clientPetList = async (limit = "") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/list` + (limit ? `?limit=${limit}` : ""), {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy thú cưng thất bại");
  }

  return data;
}