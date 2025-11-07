export const clientCategoryList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/list`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy danh mục thất bại");
  }

  return data;
}