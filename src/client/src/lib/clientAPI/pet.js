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

export const clientPetListByCategory = async (category, params = "") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/list/${category}?${params}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy thú cưng thất bại");
  }

  return data;
}

export const clientPetDetail = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/detail/${id}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy chi tiết thú cưng thất bại");
  }

  return data;
}

export const clientPetSearch = async (keyword) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/search?keyword=${encodeURIComponent(keyword)}`, {
    method: "GET"
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Tìm kiếm thú cưng thất bại");
  }

  return data;
}
