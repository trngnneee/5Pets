// Khi deploy (Render), frontend và API nằm trên 2 domain *.onrender.com khác nhau
// nên cookie "adminToken" do API set sẽ không tới được middleware của Next.
// Đặt API_PROXY_TARGET (vd: https://5pets-api.onrender.com) để proxy /api/* sang backend,
// rồi build với NEXT_PUBLIC_API_URL=/api -> cookie thành first-party trên domain frontend.
// Không đặt biến này (chạy local) thì không có rewrite nào, hành vi giữ nguyên.
const apiProxyTarget = process.env.API_PROXY_TARGET?.replace(/\/+$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  async rewrites() {
    if (!apiProxyTarget) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
