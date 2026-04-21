/** Định nghĩa kiểu dữ liệu sản phẩm */
export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  discount: string | null;
  description: string;
  descriptionLong: string;
  image: string;
  images: string[];
  tag: string | null;
  category: string;
  stock: number;
  players: string;
  duration: string;
  age: string;
}

/**
 * Danh sách sản phẩm board game hardcode
 * Sau này sẽ được thay thế bằng data từ Supabase
 */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Hành Trình Triều Đại",
    slug: "hanh-trinh-trieu-dai",
    price: 150000,
    oldPrice: 255000,
    discount: "SAVE 41%",
    description:
      "Board game chiến thuật lịch sử Việt Nam thời kì Phong Kiến, kết hợp chiến thuật trực tiếp trên từng nước cờ.",
    descriptionLong:
      "Hành Trình Triều Đại đưa người chơi về các giá trị lịch sử, văn hóa Việt Nam trong thời kì Phong Kiến kết hợp chiến thuật trực tiếp, cao cấp, đánh dấu bước đi trên từng nước cờ. Với cơ chế chiến thuật đa dạng, sản phẩm sẽ bao gồm hơn 60 lá bài sự kiện khác nhau với các địa danh nước Việt trên tấm bản đồ cùng với các con cờ đặc trưng của sản phẩm.",
    image: "/products/placeholder.svg",
    images: [
      "/products/sp1.jpg",
      "/products/sp2.jpg",
      "/products/sp3.jpg",
      "/products/sp4.jpg",
      "/products/sp5.jpg"
    ],
    tag: null,
    category: "Chiến thuật",
    stock: 100,
    players: "2-4",
    duration: "60-90 phút",
    age: "12+",
  },
];

/**
 * Tìm sản phẩm theo slug
 * @param slug - URL slug của sản phẩm
 * @returns Product | undefined
 */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Format giá tiền sang chuỗi VNĐ
 * @param price - Giá trị số (VD: 450000)
 * @returns Chuỗi đã format (VD: "450.000đ")
 */
export function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}
