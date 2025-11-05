export const adminCreateCategory = async (formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/create`, {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Tạo danh mục thất bại");
  }

  return data;
}

export const adminCategoryAllList = async (params = "") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/list/all`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy danh sách tất cả danh mục thất bại");
  }

  return data;
}

export const adminCategoryList = async (params = "") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/list?${params}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy danh mục thất bại");
  }

  return data;
}

export const adminCategoryDetail = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/detail/${id}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy chi tiết danh mục thất bại");
  }

  return data;
}

export const adminCategoryUpdate = async (id, formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/update/${id}`, {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Cập nhật danh mục thất bại");
  }

  return data;
}