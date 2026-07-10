"use client";

import { SlidersHorizontal } from "lucide-react";

const categories = [
  "All Categories",
  "Men's & Women's Fashion",
  "Shoes & Accessories",
  "Electronics",
];

const priceRanges = [
  "All Prices",
  "Rp0 - Rp200.000",
  "Rp200.000 - Rp400.000",
  "Rp400.000 - Rp600.000",
  "Rp600.000 - Rp1.000.000",
  "Rp1.000.000 +",
];

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
}

export default function Sidebar({
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
}: SidebarProps) {
  return (
    <div className="w-full lg:w-[280px] flex-shrink-0">
      {/* Filter Header */}
      <div className="flex items-center gap-2 mb-8">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-heading">Filters</h3>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-heading uppercase tracking-wider mb-4">
          CATEGORY
        </h4>
        <div className="flex flex-col gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-left text-sm font-medium pb-2 transition-colors ${
                selectedCategory === cat
                  ? "text-primary border-b-2 border-primary"
                  : "text-[#64748B] hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-sm font-semibold text-heading uppercase tracking-wider mb-4">
          PRICE RANGE
        </h4>
        <div className="flex flex-col gap-3">
          {priceRanges.map((range) => (
            <label
              key={range}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className="text-sm font-medium text-[#475569] group-hover:text-primary">
                {range}
              </span>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedPriceRange === range
                    ? "bg-primary border-primary"
                    : "border-[#CBD5E1]"
                }`}
              >
                {selectedPriceRange === range && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="radio"
                name="priceRange"
                value={range}
                checked={selectedPriceRange === range}
                onChange={() => onPriceRangeChange(range)}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
