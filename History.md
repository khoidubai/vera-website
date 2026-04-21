# VEra Studio - Lịch sử thay đổi

## [2026-04-16] - v0.2.0 — Chức năng giỏ hàng & đặt hàng

### Thêm mới
- **CartContext** (`src/context/CartContext.tsx`): State quản lý giỏ hàng toàn app (thêm/xóa/cập nhật SL/tổng tiền)
- **CartDrawer** (`src/components/CartDrawer.tsx`): Sidebar giỏ hàng trượt từ phải, tăng/giảm SL, nút checkout
- **Trang chi tiết SP** (`src/app/product/[slug]/`): Hiển thị thông số, mô tả dài, nút thêm giỏ hàng
- **Trang checkout** (`src/app/checkout/page.tsx`): Form đặt hàng (tên, SĐT, email, địa chỉ) + tóm tắt đơn hàng
- **Data tập trung** (`src/data/products.ts`): 4 sản phẩm hardcode với đầy đủ field (slug, stock, players, duration, age)

### Cập nhật
- **Header**: Kết nối giỏ hàng (hiển thị số lượng SP, click mở CartDrawer), đổi tên VEra Studio
- **Content**: Dùng data từ products.ts, nút "Mua ngay" thêm SP vào giỏ, click card → trang chi tiết
- **Layout**: Bọc CartProvider + CartDrawer toàn cục
- **Footer**: Đổi tên VEra Studio
- **CTA**: Thêm "use client" cho event handler

### Fix
- Fix `@import` phải đứng trước `@tailwind` trong globals.css
- Hạ Next.js từ 16 về 14.2.18 (tương thích React 18)

---

## [2026-04-16] - v0.1.0 — Khởi tạo dự án

### Thêm mới
- Khởi tạo project Next.js 14 + TypeScript + TailwindCSS
- Cấu hình theme Indochine: bảng màu Cream (#F5F5DC), Gold (#D4AF37), Charcoal (#333333)
- Font chữ: Dancing Script (tiêu đề), Quicksand (body)

### Components
- **Header**: Logo + Nav menu + Search Box + Giỏ hàng + Responsive mobile menu
- **Banner**: Hero section hiển thị banner.png full-width
- **Introduction**: Giới thiệu thương hiệu + Số liệu nổi bật
- **Content**: Grid sản phẩm board game (4 placeholder) với card hover effect
- **CTA**: Form đăng ký email + Nút khám phá sản phẩm
- **Footer**: 3 cột (Thương hiệu, Menu phụ, Mạng xã hội) + Bản quyền
