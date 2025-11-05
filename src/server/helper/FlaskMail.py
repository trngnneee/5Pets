from flask_mail import Message
from __init__ import mail

def send_reset_otp(email, otp):
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
