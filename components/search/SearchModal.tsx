"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/api";
import { formatPrice } from "@/lib/api";
import { Product } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000,
  });

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6) || [];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-2xl mx-auto mt-20 px-4 animate-scale-in">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E5E7EB]">
            <Search className="w-5 h-5 text-[#64748B]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 text-base outline-none text-heading placeholder:text-[#94A3B8]"
            />
            <button
              onClick={onClose}
              className="text-[#64748B] hover:text-heading transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : query.length === 0 ? (
              <div className="py-12 text-center text-[#64748B]">
                <Search className="w-12 h-12 mx-auto mb-3 text-[#E5E7EB]" />
                <p>Type to search products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-[#64748B]">
                <Package className="w-12 h-12 mx-auto mb-3 text-[#E5E7EB]" />
                <p>No products found for &quot;{query}&quot;</p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="relative w-14 h-14 bg-[#F8FAFC] rounded-lg flex-shrink-0 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-heading group-hover:text-primary transition-colors line-clamp-1">
                        {product.title}
                      </p>
                      <p className="text-xs text-[#64748B] capitalize">{product.category}</p>
                    </div>
                    <p className="text-sm font-semibold text-primary whitespace-nowrap">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredProducts.length > 0 && (
            <div className="px-6 py-3 bg-[#F8FAFC] border-t border-[#E5E7EB]">
              <p className="text-xs text-[#64748B] text-center">
                Press <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E7EB] rounded text-[10px]">Esc</kbd> to close
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
