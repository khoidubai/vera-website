"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Link from "next/link";

/**
 * CartDrawer - Sidebar giỏ hàng trượt từ phải
 * Hiển thị danh sách SP, tăng/giảm SL, tổng tiền, nút checkout
 * @returns JSX overlay + drawer panel
 */
export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gold/20">
          <h2 className="font-semibold text-lg text-charcoal">
            Giỏ hàng ({totalItems})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 hover:text-gold transition-colors"
            aria-label="Đóng"
          >
            <X size={24} />
          </button>
        </div>

        {/* Danh sách SP */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-charcoal/40">
              <ShoppingBag size={48} />
              <p className="mt-4 text-lg">Giỏ hàng trống</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-gold hover:underline"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-white rounded-lg p-3 border border-gold/10"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                  <span className="font-script text-gold text-sm">VE</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-charcoal text-sm truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-gold font-semibold text-sm mt-1">
                    {formatPrice(item.product.price)}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-cream transition-colors"
                      aria-label="Giảm"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-cream transition-colors"
                      aria-label="Tăng"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Subtotal + Delete */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-charcoal/30 hover:text-red-500 transition-colors"
                    aria-label="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                  <span className="text-sm font-bold text-charcoal">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - Tổng tiền + Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gold/20 p-4 space-y-3">
            <div className="flex justify-between text-lg font-bold text-charcoal">
              <span>Tổng cộng:</span>
              <span className="text-gold">{formatPrice(totalPrice)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary block text-center w-full"
            >
              Đặt hàng
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
