import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

/**
 * RootLayout - Layout gốc cho toàn bộ website
 * @param children - Nội dung trang con được render bên trong layout
 * @returns JSX layout với metadata SEO, CartProvider bọc toàn app
 */
export const metadata: Metadata = {
  title: "VEra Studio - Sống lại kỷ nguyên, Lưu truyền dấu ấn",
  description:
    "VEra Studio - Sản xuất và phân phối board game mang nét đẹp văn hóa Việt Nam",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
