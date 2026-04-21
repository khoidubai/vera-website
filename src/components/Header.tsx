"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, formatPrice } from "@/data/products";
import Link from "next/link";

/** Menu điều hướng chính */
const NAV_ITEMS = [
  { label: "Trang chủ", href: "#" },
  { label: "Sản phẩm", href: "#products" },
  { label: "Giới thiệu", href: "#about" },
  { label: "Liên hệ", href: "#contact" },
];

/**
 * Tìm sản phẩm theo keyword (tên hoặc mô tả)
 * @param query - Từ khóa tìm kiếm
 * @returns Danh sách sản phẩm khớp
 */
function searchProducts(query: string) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

/**
 * Header - Thanh điều hướng trên cùng
 * Bao gồm: Logo, Nav menu, Search box với dropdown kết quả, Giỏ hàng
 * @returns JSX Header component với responsive mobile menu
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const { totalItems, setIsCartOpen } = useCart();
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchProducts(searchQuery);
  const mobileSearchResults = searchProducts(mobileSearchQuery);

  /** Đóng dropdown khi click ngoài */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** Đóng search + reset query khi chọn kết quả */
  const handleResultClick = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setMobileSearchQuery("");
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-script text-2xl text-charcoal font-bold">
              VEra Studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-charcoal hover:text-gold transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search + Cart */}
          <div className="flex items-center gap-4">
            {/* Search Box (Desktop) */}
            <div className="relative hidden sm:block" ref={searchRef}>
              {isSearchOpen ? (
                <>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 px-4 py-1.5 rounded-full border border-gold/40 bg-white/80 
                               text-sm focus:outline-none focus:border-gold transition-all"
                    autoFocus
                  />
                  {/* Dropdown kết quả */}
                  {searchQuery.trim() && (
                    <div className="absolute top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gold/10 overflow-hidden z-50 right-0">
                      {searchResults.length === 0 ? (
                        <p className="p-4 text-sm text-charcoal/40 text-center">
                          Không tìm thấy sản phẩm
                        </p>
                      ) : (
                        searchResults.map((p) => (
                          <Link
                            key={p.id}
                            href={`/product/${p.slug}`}
                            onClick={handleResultClick}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-cream/80 transition-colors border-b border-gold/5 last:border-0"
                          >
                            <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                              <span className="font-script text-gold text-xs">VE</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-charcoal truncate">
                                {p.name}
                              </p>
                              <p className="text-xs text-gold font-semibold">
                                {formatPrice(p.price)}
                              </p>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:text-gold transition-colors"
                  aria-label="Tìm kiếm"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:text-gold transition-colors"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-[10px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gold/20">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-charcoal hover:text-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {/* Mobile Search */}
            <div className="mt-3 sm:hidden relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gold/40 bg-white/80 
                           text-sm focus:outline-none focus:border-gold"
              />
              {/* Mobile dropdown kết quả */}
              {mobileSearchQuery.trim() && (
                <div className="mt-2 bg-white rounded-xl shadow-lg border border-gold/10 overflow-hidden">
                  {mobileSearchResults.length === 0 ? (
                    <p className="p-4 text-sm text-charcoal/40 text-center">
                      Không tìm thấy sản phẩm
                    </p>
                  ) : (
                    mobileSearchResults.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-cream/80 transition-colors border-b border-gold/5 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                          <span className="font-script text-gold text-xs">VE</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-charcoal truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-gold font-semibold">
                            {formatPrice(p.price)}
                          </p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
