import { toast } from "sonner";

// Sự kiện để Header cập nhật số lượng giỏ hàng ngay khi thêm/xóa
export const CART_UPDATED_EVENT = "cart-updated";

export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

export const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: cart.length }));
}

const goToCart = {
  label: "Xem giỏ hàng",
  onClick: () => window.location.assign("/cart"),
};

export const addItemToCart = (id) => {
  const cart = getCart();
  if (!cart.includes(id)) {
    cart.push(id);
    setCart(cart);
    toast.success("Thêm sản phẩm vào giỏ hàng thành công", { action: goToCart });
  }
  else {
    toast.info("Sản phẩm đã có trong giỏ hàng", { action: goToCart });
  }
}

export const convertToNumber = (str) => {
  return Number(str.replace(/\./g, ""));
}

export const removeItemFromCart = (id) => {
  const cart = getCart();
  const index = cart.indexOf(id);
  if (index > -1) {
    cart.splice(index, 1);
    setCart(cart);
    toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
  }
  else {
    toast.error("Sản phẩm không có trong giỏ hàng");
  }
}
