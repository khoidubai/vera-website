# VEra Studio Website

Website giới thiệu và bán board game mang nét đẹp văn hóa Việt Nam.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React

## Cách chạy (Step by Step)

### 1. Yêu cầu
- [Node.js](https://nodejs.org) >= 18
- npm >= 9

### 2. Cài đặt dependencies
```bash
cd vera-website
npm install
```

### 3. Chạy development server
```bash
npm run dev
```
Mở trình duyệt tại **http://localhost:3000**

### 4. Build production
```bash
npm run build
npm start
```

## Cấu trúc thư mục

```
vera-website/
├── public/
│   ├── banner.png                    # Banner chính
│   └── products/placeholder.svg      # Placeholder hình SP
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout + CartProvider
│   │   ├── page.tsx                  # Trang chủ
│   │   ├── globals.css               # Tailwind + custom styles
│   │   ├── product/[slug]/
│   │   │   ├── page.tsx              # Trang chi tiết SP (server)
│   │   │   └── ProductDetail.tsx     # Chi tiết SP (client)
│   │   └── checkout/page.tsx         # Trang đặt hàng
│   ├── components/
│   │   ├── Header.tsx                # Logo + Nav + Search + Cart
│   │   ├── Banner.tsx                # Hero banner
│   │   ├── Introduction.tsx          # Giới thiệu thương hiệu
│   │   ├── Content.tsx               # Grid sản phẩm
│   │   ├── CTA.tsx                   # Call to Action
│   │   ├── CartDrawer.tsx            # Sidebar giỏ hàng
│   │   └── Footer.tsx                # Footer 3 cột
│   ├── context/
│   │   └── CartContext.tsx            # State giỏ hàng toàn app
│   └── data/
│       └── products.ts               # Data sản phẩm hardcode
├── History.md                        # Log thay đổi
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Bảng màu

| Vai trò | Mã màu | Mô tả |
|---|---|---|
| Primary | `#F5F5DC` | Cream/Beige — nền chính |
| Accent | `#D4AF37` | Gold/Bronze — điểm nhấn |
| Neutral | `#333333` | Charcoal — chữ, card |

## Chức năng hiện tại

- Trang chủ với banner, giới thiệu, sản phẩm, CTA, footer
- Xem chi tiết sản phẩm (route `/product/[slug]`)
- Giỏ hàng: thêm/xóa/cập nhật số lượng
- Đặt hàng: form thông tin giao hàng + xác nhận
- Responsive trên mobile/tablet/desktop

## Roadmap

- [ ] Tích hợp Supabase (Auth + Database)
- [ ] Quản lý sản phẩm từ database
- [ ] Hệ thống đăng nhập / đăng ký
- [ ] Trang quản trị (Admin)
- [ ] Deploy lên Vercel + custom domain
