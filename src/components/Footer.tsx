/**
 * Footer - Chân trang website
 * Bao gồm: Logo, Menu phụ, Liên kết social, Bản quyền
 * @returns JSX Footer với 3 cột responsive
 */
export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Cột 1: Thương hiệu */}
          <div>
            <h3 className="font-script text-2xl text-gold mb-3">
              VEra Studio
            </h3>
            <p className="text-sm leading-relaxed text-cream/60">
              Sản xuất và phân phối board game mang nét đẹp văn hóa Việt Nam đến
              gần hơn với mọi người.
            </p>
          </div>

          {/* Cột 2: Menu phụ */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Liên kết</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Trang chủ", href: "#" },
                { label: "Sản phẩm", href: "#products" },
                { label: "Giới thiệu", href: "#about" },
                { label: "Chính sách", href: "#" },
                { label: "Liên hệ", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Mạng xã hội */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Kết nối</h4>
            <div className="flex gap-4">
              {[
                { name: "Facebook", url: "#", icon: "f" },
                { name: "Instagram", url: "#", icon: "ig" },
                { name: "TikTok", url: "#", icon: "tt" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center
                             text-sm font-bold hover:bg-gold hover:border-gold hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-cream/40 mt-6">
              Email: contact@vietera.studio
            </p>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-t border-cream/10 mt-10 pt-6 text-center text-sm text-cream/40">
          © {new Date().getFullYear()} VEra Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
