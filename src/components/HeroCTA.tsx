import Link from "next/link";
import { Star } from "lucide-react";

/**
 * HeroCTA - Banner CTA dẫn tới sản phẩm
 * Hiển thị ngay dưới banner chính, trên phần giới thiệu
 * Bao gồm: badge, tiêu đề, bullet points, nút CTA, rating
 * @returns JSX section CTA kiểu Bleame
 */
export default function HeroCTA() {
  return (
    <section className="bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Bên trái: nội dung */}
          <div className="space-y-5">
            {/* Badge */}
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal/50">
              Board Game Việt Nam
            </p>

            {/* Tiêu đề */}
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
              Chiến thuật trên từng nước cờ
            </h2>

            {/* Bullet points */}
            <ul className="space-y-2.5">
              {[
                "Hơn 60 lá bài sự kiện lịch sử",
                "Bản đồ Việt Nam thiết kế chi tiết",
                "Phù hợp 2-4 người, 60-90 phút mỗi ván",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-2 text-charcoal/70"
                >
                  <span className="text-gold mt-0.5">&#10003;</span>
                  {text}
                </li>
              ))}
            </ul>

            {/* Nút CTA */}
            <Link
              href="/product/hanh-trinh-trieu-dai"
              className="inline-block bg-gold text-white font-semibold text-base px-8 py-3.5 rounded-xl hover:bg-yellow-700 transition-colors duration-300 uppercase tracking-wide"
            >
              Khám phá ngay
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>
              <span className="text-sm text-charcoal/50">
                <strong className="text-charcoal">4.8</strong> | 24 đánh giá
              </span>
            </div>
          </div>

          {/* Bên phải: hình ảnh SP */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-cream border border-gold/10">
              <img
                src="/products/sp1.jpg"
                alt="Hành Trình Triều Đại"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
