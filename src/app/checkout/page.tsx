"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Landmark,
  Wallet,
  Banknote,
  ChevronDown,
  ChevronUp,
  CheckSquare,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

/**
 * CheckoutPage - Trang đặt hàng
 * Form nhập thông tin + tóm tắt đơn hàng + xác nhận
 * @returns JSX trang checkout hoặc thông báo thành công
 */
export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [openShipping, setOpenShipping] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  /**
   * Cập nhật field trong form
   * @param field - Tên field
   * @param value - Giá trị mới
   */
  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Xử lý submit đơn hàng
   * Hiện tại: hiển thị thông báo thành công + xóa giỏ
   * Sau này: gửi lên Supabase
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  // Đặt hàng thành công
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-charcoal/60 mb-6">
            Cảm ơn bạn đã đặt hàng tại VEra Studio. Chúng tôi sẽ liên hệ xác
            nhận đơn hàng trong thời gian sớm nhất.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Giỏ hàng trống
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            Giỏ hàng trống
          </h1>
          <p className="text-charcoal/60 mb-6">
            Bạn chưa có sản phẩm nào trong giỏ hàng.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Quay lại mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Back nav */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-charcoal/60 hover:text-gold transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Quay lại</span>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="font-script text-3xl text-charcoal mb-8">Đặt hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form thông tin */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white rounded-xl p-6 border border-gold/10 space-y-5"
          >
            <h2 className="font-semibold text-charcoal text-lg">
              Thông tin giao hàng
            </h2>

            <FormField
              label="Họ và tên *"
              value={form.name}
              onChange={(v) => updateField("name", v)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Số điện thoại *"
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
                type="tel"
                required
              />
              <FormField
                label="Email"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                type="email"
              />
            </div>
            <FormField
              label="Địa chỉ giao hàng *"
              value={form.address}
              onChange={(v) => updateField("address", v)}
              required
            />
            <FormField
              label="Ghi chú"
              value={form.note}
              onChange={(v) => updateField("note", v)}
              isTextarea
            />

            {/* Phương thức thanh toán */}
            <div>
              <h2 className="font-semibold text-charcoal text-lg mb-3">
                Phương thức thanh toán
              </h2>
              <div className="space-y-2">
                {[
                  { id: "cod", icon: <Banknote size={18} />, label: "Thanh toán khi nhận hàng (COD)" },
                  { id: "bank", icon: <Landmark size={18} />, label: "Chuyển khoản ngân hàng" },
                  { id: "card", icon: <CreditCard size={18} />, label: "Visa / Mastercard" },
                  { id: "ewallet", icon: <Wallet size={18} />, label: "Ví MoMo / ZaloPay" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? "border-gold bg-gold/5"
                        : "border-gold/20 hover:border-gold/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-[#D4AF37]"
                    />
                    <span className="text-gold">{method.icon}</span>
                    <span className="text-charcoal text-sm">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full text-lg py-4">
              Xác nhận đặt hàng
            </button>
          </form>

          {/* Sidebar phải */}
          <div className="space-y-6">
            {/* Tóm tắt đơn hàng */}
            <div className="bg-white rounded-xl p-6 border border-gold/10">
              <h2 className="font-semibold text-charcoal text-lg mb-4">
                Đơn hàng ({items.length} sản phẩm)
              </h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-charcoal/70">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-charcoal">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gold/20 mt-4 pt-4 flex justify-between text-lg font-bold">
                <span className="text-charcoal">Tổng cộng:</span>
                <span className="text-gold">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Vận chuyển & Đổi Trả */}
            <div className="bg-cream/80 rounded-xl border border-gold/10 overflow-hidden">
              <h2 className="font-bold text-charcoal text-center py-4 text-lg">
                Vận chuyển &amp; Đổi Trả
              </h2>
              <div className="divide-y divide-gold/10">
                {[
                  {
                    title: "Về phương thức giao hàng",
                    content:
                      "Đơn hàng được xử lý trong 1-2 ngày làm việc. Giao hàng toàn quốc qua các đơn vị: GHN, GHTK, J&T. Thời gian giao dự kiến 3-5 ngày (nội thành) và 5-7 ngày (ngoại thành). Phí vận chuyển được tính dựa trên khu vực nhận hàng.",
                  },
                  {
                    title: "Chính sách hoàn tiền và đổi trả",
                    content:
                      "Hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận hàng. Điều kiện: sản phẩm còn nguyên seal, chưa qua sử dụng, có video unbox. Hoàn tiền qua chuyển khoản trong 3-5 ngày làm việc sau khi nhận lại sản phẩm.",
                  },
                ].map((item, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() =>
                        setOpenShipping(openShipping === idx ? null : idx)
                      }
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cream/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CheckSquare size={16} className="text-charcoal" />
                        <span className="text-sm font-medium text-charcoal">
                          {item.title}
                        </span>
                      </div>
                      {openShipping === idx ? (
                        <ChevronUp size={16} className="text-charcoal/40" />
                      ) : (
                        <ChevronDown size={16} className="text-charcoal/40" />
                      )}
                    </button>
                    {openShipping === idx && (
                      <div className="px-5 pb-4 text-sm text-charcoal/60 leading-relaxed">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FormField - Component input form tái sử dụng
 * @param label - Nhãn field
 * @param value - Giá trị hiện tại
 * @param onChange - Callback khi giá trị thay đổi
 * @param type - Loại input (text/email/tel)
 * @param required - Bắt buộc hay không
 * @param isTextarea - Dùng textarea thay input
 */
function FormField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  isTextarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  isTextarea?: boolean;
}) {
  const baseClass =
    "w-full px-4 py-3 rounded-lg border border-gold/20 bg-cream/50 focus:outline-none focus:border-gold transition-colors text-charcoal";

  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/70 mb-1">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} h-24 resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={baseClass}
        />
      )}
    </div>
  );
}
