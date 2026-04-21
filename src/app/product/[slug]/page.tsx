import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, formatPrice } from "@/data/products";
import ProductDetail from "./ProductDetail";

/**
 * generateStaticParams - Tạo static paths cho tất cả sản phẩm
 * @returns Danh sách slug để Next.js pre-render
 */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

/**
 * ProductPage - Trang chi tiết sản phẩm
 * @param params - Chứa slug từ URL
 * @returns JSX trang chi tiết hoặc 404
 */
export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
