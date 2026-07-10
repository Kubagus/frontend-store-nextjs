import { Zap, ChevronRight } from "lucide-react";

export default function TopBanner() {
  return (
    <div className="bg-[#F8F9FA] border-b border-[#E5E7EB] py-2 md:py-3">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[215px] flex items-center justify-center gap-2 md:gap-3">
        <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
        <span className="text-xs md:text-sm font-semibold text-[#1E293B] tracking-tight text-center">
          <span className="hidden sm:inline">Premium Selection — Certified Pre-Owned Vehicles</span>
          <span className="sm:hidden">Premium Selection</span>
        </span>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-primary hover:underline flex-shrink-0"
        >
          <span className="hidden sm:inline">Browse Inventory</span>
          <span className="sm:hidden">Browse</span>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </a>
      </div>
    </div>
  );
}
