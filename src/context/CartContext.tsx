"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

/** Item trong giỏ hàng = Product + số lượng */
export interface CartItem {
  product: Product;
  quantity: number;
}

/** Các method của Cart Context */
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider - Bọc toàn app để cung cấp state giỏ hàng
 * @param children - Các component con
 * @returns Provider component với cart state
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /**
   * Thêm sản phẩm vào giỏ — nếu đã có thì tăng SL
   * @param product - Sản phẩm cần thêm
   */
  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  /**
   * Xóa sản phẩm khỏi giỏ
   * @param productId - ID sản phẩm cần xóa
   */
  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  /**
   * Cập nhật số lượng — nếu SL <= 0 thì xóa
   * @param productId - ID sản phẩm
   * @param quantity - Số lượng mới
   */
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  /** Xóa toàn bộ giỏ hàng */
  const clearCart = () => setItems([]);

  /** Tổng số lượng SP trong giỏ */
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  /** Tổng giá trị giỏ hàng */
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook lấy Cart Context — throw error nếu dùng ngoài Provider
 * @returns CartContextType
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng bên trong CartProvider");
  }
  return context;
}
