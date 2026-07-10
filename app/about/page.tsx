import { Metadata } from "next";
import TopBanner from "@/components/layout/TopBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About - TJermin Marketplace",
  description: "Learn more about TJermin Marketplace",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-heading mb-4">About</h1>
          <p className="text-[#64748B]">Coming soon</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
