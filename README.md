# BMC PACK — Website Vue.js (Industry 4.0)

Website song ngữ **Tiếng Việt / English** cho BMC PACK, xây bằng **Vue 3 + Vite + Vue Router + Three.js**.
Phong cách tối (dark), hi-tech: nền lưới, panel kính mờ, góc HUD, cảnh 3D "tấm carton sóng" chuyển động ở trang chủ.

## Chạy thử

Yêu cầu: Node.js 18+ (khuyên dùng 20/22).

```bash
npm install
npm run dev        # mở http://localhost:5173
```

## Build để đưa lên hosting

```bash
npm run build      # kết quả nằm trong thư mục dist/
npm run preview    # xem thử bản build
```

Upload **toàn bộ nội dung thư mục `dist/`** lên hosting (cPanel, Netlify, Vercel, Nginx…).
Router dùng chế độ hash (`/#/products`) nên chạy trên mọi hosting tĩnh, không cần cấu hình rewrite.
Lưu ý: không mở `dist/index.html` trực tiếp bằng double-click (trình duyệt chặn module JS qua `file://`) — hãy dùng `npm run preview` hoặc một web server.

## Cấu trúc

```
src/
  main.js, App.vue, router.js
  assets/main.css            ← màu sắc, font, nút, panel (design tokens ở :root)
  composables/useI18n.js     ← chuyển ngôn ngữ VI/EN (t({ vi, en }))
  composables/reveal.js      ← hiệu ứng xuất hiện khi cuộn (v-reveal)
  data/company.js            ← thông tin công ty, số liệu, dự án, quy trình, văn phòng
  data/products.js           ← 6 nhóm, 54 model; thông số chi tiết của 3 model flagship
  components/                ← Header, Footer, HeroCanvas (Three.js), LineFlow, QuoteForm…
  views/                     ← Trang chủ, Sản phẩm, Chi tiết sản phẩm, Giới thiệu, Liên hệ
```

## Chỉnh sửa nhanh

- **Đổi màu thương hiệu**: sửa `--red`, `--cyan`, `--bg` trong `src/assets/main.css`.
- **Thêm/sửa sản phẩm**: `src/data/products.js` — thêm tên vào mảng `raw`, thông số chi tiết vào `details` (theo slug).
- **Nội dung công ty**: `src/data/company.js`.
- **Hình ảnh**: hiện đang lấy trực tiếp từ `https://bmcpack.com/images/...`. Khi triển khai chính thức nên copy ảnh vào `public/images/` và đổi hằng `IMG` trong `company.js` thành `'./images'`.
  Ảnh nào không tải được sẽ tự hiện khung thay thế (không vỡ layout).
- **Form báo giá**: hiện mở ứng dụng email với nội dung điền sẵn gửi tới info@bmcpack.com.
  Muốn gửi thẳng lên server (Formspree, API riêng…), sửa hàm `submit()` trong `src/components/QuoteForm.vue`.
