# Kế hoạch deploy 5Pets lên Render

> Trạng thái: **mới là kế hoạch**. Chưa có resource nào được tạo trên Render. Tất cả các bước bên dưới do bạn tự thực hiện.

## 1. Kiến trúc

```
Trình duyệt
   │  https://5pets-web.onrender.com
   ▼
5pets-web  (Next.js, src/client)
   │  /api/*  ──rewrite──►  https://5pets-api.onrender.com/*
   ▼
5pets-api  (Flask + gunicorn + chatbot AI, src/server)
   │
   ├─► MongoDB Atlas      (Render không có MongoDB managed)
   ├─► Cloudinary         (ảnh)
   ├─► Gemini API         (chatbot)
   ├─► Gmail SMTP         (OTP quên mật khẩu)
   └─◄ MoMo / ZaloPay sandbox (callback)
```

Region đề xuất: `singapore` (gần Việt Nam nhất). Lưu ý: **region không đổi được sau khi tạo**.

## 2. Những gì đã chuẩn bị sẵn trong repo

| File | Nội dung |
|------|----------|
| `render.yaml` | Blueprint gồm 2 web service `5pets-api` và `5pets-web`. Đã kiểm tra với JSON Schema của Render: không có lỗi. Chưa kiểm tra bằng Render CLI vì máy chưa cài. |
| `src/server/requirements.render.txt` | Danh sách thư viện rút gọn, chỉ dùng khi deploy. Bỏ jupyter, opencv, matplotlib, torchvision… vì server không import. File `requirements.txt` gốc giữ nguyên. |
| `src/client/next.config.mjs` | Thêm rewrite `/api/*`, chỉ bật khi có biến `API_PROXY_TARGET`. Chạy local không đặt biến này nên hành vi không đổi. |

### Vì sao cần proxy `/api/*` qua Next.js?

- Backend set cookie `adminToken` sau khi đăng nhập. `src/client/src/middleware.js` đọc cookie đó **trên domain của frontend** để cho vào `/admin/*`.
- Nếu frontend gọi thẳng `https://5pets-api.onrender.com`, cookie sẽ thuộc domain API. Middleware của frontend không bao giờ thấy cookie, nên admin đăng nhập xong vẫn bị đẩy về trang login.
- Không thể dùng chung cookie giữa 2 subdomain `*.onrender.com`, vì `onrender.com` nằm trong Public Suffix List.
- Proxy `/api/*` qua frontend biến cookie thành first-party. Cách này không phải sửa backend và cũng không còn vướng CORS.

## 3. Vấn đề phát hiện trong backend: bạn quyết định có sửa hay không

Mình **không sửa** các file backend. Bảng dưới liệt kê từng vấn đề và cách `render.yaml` đang xử lý tạm.

| # | Mức độ | Vấn đề | Cách xử lý hiện tại / đề xuất |
|---|--------|--------|-------------------------------|
| 1 | Chặn deploy, đã xử lý tạm | `ai/consultant.py` gọi cứng `http://127.0.0.1:5000` để chatbot tra đơn hàng. Render mặc định cho app lắng nghe cổng 10000. | Đặt `PORT=5000` và chạy gunicorn `--threads 4`. Nếu chỉ có 1 thread, request chatbot sẽ chờ chính nó và bị treo. Về lâu dài nên đọc base URL từ biến môi trường. |
| 2 | Chặn deploy, đã xử lý tạm | `requirements.txt` cài torch bản CUDA (vài GB), jupyter, opencv… nên build rất lâu và dễ fail. | `buildCommand` cài torch bản CPU, sau đó cài `requirements.render.txt`. |
| 3 | Chặn deploy, đã xử lý tạm | Không có gunicorn. `main.py` chạy `app.run(debug=True)`, chỉ hợp với môi trường dev. | `gunicorn` có trong `requirements.render.txt`. Start command là `gunicorn main:app`. |
| 4 | Quan trọng | MoMo: `redirectUrl` và `ipnUrl` trỏ tới `/order/callback/momo/<id>`, nhưng route backend là `/order/callback/momo` (không có `<id>`, chỉ nhận POST). Sau khi thanh toán, khách sẽ thấy trang 404. | Đề xuất: `redirectUrl` trỏ về frontend `https://5pets-web.onrender.com/order/success/<id>`, và sửa route IPN cho khớp. |
| 5 | Quan trọng | ZaloPay chưa có `redirecturl` trong `embed_data`. Thanh toán xong, khách đứng yên ở trang ZaloPay. | Đề xuất thêm `{"redirecturl": "<web>/order/success/<id>"}`. |
| 6 | Bảo mật | Key sandbox của MoMo/ZaloPay (`secretKey`, `key1`…) đang hard-code trong `routes/client/order/routes.py`. | Với key sandbox thì chấp nhận được. Nếu public repo hoặc dùng key thật thì nên chuyển sang biến môi trường. |
| 7a | Quan trọng | Gửi email (OTP quên mật khẩu, email xác nhận đơn hàng) không được bọc `try/except`. Nếu cấu hình mail sai, API `/order/create` trả lỗi 500 dù đơn **đã lưu vào DB**, và quên mật khẩu cũng lỗi. | Bắt buộc điền đúng các biến `MAIL_*`. Đề xuất: bọc `mail.send` trong `try/except` để lỗi email không làm hỏng đơn hàng. |
| 7 | Lưu ý | Gói **Free** của Render chặn cổng SMTP 25/465/587, nên email OTP sẽ không gửi được. | `5pets-api` đang dùng gói `standard` (trả phí) nên không bị chặn. Đừng hạ API xuống free nếu cần OTP. |
| 8 | Lưu ý | Mỗi lần khởi động, backend tải model `all-MiniLM-L6-v2` và đọc toàn bộ thú cưng từ DB. | Build đã tải sẵn model vào `HF_HOME=.cache/huggingface`. `--timeout 180` cho worker đủ thời gian khởi động. |
| 9 | Lưu ý | `pet_data.index` (FAISS) được commit sẵn. Nếu DB production khác dữ liệu lúc tạo index, chatbot có thể gợi ý sai. | Xóa file index để backend tự build lại, hoặc build lại trước khi deploy. |
| 10 | Lưu ý | Frontend hard-code danh mục `692b001e8b153579ab1b5bf1` cho các nút "Xem thêm" (`src/client/src/config/variable.jsx`). | Danh mục này phải có trong DB production. Nếu dùng DB mới thì cập nhật id. |

## 4. Chuẩn bị trước khi deploy

1. **MongoDB Atlas**
   - Tạo cluster (M0 free là đủ cho demo).
   - Lấy connection string `mongodb+srv://...`.
   - Network Access: thêm outbound IP của Render (xem trong Dashboard của service → **Connect → Outbound**), hoặc tạm mở `0.0.0.0/0` cho demo.
2. **Gemini API key**: lấy tại Google AI Studio.
3. **Cloudinary**: cloud name, API key, API secret.
4. **Gmail**: bật 2FA và tạo **App Password** để dùng cho `MAIL_PASSWORD`. Thường là `MAIL_SERVER=smtp.gmail.com`, `MAIL_PORT=587`, `MAIL_USE_TLS=True`.
5. **Code đã lên GitHub**: Blueprint đọc `render.yaml` từ repo remote, không đọc file trên máy.

## 5. Các bước deploy (bạn tự chạy)

### Bước 1: Đưa code lên GitHub

```bash
cd /Users/trngnneee/tmp/5Pets
git add -A
git commit -m "feat(client): cải thiện UI/UX + chuẩn bị deploy Render"
git push -u origin feat/ui-ux-improvements
```

Sau đó mở PR và merge vào `main`. Muốn thử trước thì có thể chọn branch `feat/ui-ux-improvements` khi tạo Blueprint.

### Bước 2: Tạo Blueprint trên Render

1. Vào Render Dashboard, chọn **New → Blueprint**.
2. Chọn repo `trngnneee/5Pets` và branch.
3. Render đọc `render.yaml`, hiển thị 2 service và hỏi giá trị các biến `sync: false`. Điền:

| Service | Biến | Giá trị |
|---------|------|---------|
| 5pets-api | `MONGODB_URI` | connection string Atlas |
| 5pets-api | `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USE_TLS`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_DEFAULT_SENDER` | thông tin Gmail ở mục 4 |
| 5pets-api | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | từ Cloudinary |
| 5pets-api | `GEMINI_API_KEY` | từ Google AI Studio |
| 5pets-api | `NGROK_URL` | `https://5pets-api.onrender.com` (URL dự kiến, xem bước 3) |
| 5pets-web | `API_PROXY_TARGET` | `https://5pets-api.onrender.com` (URL dự kiến, xem bước 3) |

`JWT_SECRET_KEY` được Render tự sinh (`generateValue: true`). Các biến `PYTHON_VERSION`, `PORT`, `HF_HOME`, `NODE_VERSION`, `NEXT_PUBLIC_API_URL` đã có giá trị trong file.

4. Bấm **Apply**. Lần build đầu của API mất khá lâu vì phải cài torch và tải model.

### Bước 3: Kiểm tra URL thật và cập nhật nếu cần

- Nếu tên `5pets-api` đã bị người khác dùng, Render sẽ thêm hậu tố vào URL (vd: `5pets-api-xxxx.onrender.com`).
- Khi đó, vào **5pets-api → Environment** sửa `NGROK_URL`, và vào **5pets-web → Environment** sửa `API_PROXY_TARGET`.
- Sau đó **Manual Deploy** lại cả hai. Rewrite của Next.js được ghi vào bản build, nên đổi `API_PROXY_TARGET` thì **bắt buộc build lại** web.

### Bước 4: Smoke test sau deploy

> Gunicorn mở cổng trước khi worker load xong model, nên ngay sau khi deploy, các request qua `/api` có thể bị timeout hoặc lỗi 500. Chờ log của `5pets-api` hiện dòng **"AI Consultant đã sẵn sàng!"** rồi mới bắt đầu test.

- [ ] Trang chủ hiển thị danh sách thú cưng, không phải trạng thái "Không tải được".
- [ ] Menu danh mục có dữ liệu; vào một danh mục, lọc và phân trang được.
- [ ] Tìm kiếm có kết quả.
- [ ] Trang chi tiết → "Thêm vào giỏ hàng": số trên icon giỏ hàng tăng.
- [ ] Đặt hàng bằng "Chuyển khoản ngân hàng" → tới trang "Đặt hàng thành công!".
- [ ] Tra cứu đơn hàng theo email.
- [ ] Chatbot trả lời câu hỏi tư vấn và tra được đơn hàng (kiểm tra vấn đề #1).
- [ ] Admin: đăng nhập → vào được `/admin/category` (kiểm tra proxy cookie). Tạo/sửa/xóa danh mục và thú cưng, upload ảnh lên Cloudinary.
- [ ] Quên mật khẩu → nhận được email OTP.
- [ ] Mở DevTools → Network: mọi request đi qua `https://5pets-web.onrender.com/api/...`, không có lỗi CORS.

## 6. Rollback

- Render giữ lịch sử deploy của từng service: vào service → **Events**, chọn bản deploy trước, bấm **Rollback**.
- Muốn quay lại code cũ thì revert commit trên GitHub rồi Manual Deploy.
- `autoDeployTrigger: "off"`: push code mới **không** tự deploy, bạn chủ động bấm Manual Deploy.

## 7. Chi phí và gói (compute plan)

Số liệu lấy từ tài liệu Render (render.com/docs/compute-plans):

| Service | Gói trong `render.yaml` | Cấu hình | Ghi chú |
|---------|-------------------------|----------|---------|
| 5pets-api | `standard` (`1c-2g`) | 1 CPU / 2 GB | torch và model cần hơn 512 MB. Gói free (0.1 CPU / 512 MB) hoặc starter (0.5 CPU / 512 MB) rất dễ bị OOM, và free còn chặn SMTP. |
| 5pets-web | `starter` (`0.5c-512mb`) | 0.5 CPU / 512 MB | Có thể đổi sang `free`. Khi đó web ngủ sau 15 phút không có truy cập và mất khoảng 1 phút để mở lại. |

Giá thay đổi theo thời gian, xem tại https://render.com/pricing trước khi Apply.

## 8. Biến môi trường frontend khi chạy local

Chạy local không cần thay đổi gì. Vẫn đặt `NEXT_PUBLIC_API_URL=http://localhost:5000` như trước và **không** đặt `API_PROXY_TARGET`.
