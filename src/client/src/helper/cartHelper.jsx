import { toast } from "sonner";

export const addItemToCart = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Thêm sản phẩm vào giỏ hàng thành công");
  }
  else{
    toast.error("Sản phẩm đã có trong giỏ hàng");
  }
}

export const convertToNumber = (str) => {
  return Number(str.replace(/\./g, ""));
}

export const removeItemFromCart = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.indexOf(id);
  if (index > -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
  }
  else{
    toast.error("Sản phẩm không có trong giỏ hàng");
  }
}