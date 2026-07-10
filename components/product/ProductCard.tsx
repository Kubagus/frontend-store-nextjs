import Image from "next/image";
import Link from "next/link";
import { Star, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  badge?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "fill-[#FBBF24] text-[#FBBF24]"
              : "fill-[#E5E7EB] text-[#E5E7EB]"
          }`}
        />
      ))}
    </div>
  );
}

function Badge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    Promo: "bg-[#10B981]",
    Premium: "bg-primary",
    "Best Deal": "bg-[#F59E0B]",
  };

  return (
    <span
      className={`${colors[type] || "bg-primary"} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm`}
    >
      {type}
    </span>
  );
}

export default function ProductCard({ product, badge }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white border border-[#E5E7EB] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] rounded-[14px] overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer h-full">
        {/* Image */}
        <div className="relative bg-[#F8FAFC] h-[200px] md:h-[260px] flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain h-full w-auto"
          />
          {badge && (
            <div className="absolute top-4 left-4">
              <Badge type={badge} />
            </div>
          )}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors">
            <Eye className="w-3.5 h-3.5 text-[#64748B]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <StarRating rating={product.rating.rate} />

          <div className="mt-3 mb-1">
            <h4 className="text-base font-semibold text-heading tracking-tight line-clamp-1">
              {product.title}
            </h4>
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-[0.6px] mt-1">
              {product.category}
            </p>
          </div>

          <p className="text-sm text-[#64748B] leading-5 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="border-t border-[#E5E7EB] mt-4 pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#64748B]">Starting at</p>
                <p className="text-xl font-semibold text-primary tracking-tight">
                  {formatPrice(product.price)}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
