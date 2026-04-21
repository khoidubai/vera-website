import Header from "@/components/Header";
import Banner from "@/components/Banner";
import HeroCTA from "@/components/HeroCTA";
import Introduction from "@/components/Introduction";
import Content from "@/components/Content";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * Home - Trang chủ VEra Studio
 * Tổ hợp tất cả các section theo thứ tự hiển thị
 * @returns JSX trang chủ hoàn chỉnh
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Banner />
      <HeroCTA />
      <Introduction />
      <Content />
      <CTA />
      <Footer />
    </main>
  );
}
