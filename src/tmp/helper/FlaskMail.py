from flask_mail import Message
from __init__ import mail

def SendResetOTP(email, otp):
    msg = Message(
        subject="Mã OTP khôi phục mật khẩu",
        recipients=[email],
    )
    msg.body = f"Mã OTP của bạn là: {otp}"
    msg.html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #2e6da4;">Khôi phục mật khẩu</h2>
        <p>Xin chào,</p>
        <p>Bạn vừa yêu cầu lấy lại mật khẩu. Đây là mã OTP của bạn:</p>
        <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; color: green; background-color: #e1f3e1; padding: 10px 20px; border-radius: 5px;">${otp}</span>
        </div>
        <p><strong>Lưu ý:</strong> Mã OTP có hiệu lực trong vòng <b>5 phút</b>. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
        <p>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #888;">Email này được gửi tự động, vui lòng không trả lời lại.</p>
    </div>
    """
    mail.send(msg)


def send_order_email(to_email, order_id, total, items):
    """
    Gửi email thông báo đơn hàng thành công
    :param to_email: Email khách hàng
    :param order_id: ID đơn hàng
    :param total: Tổng tiền đơn hàng
    :param items: List tên sản phẩm
    """
    msg = Message(
        subject=f"Đơn hàng {order_id} đã được tạo thành công",
        recipients=[to_email],
    )

    # Nội dung plain text
    msg.body = f"Đơn hàng {order_id} của bạn đã được tạo thành công. Tổng tiền: {total:,} VND.\nCác sản phẩm: {', '.join(items)}"

    # Nội dung HTML
    items_html = "".join([f"<li>{item}</li>" for item in items])
    msg.html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #2e6da4;">Đơn hàng thành công</h2>
        <p>Chào bạn,</p>
        <p>Đơn hàng <strong>{order_id}</strong> đã được tạo thành công.</p>
        <p><strong>Tổng tiền:</strong> {total:,} VND</p>
        <p><strong>Sản phẩm trong đơn hàng:</strong></p>
        <ul>{items_html}</ul>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #888;">Email này được gửi tự động, vui lòng không trả lời lại.</p>
    </div>
    """

    mail.send(msg)