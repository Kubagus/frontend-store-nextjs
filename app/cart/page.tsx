import { Metadata } from "next";
import CartClient from "@/components/cart/CartClient";
import TopBanner from "@/components/layout/TopBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cart - TJermin Marketplace",
  description: "Review your shopping cart",
};

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Navbar />
      <CartClient />
      <Footer />
    </div>
  );
}
