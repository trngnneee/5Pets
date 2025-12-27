import re
import requests

class OrderService:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip("/")

    # Extract the email from user's query 
    def _extract_email(self, text: str) -> str | None:
        match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
        return match.group() if match else None

    # Pass the extracted email to the god damn api
    def _get_orders_by_email(self, email: str):
        try:
            url = f"{self.base_url}/order/list"
            response = requests.post(
                url,
                json={"email": email},
                timeout=5
            )

            if response.status_code != 200:
                return None

            data = response.json()
            if data.get("code") != "success":
                return None

            return data.get("order_list", [])

        except requests.RequestException:
            return None
    
    # Handle the shit query
    def handle_query(self, query: str) -> dict:
        email = self._extract_email(query)

        if not email:
            return {
                "type": "text",
                "message": (
                    "Bạn muốn kiểm tra đơn hàng đúng không?\n"
                    "Vui lòng cung cấp email đã dùng để đặt hàng nhé."
                )
            }

        orders = self._get_orders_by_email(email)

        if not orders:
            return {
                "type": "text",
                "message": f"Không tìm thấy đơn hàng nào với email {email}."
            }

        pending_orders = [
            order for order in orders
            if order.get("status", "").lower() == "pending"
        ]

        if not pending_orders:
            return {
                "type": "text",
                "message": "Hiện tại bạn không có đơn hàng nào đang chờ xử lý."
            }

        formatted_orders = []

        for order in pending_orders:
            formatted_orders.append({
                "order_id": order.get("order_id"),
                "status": order.get("status"),
                "total": order.get("total"),
                "payment_method": order.get("payment_method"),
                "address": order.get("address"),
                "order_details": order.get("order_details", [])
            })

        return {
            "type": "order_list",
            "message": f"Mình tìm thấy {len(formatted_orders)} đơn hàng đang chờ xử lý:",
            "orders": formatted_orders
        }

'''
    # Handle the query
    def handle_query(self, query: str) -> str:
        email = self._extract_email(query)

        if not email:
            return (
                "Bạn muốn kiểm tra đơn hàng đúng không?\n"
                "Vui lòng cung cấp email đã dùng để đặt hàng nhé."
            )

        orders = self._get_orders_by_email(email)

        if not orders:
            return f"Không tìm thấy đơn hàng nào với email {email}."

        pending_orders = [
            order for order in orders
            if order.get("status", "").lower() == "pending"
        ]

        if not pending_orders:
            return (
                "Hiện tại bạn không có đơn hàng nào đang chờ xử lý.\n"
                "Tất cả đơn hàng của bạn đã được xử lý rồi."
            )

        reply = f"Mình tìm thấy {len(pending_orders)} đơn hàng đang chờ xử lý:\n"

        for i, order in enumerate(pending_orders, start=1):
            reply += (
                f"\n🔹 Đơn {i}\n"
                f"- Mã đơn: {order.get('order_id')}\n"
                f"- Trạng thái: {order.get('status')}\n"
                f"- Tổng tiền: {order.get('total')} VND\n"
                f"- Thanh toán: {order.get('payment_method')}\n"
                f"- Địa chỉ: {order.get('address')}\n"
            )

        reply += "\n Đó là toán bộ đơn hàng của bạn"
        return reply
'''