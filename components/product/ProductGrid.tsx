"use client";

import { useState } from "react";
import { Grid3X3, List, ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  title?: string;
  showBadges?: boolean;
}

const badges = ["Promo", "Premium", "Best Deal", "Promo", "Best Deal", "Promo", "Premium", "Best Deal", "Promo"];

export default function ProductGrid({ products, title = "All Products", showBadges = true }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(9);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating.rate - a.rating.rate;
    if (sortBy === "name") return a.title.localeCompare(b.title);
    return 0;
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-2xl font-semibold text-heading tracking-tight">
          {title}
        </h3>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-xs md:text-sm font-medium text-heading cursor-pointer pr-5 md:pr-6 focus:outline-none"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-heading absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="hidden md:flex items-center border border-[#E5E7EB] rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 ${viewMode === "grid" ? "bg-[#F1F5F9]" : ""}`}
            >
              <Grid3X3 className={`w-4 h-4 ${viewMode === "grid" ? "text-primary" : "text-[#64748B]"}`} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 border-l border-[#E5E7EB] ${viewMode === "list" ? "bg-[#F1F5F9]" : ""}`}
            >
              <List className={`w-4 h-4 ${viewMode === "list" ? "text-primary" : "text-[#64748B]"}`} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 border-l border-[#E5E7EB] ${viewMode === "grid" ? "bg-[#F1F5F9]" : ""}`}
            >
              <svg className={`w-4 h-4 ${viewMode === "grid" ? "text-primary" : "text-[#64748B]"}`} viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {/* Mobile View Toggle */}
          <div className="flex md:hidden items-center border border-[#E5E7EB] rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-[#F1F5F9]" : ""}`}
            >
              <Grid3X3 className={`w-3.5 h-3.5 ${viewMode === "grid" ? "text-primary" : "text-[#64748B]"}`} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 border-l border-[#E5E7EB] ${viewMode === "list" ? "bg-[#F1F5F9]" : ""}`}
            >
              <List className={`w-3.5 h-3.5 ${viewMode === "list" ? "text-primary" : "text-[#64748B]"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className={`grid gap-4 md:gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            badge={showBadges && index < badges.length ? badges[index] : undefined}
          />
        ))}
      </div>

      {/* Empty State */}
      {visibleProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-[#64748B]">No products found matching your filters.</p>
        </div>
      )}

      {/* Show More Button */}
      {visibleCount < sortedProducts.length && (
        <div className="flex justify-center mt-6 md:mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="border-2 border-primary text-primary font-medium text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-[10px] hover:bg-primary hover:text-white transition-colors"
          >
            Show More Products
          </button>
        </div>
      )}
    </div>
  );
}
