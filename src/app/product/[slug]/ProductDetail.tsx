"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Users,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Landmark,
  Wallet,
  Truck,
  ShieldCheck,
  Package,
  Map,
  Dices,
  ScrollText,
  Quote,
} from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

/** Trust badges bên dưới nút mua */
const TRUST_BADGES = [
  { icon: <Truck size={18} />, text: "Giao hàng toàn quốc" },
  { icon: <ShieldCheck size={18} />, text: "Đổi trả 7 ngày" },
  { icon: <Package size={18} />, text: "Nguyên seal 100%" },
];

/** Điểm nổi bật sản phẩm */
const HIGHLIGHTS = [
  {
    icon: <Dices size={24} />,
    title: "Chiến thuật đa dạng",
    desc: "Mỗi ván chơi là một câu chuyện khác nhau với hơn 60 lá bài sự kiện.",
  },
  {
    icon: <Map size={24} />,
    title: "Bản đồ Việt Nam",
    desc: "Khám phá các địa danh nổi tiếng trên tấm bản đồ được thiết kế chi tiết.",
  },
  {
    icon: <ScrollText size={24} />,
    title: "Lịch sử Phong Kiến",
    desc: "Trải nghiệm các triều đại Việt Nam qua góc nhìn chiến thuật gia.",
  },
  {
    icon: <Users size={24} />,
    title: "2-4 người chơi",
    desc: "Phù hợp chơi cùng bạn bè và gia đình, thời gian mỗi ván 60-90 phút.",
  },
];

/** Bộ SP bao gồm */
const INCLUDES = [
  "1 bản đồ Việt Nam (kích thước 60×40cm)",
  "60+ lá bài sự kiện lịch sử",
  "4 bộ quân cờ đặc trưng theo triều đại",
  "1 xúc xắc custom",
  "1 sách hướng dẫn chi tiết",
  "Hộp đựng cao cấp",
];

/** Reviews khách hàng */
const REVIEWS = [
  {
    name: "Minh Tuấn",
    text: "Chơi cực kỳ cuốn! Mỗi ván đều khác nhau, cơ chế bài sự kiện rất sáng tạo. Gia đình mình ai cũng thích.",
    rating: 5,
  },
  {
    name: "Thu Hà",
    text: "Mua tặng em trai, bé rất thích vì vừa chơi vừa học lịch sử. Chất lượng in ấn đẹp, hộp đựng cao cấp.",
    rating: 5,
  },
  {
    name: "Hoàng Nam",
    text: "Board game Việt Nam chất lượng cao nhất mình từng chơi. Thiết kế bản đồ và quân cờ rất tỉ mỉ.",
    rating: 4,
  },
];

/** FAQ data */
const FAQ_ITEMS = [
  {
    question: "Thời gian giao hàng bao lâu?",
    answer:
      "Đơn hàng sẽ được xử lý trong 1-2 ngày làm việc. Thời gian giao hàng dự kiến 3-5 ngày cho khu vực nội thành và 5-7 ngày cho khu vực ngoại thành.",
  },
  {
    question: "Có chính sách đổi trả không?",
    answer:
      "VEra Studio hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi từ nhà sản xuất. Sản phẩm phải còn nguyên seal và chưa qua sử dụng.",
  },
  {
    question: "Board game phù hợp cho bao nhiêu người chơi?",
    answer:
      "Hành Trình Triều Đại phù hợp cho 2-4 người chơi, thời gian mỗi ván khoảng 60-90 phút. Độ tuổi khuyến nghị từ 12+.",
  },
  {
    question: "Có hỗ trợ thanh toán trả góp không?",
    answer:
      "Hiện tại chúng tôi chưa hỗ trợ trả góp. Bạn có thể thanh toán qua chuyển khoản ngân hàng, ví điện tử hoặc COD (thanh toán khi nhận hàng).",
  },
  {
    question: "Sản phẩm có phù hợp cho trẻ em không?",
    answer:
      "Sản phẩm được khuyến nghị cho độ tuổi 12+ vì có cơ chế chiến thuật phức tạp. Tuy nhiên, trẻ nhỏ hơn vẫn có thể chơi với sự hướng dẫn của người lớn.",
  },
];

/** Kênh thanh toán */
const PAYMENT_METHODS = [
  { icon: <CreditCard size={18} />, name: "Visa / Mastercard" },
  { icon: <Landmark size={18} />, name: "Chuyển khoản" },
  { icon: <Wallet size={18} />, name: "MoMo / ZaloPay" },
];

/**
 * ProductDetail - Trang chi tiết sản phẩm kiểu landing page
 * Cấu trúc: Hero → Highlights → Bao gồm → Reviews → Guarantee → FAQ
 * @param product - Dữ liệu sản phẩm
 * @returns JSX chi tiết SP
 */
export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isOutOfStock = product.stock === 0;

  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );

  const nextImage = () =>
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="min-h-screen bg-cream">
      {/* Back nav */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-charcoal/60 hover:text-gold transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Quay lại</span>
        </Link>
      </div>

      {/* ===== SECTION 1: PRODUCT HERO ===== */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Carousel ảnh */}
          <div className="bg-white rounded-2xl border border-gold/10 overflow-hidden p-6">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src={product.images[currentImage]}
                alt={`${product.name} - ảnh ${currentImage + 1}`}
                fill
                className="object-cover rounded-xl"
                unoptimized
              />
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 hover:bg-white text-charcoal flex items-center justify-center transition-colors shadow-sm"
                aria-label="Ảnh trước"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 hover:bg-white text-charcoal flex items-center justify-center transition-colors shadow-sm"
                aria-label="Ảnh sau"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnail dots */}
            <div className="flex justify-center gap-2 mt-4">
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
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            {/* Category + Discount */}
            <div className="flex items-center gap-3">
              <span className="text-charcoal/40 text-sm uppercase tracking-wide">
                {product.category}
              </span>
              {product.discount && (
                <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.discount}
                </span>
              )}
            </div>

            {/* Tên */}
            <h1 className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={s <= 5 ? "text-gold fill-gold" : "text-charcoal/20"}
                  />
                ))}
              </div>
              <span className="text-sm text-charcoal/50">
                4.8/5 — 24 đánh giá
              </span>
            </div>

            {/* Giá */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-gold">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-charcoal/30 line-through text-lg">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Mô tả */}
            <p className="text-charcoal/70 leading-relaxed text-justify">
              {product.descriptionLong}
            </p>

            {/* Thông số nhanh */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3 text-center border border-gold/10">
                <div className="text-gold flex justify-center mb-1"><Users size={18} /></div>
                <p className="text-xs text-charcoal/50">Người chơi</p>
                <p className="font-semibold text-charcoal text-sm">{product.players}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border border-gold/10">
                <div className="text-gold flex justify-center mb-1"><Clock size={18} /></div>
                <p className="text-xs text-charcoal/50">Thời gian</p>
                <p className="font-semibold text-charcoal text-sm">{product.duration}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border border-gold/10">
                <div className="text-gold flex justify-center mb-1"><Star size={18} /></div>
                <p className="text-xs text-charcoal/50">Độ tuổi</p>
                <p className="font-semibold text-charcoal text-sm">{product.age}</p>
              </div>
            </div>

            {/* Stock */}
            {!isOutOfStock && (
              <p className="text-sm text-charcoal/50">
                Còn lại: <strong className="text-charcoal">{product.stock}</strong> sản phẩm
              </p>
            )}

            {/* Nút mua */}
            <button
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
              className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors duration-300 ${
                isOutOfStock
                  ? "bg-charcoal/20 text-charcoal/40 cursor-not-allowed"
                  : "bg-gold text-white hover:bg-yellow-700"
              }`}
            >
              <ShoppingCart size={22} />
              {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ hàng"}
            </button>

            {/* Trust badges */}
            <div className="flex justify-between pt-1">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.text} className="flex items-center gap-1.5 text-charcoal/50 text-xs">
                  <span className="text-gold">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>

            {/* Thanh toán */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-gold/10">
              <span className="text-xs text-charcoal/40">Thanh toán:</span>
              {PAYMENT_METHODS.map((m) => (
                <div key={m.name} className="flex items-center gap-1.5 text-xs text-charcoal/50">
                  <span className="text-gold">{m.icon}</span>
                  {m.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 2: HIGHLIGHTS ===== */}
      <div className="bg-white/60 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-script text-3xl text-charcoal text-center mb-3">
            Điểm nổi bật
          </h2>
          <div className="divider-indochine mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 text-center border border-gold/10 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 text-gold">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SECTION 3: BỘ SP BAO GỒM ===== */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-script text-3xl text-charcoal text-center mb-3">
          Bộ sản phẩm bao gồm
        </h2>
        <div className="divider-indochine mb-10" />

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-gold/10 divide-y divide-gold/10">
            {INCLUDES.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 px-6 py-4">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">{idx + 1}</span>
                </div>
                <span className="text-charcoal/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SECTION 4: REVIEWS ===== */}
      <div className="bg-white/60 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-script text-3xl text-charcoal text-center mb-3">
            Khách hàng nói gì
          </h2>
          <p className="text-center text-charcoal/50 text-sm mb-10">
            Đánh giá thực từ người chơi
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-gold/10"
              >
                <Quote size={20} className="text-gold/30 mb-3" />
                <p className="text-charcoal/70 text-sm leading-relaxed mb-4 text-justify">
                  {review.text}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-charcoal text-sm">
                    {review.name}
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className={
                          s <= review.rating
                            ? "text-gold fill-gold"
                            : "text-charcoal/20"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SECTION 5: GUARANTEE ===== */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-gold/10 p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <ShieldCheck size={40} className="text-gold mx-auto mb-4" />
          <h2 className="font-script text-2xl text-charcoal mb-3">
            Cam kết chất lượng
          </h2>
          <p className="text-charcoal/60 leading-relaxed text-justify max-w-xl mx-auto">
            Chúng tôi tự hào về chất lượng sản phẩm! Nếu bạn không hài lòng với đơn
            hàng, hãy liên hệ trong vòng 7 ngày kể từ ngày nhận — chúng tôi sẽ hỗ trợ
            đổi trả miễn phí. Sản phẩm cần còn nguyên seal và chưa qua sử dụng.
          </p>
        </div>
      </div>

      {/* ===== SECTION 6: FAQ ===== */}
      <div className="bg-white/60 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-script text-3xl text-charcoal text-center mb-3">
            Câu hỏi thường gặp
          </h2>
          <div className="divider-indochine mb-10" />

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gold/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-cream/50 transition-colors"
                >
                  <span className="font-medium text-charcoal">
                    {item.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp size={18} className="text-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-charcoal/40 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-sm text-charcoal/60 leading-relaxed text-justify">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
