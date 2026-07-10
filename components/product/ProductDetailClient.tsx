"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Heart, Minus, Plus, Check, ShoppingCart, Loader2 } from "lucide-react";
import TopBanner from "@/components/layout/TopBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/ui/Newsletter";
import ProductCard from "./ProductCard";
import { formatPrice } from "@/lib/api";
import { useAppDispatch } from "@/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { useProduct, useProducts } from "@/hooks/useProducts";

interface ProductDetailClientProps {
  productId: number;
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

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useAppDispatch();

  const { data: product, isLoading: productLoading, error: productError } = useProduct(productId);
  const { data: allProducts } = useProducts();

  const relatedProducts = allProducts
    ?.filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4) || [];

  const images = product ? [
    { src: product.image, alt: `${product.title} - Main View`, transform: "scale(1)" },
    { src: product.image, alt: `${product.title} - View 2`, transform: "scale(1.1) translateX(-5%)" },
    { src: product.image, alt: `${product.title} - View 3`, transform: "scale(1.05) translateY(-3%)" },
    { src: product.image, alt: `${product.title} - View 4`, transform: "scale(1.08) translateX(3%)" },
  ] : [];

  const handleAddToCart = async () => {
    if (!product) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    
    setIsLoading(false);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Loading State
  if (productLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBanner />
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-[#64748B]">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error State
  if (productError || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBanner />
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <p className="text-red-500 mb-2">Product not found</p>
          <Link href="/" className="text-primary hover:underline">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 xl:px-[248px] py-3 md:py-4">
        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
          <Link href="/" className="text-[#64748B] hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#64748B]" />
          <span className="text-[#64748B] capitalize">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-[#64748B]" />
          <span className="text-primary font-medium truncate">{product.title}</span>
        </div>
      </div>

      {/* Product Detail */}
      <main className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 xl:px-[248px] py-4 md:py-8 grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6 xl:gap-10 items-start">
        {/* Left - Images */}
        <div className="w-full">
          {/* Main Image */}
          <div className="relative bg-[#F8FAFC] rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="relative aspect-[4/3] flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden">
              <div
                className="relative w-full h-full transition-transform duration-500 ease-out"
                style={{ transform: images[selectedImage]?.transform }}
              >
                <Image
                  src={images[selectedImage]?.src}
                  alt={images[selectedImage]?.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 60vw"
                  loading="eager"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </button>
            <button
              onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-black/60 text-white text-xs md:text-sm font-medium px-2.5 py-0.5 md:px-3 md:py-1 rounded-full">
              {selectedImage + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2 md:gap-3 lg:gap-4 mt-3 md:mt-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  selectedImage === index
                    ? "ring-2 ring-primary ring-offset-1 md:ring-offset-2 scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div
                  className="relative w-full h-full"
                  style={{ transform: img.transform }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1280px) 25vw, 15vw"
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-heading tracking-wide leading-tight mb-3 lg:mb-4">
            {product.title}
          </h1>

          <p className="text-sm text-[#64748B] leading-relaxed mb-4 lg:mb-6 line-clamp-4">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4 lg:mb-5">
            <span className="text-2xl sm:text-3xl font-semibold text-heading">
              {formatPrice(product.price)}
            </span>
            <span className="text-base lg:text-lg text-[#94A3B8] line-through">
              {formatPrice(product.price * 1.2)}
            </span>
          </div>

          {/* Details */}
          <div className="mb-4 lg:mb-5">
            <p className="text-sm font-medium text-heading mb-1">Details</p>
            <p className="text-sm text-[#64748B]">
              100% Organic Cotton • Unisex • Made in USA
            </p>
          </div>

          {/* Category Tags */}
          <div className="mb-5 lg:mb-6">
            <p className="text-sm font-medium text-heading mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#F1F5F9] border border-[#E5E7EB] rounded-[10px] text-sm font-medium text-primary capitalize">
                {product.category}
              </span>
              {product.rating.rate >= 4 && (
                <span className="px-4 py-2 bg-[#ECFDF5] border border-[#A4F4CF] rounded-[10px] text-sm font-medium text-[#007A55]">
                  Best Seller
                </span>
              )}
            </div>
          </div>

          {/* Quantity & Wishlist */}
          <div className="flex items-center gap-4 mb-5 lg:mb-6">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#E5E7EB] rounded-[10px] flex-1 justify-between">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-10 h-12 flex items-center justify-center text-[#64748B] hover:text-primary hover:bg-[#F1F5F9] transition-all duration-200 rounded-l-[10px]"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex-1 h-12 flex items-center justify-center text-sm font-medium border-x border-[#E5E7EB]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-10 h-12 flex items-center justify-center text-[#64748B] hover:text-primary hover:bg-[#F1F5F9] transition-all duration-200 rounded-r-[10px]"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`flex items-center justify-center gap-2 flex-1 h-12 border rounded-[10px] transition-all duration-300 ${
                isWishlisted
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-[#E5E7EB] hover:border-primary text-[#64748B]"
              }`}
            >
              <Heart className={`w-5 h-5 transition-transform duration-300 ${isWishlisted ? "fill-red-500 scale-110" : ""}`} />
              <span className="text-sm font-medium">{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isLoading || addedToCart}
            className={`w-full h-12 font-medium text-sm lg:text-base rounded-[10px] shadow-[0px_4px_6px_rgba(0,0,0,0.1),0px_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 mb-5 lg:mb-6 flex items-center justify-center gap-2 ${
              addedToCart
                ? "bg-green-500 text-white"
                : isLoading
                ? "bg-primary text-white cursor-wait"
                : "bg-primary text-white hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adding...
              </>
            ) : addedToCart ? (
              <>
                <Check className="w-5 h-5" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </button>

          {/* Product Info */}
          <div className="border-t border-[#E5E7EB] pt-4 lg:pt-5 space-y-3 lg:space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">SKU:</span>
              <span className="font-medium text-heading">BT-{String(product.id).padStart(3, "0")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Material:</span>
              <span className="font-medium text-heading">100% Organic Cotton</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Stock:</span>
              <span className="font-medium text-heading">In Stock ({product.rating.count})</span>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="border-t border-[#E5E7EB] mt-4 lg:mt-5">
            <button className="w-full flex items-center justify-between py-4 cursor-pointer hover:text-primary transition-colors">
              <span className="text-sm font-medium text-heading">Additional Info</span>
              <ChevronRight className="w-4 h-4 text-heading" />
            </button>
            <div className="border-t border-[#E5E7EB]">
              <button className="w-full flex items-center justify-between py-4 cursor-pointer hover:text-primary transition-colors">
                <span className="text-sm font-medium text-heading">Details</span>
                <ChevronRight className="w-4 h-4 text-heading" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 xl:px-[248px] py-6 md:py-8 lg:py-12">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-heading tracking-tight">
              You might also like
            </h2>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline group"
            >
              More Products
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
    </div>
  );
}
