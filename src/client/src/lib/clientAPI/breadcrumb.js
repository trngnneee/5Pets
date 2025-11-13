export const categoryBreadcrumbs = async (categoryID) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/breadcrumb/${categoryID}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy đường dẫn thất bại");
  }

  return data;
}

export const petBreadcrumbs = async (petID) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/breadcrumb/pet/${petID}`, {
    method: "GET",
  });
  const data = await res.json();
  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy đường dẫn thất bại");
  }
  return data;
}