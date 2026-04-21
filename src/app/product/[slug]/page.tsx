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
 * @param params - Chứa slug từ URL (Promise trong Next.js 15+)
 * @returns JSX trang chi tiết hoặc 404
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
