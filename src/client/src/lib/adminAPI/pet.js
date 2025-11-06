export const adminCreatePet = async (formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pet/create`, {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Tạo thú cưng thất bại");
  }

  return data;
}

export const adminPetList = async (params = "") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pet/list?${params}`, {
    method: "GET"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy danh sách thú cưng thất bại");
  }

  return data;
}

export const adminPetDetail = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pet/detail/${id}`, {
    method: "GET"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy chi tiết thú cưng thất bại");
  }

  return data;
}

export const adminPetUpdate = async (id, formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pet/update/${id}`, {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Cập nhật thú cưng thất bại");
  }

  return data;
}