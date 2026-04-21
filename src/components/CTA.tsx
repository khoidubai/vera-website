"use client";

/**
 * CTA - Call to Action section
 * Kêu gọi người dùng đăng ký nhận tin hoặc khám phá sản phẩm
 * @returns JSX CTA section với form email và nút hành động
 */
export default function CTA() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Cloud decorative pattern */}
        <div className="flex justify-center gap-2 mb-6 text-gold/30 text-4xl">
          ☁ ☁ ☁
        </div>

        <h2 className="font-script text-3xl sm:text-4xl text-charcoal mb-4">
          Đồng hành cùng VietEra
        </h2>
        <p className="text-charcoal/70 mb-8 text-lg">
          Đăng ký để nhận thông tin sản phẩm mới và ưu đãi đặc biệt từ VietEra
          Studio
        </p>

        {/* Email form */}
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Nhập email của bạn..."
            className="flex-1 px-5 py-3 rounded-lg border border-gold/30 bg-white 
                       focus:outline-none focus:border-gold transition-colors text-charcoal"
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            Đăng ký ngay
          </button>
        </form>

        {/* Sub CTA */}
        <div className="mt-10">
          <a href="#products" className="btn-secondary inline-block">
            Khám phá sản phẩm →
          </a>
        </div>
      </div>
    </section>
  );
}
