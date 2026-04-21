import Image from "next/image";

/**
 * Banner - Hero section hiển thị banner chính
 * Hiển thị banner.png full-width với overlay text
 * @returns JSX Banner section với hình ảnh responsive
 */
export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Banner Image — giữ nguyên tỉ lệ gốc, không bị stretch */}
      <Image
        src="/products/banner.png"
        alt="VEra Studio - Sống lại kỷ nguyên, Lưu truyền dấu ấn"
        width={1702}
        height={630}
        priority
        unoptimized
        className="w-full h-auto"
        sizes="100vw"
      />

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
}
