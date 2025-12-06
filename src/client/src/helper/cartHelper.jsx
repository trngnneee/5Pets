import { toast } from "sonner";

export const addItemToCart = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  else{
    toast.error("Sản phẩm đã có trong giỏ hàng");
  }
}

export const convertToNumber = (str) => {
  return Number(str.replace(/\./g, ""));
}