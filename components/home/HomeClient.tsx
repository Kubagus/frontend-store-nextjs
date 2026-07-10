"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import TopBanner from "@/components/layout/TopBanner";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/filter/Sidebar";
import MobileFilterDrawer from "@/components/filter/MobileFilterDrawer";
import ProductGrid from "@/components/product/ProductGrid";
import Newsletter from "@/components/ui/Newsletter";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

// Map custom categories to API categories
// FakeStore API categories: electronics, jewelery, men's clothing, women's clothing
const categoryMapping: Record<string, string[]> = {
  "All Categories": [],
  "Men's & Women's Fashion": ["men's clothing", "women's clothing"],
  "Shoes & Accessories": ["jewelery"],
  "Electronics": ["electronics"],
};

const priceRangeMap: Record<string, [number, number]> = {
  "All Prices": [0, Infinity],
  "Rp0 - Rp200.000": [0, 12.5],
  "Rp200.000 - Rp400.000": [12.5, 25],
  "Rp400.000 - Rp600.000": [25, 37.5],
  "Rp600.000 - Rp1.000.000": [37.5, 62.5],
  "Rp1.000.000 +": [62.5, Infinity],
};

export default function HomeClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const { data: products, isLoading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;

    // Category filter using custom mapping
    if (selectedCategory !== "All Categories") {
      const apiCategories = categoryMapping[selectedCategory] || [];
      if (apiCategories.length > 0) {
        filtered = filtered.filter((p) =>
          apiCategories.some(
            (cat) => p.category.toLowerCase() === cat.toLowerCase()
          )
        );
      }
    }

    // Price range filter
    if (selectedPriceRange !== "All Prices") {
      const [min, max] = priceRangeMap[selectedPriceRange] || [0, Infinity];
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    return filtered;
  }, [products, selectedCategory, selectedPriceRange]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Navbar />
      <Hero />

      {/* Mobile Filter Button */}
      <div className="lg:hidden px-4 py-4">
        <button
          onClick={() => setFilterDrawerOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary font-medium rounded-[10px] hover:bg-primary hover:text-white transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters & Sort
        </button>
      </div>

      {/* Mobile Category Title */}
      <div className="lg:hidden px-4 pb-2">
        <h2 className="text-xl font-semibold text-heading">All Category</h2>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-[#64748B]">Loading products...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-500 mb-2">Failed to load products</p>
            <p className="text-sm text-[#64748B]">Please try again later</p>
          </div>
        </div>
      )}

      {/* Products */}
      {!isLoading && !error && (
        <main className="max-w-[1440px] mx-auto px-4 lg:px-[248px] py-4 lg:py-12 flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={setSelectedPriceRange}
            />
          </div>

          {/* Mobile Filter Drawer */}
          <MobileFilterDrawer
            isOpen={filterDrawerOpen}
            onClose={() => setFilterDrawerOpen(false)}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={setSelectedPriceRange}
          />

          <ProductGrid products={filteredProducts} title="All Products" />
        </main>
      )}

      <Newsletter />
      <Footer />
    </div>
  );
}
