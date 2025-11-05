export const adminRegister = async (finalData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Đăng ký thất bại");
  }

  return data;
}

export const adminLogin = async (finalData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Đăng nhập thất bại");
  }

  return data;
}

export const adminForgotPassword = async (finalData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData)
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Gửi OTP thất bại");
  }

  return data;
}

export const adminOTPPassword = async (finalData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/otp-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Xác thực OTP thất bại");
  }

  return data;
}

export const adminResetPassword = async (finalData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Đặt lại mật khẩu thất bại");
  }

  return data;
}

export const adminGetList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/list`, {
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy danh sách Admin thất bại");
  }

  return data;
}