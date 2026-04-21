/**
 * Introduction - Phần giới thiệu về VietEra Studio
 * Hiển thị sứ mệnh và câu chuyện thương hiệu
 * @returns JSX section giới thiệu với layout centered
 */
export default function Introduction() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tiêu đề */}
        <h2 className="font-script text-3xl sm:text-4xl text-charcoal mb-2">
          Câu chuyện của chúng tôi
        </h2>
        <div className="divider-indochine" />

        {/* Nội dung giới thiệu */}
        <p className="text-lg leading-relaxed text-charcoal/80 mb-6">
          <strong>VEra Studio</strong> là studio chuyên sản xuất và phân phối
          các sản phẩm board game mang đậm bản sắc văn hóa Việt Nam. Chúng tôi
          tin rằng mỗi trò chơi không chỉ là giải trí, mà còn là cầu nối đưa
          nét đẹp truyền thống đến gần hơn với thế hệ trẻ.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/80">
          Với triết lý{" "}
          <em className="text-gold font-semibold">
            &ldquo;Sống lại kỷ nguyên — Lưu truyền dấu ấn&rdquo;
          </em>
          , mỗi sản phẩm của VEra đều được nghiên cứu kỹ lưỡng về lịch sử,
          văn hóa và nghệ thuật Việt Nam, kết hợp cùng lối thiết kế hiện đại để
          tạo nên trải nghiệm độc đáo.
        </p>

        {/* Số liệu nổi bật */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          {[
            { number: "10+", label: "Sản phẩm" },
            { number: "50+", label: "Khách hàng" },
            { number: "100%", label: "Made in Vietnam" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-gold">
                {stat.number}
              </p>
              <p className="text-sm text-charcoal/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
