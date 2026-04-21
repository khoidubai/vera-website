"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

/**
 * Content - Khu vực hiển thị sản phẩm chính
 * Showcase 1 sản phẩm với carousel ảnh, giá cũ/mới, discount badge
 * @returns JSX section sản phẩm showcase
 */
export default function Content() {
  const product = PRODUCTS[0];
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  /** Chuyển ảnh trước */
  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );

  /** Chuyển ảnh sau */
  const nextImage = () =>
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );

  return (
    <section id="products" className="py-16 sm:py-24 px-4 bg-white/40">
      <div className="max-w-7xl mx-auto">
        {/* Tiêu đề section */}
        <div className="text-center mb-12">
          <h2 className="font-script text-3xl sm:text-4xl text-charcoal mb-2">
            Sản phẩm nổi bật
          </h2>
          <div className="divider-indochine" />
          <p className="text-charcoal/60 mt-4">
            Khám phá bộ sưu tập board game mang đậm bản sắc Việt
          </p>
        </div>

        {/* Product Showcase Card */}
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gold/10 relative">
            {/* Discount Badge */}
            {product.discount && (
              <span className="absolute top-4 right-4 z-10 bg-gold text-charcoal text-xs font-bold px-3 py-1.5 rounded-md border border-gold/30">
                {product.discount}
              </span>
            )}

            {/* Carousel ảnh */}
            <div className="relative bg-cream p-6">
              <Link href={`/product/${product.slug}`}>
                <div className="relative aspect-square cursor-pointer overflow-hidden rounded-xl">
                  <Image
                    src={product.images[currentImage]}
                    alt={`${product.name} - ảnh ${currentImage + 1}`}
                    fill
                    className="object-cover rounded-xl"
                    unoptimized
                  />
                </div>
              </Link>

              {/* Mũi tên trái */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-charcoal/10 hover:bg-charcoal/20 text-charcoal flex items-center justify-center transition-colors"
                aria-label="Ảnh trước"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Mũi tên phải */}
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-charcoal/10 hover:bg-charcoal/20 text-charcoal flex items-center justify-center transition-colors"
                aria-label="Ảnh sau"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 py-3">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === currentImage
                      ? "bg-gold"
                      : "bg-charcoal/20 hover:bg-charcoal/40"
                  }`}
                  aria-label={`Ảnh ${idx + 1}`}
                />
              ))}
            </div>

            {/* Thông tin sản phẩm */}
            <div className="px-6 pb-6">
              <Link href={`/product/${product.slug}`}>
                <h3 className="text-charcoal font-semibold text-xl hover:text-gold transition-colors">
                  {product.name}
                </h3>
              </Link>

              <p className="text-charcoal/50 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              {/* Giá cũ + Giá mới */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-gold font-bold text-2xl">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-charcoal/30 line-through text-sm">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              {/* Nút mua ngay */}
              <button
                onClick={() => addToCart(product)}
                className="w-full mt-4 py-3 rounded-xl bg-gold text-white font-semibold text-base hover:bg-yellow-700 transition-colors duration-300"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
