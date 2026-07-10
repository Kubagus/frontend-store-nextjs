"use client";

import { useAppSelector, useAppDispatch } from "@/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight, X, AlertTriangle } from "lucide-react";
import { formatPrice } from "@/lib/api";
import { useState, useEffect } from "react";

interface ConfirmDialog {
  type: "remove" | "clear";
  itemId?: number;
  itemTitle?: string;
}

export default function CartClient() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmDialog | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-[#64748B]">Loading cart...</div>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity * 16000, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleConfirm = () => {
    if (!confirm) return;
    if (confirm.type === "clear") {
      dispatch(clearCart());
    } else if (confirm.itemId) {
      dispatch(removeFromCart(confirm.itemId));
    }
    setConfirm(null);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <ShoppingBag className="w-24 h-24 text-[#E5E7EB] mb-6" />
          <h2 className="text-2xl font-semibold text-heading mb-2">Your cart is empty</h2>
          <p className="text-[#64748B] mb-6">Looks like you haven&apos;t added anything yet</p>
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white font-medium rounded-[10px] hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-[248px] py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-heading">Shopping Cart</h1>
          <button
            onClick={() => setConfirm({ type: "clear" })}
            className="text-xs sm:text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-[#64748B] hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#64748B]" />
          <span className="text-primary font-medium">Cart</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in overflow-hidden"
              >
                {/* Mobile Layout */}
                <div className="md:hidden p-4">
                  <div className="flex gap-3">
                    <div className="relative w-20 h-20 bg-[#F8FAFC] rounded-lg flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.id}`}
                        className="text-sm font-semibold text-heading hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-[10px] text-[#64748B] uppercase mt-0.5">{item.category}</p>
                      <p className="text-base font-semibold text-primary mt-1">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5E7EB]">
                    <div className="flex items-center border border-[#E5E7EB] rounded-lg">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                        className="w-7 h-7 flex items-center justify-center text-[#64748B] hover:text-primary hover:bg-[#F1F5F9] transition-all rounded-l-lg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 h-7 flex items-center justify-center text-xs font-medium border-x border-[#E5E7EB]">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="w-7 h-7 flex items-center justify-center text-[#64748B] hover:text-primary hover:bg-[#F1F5F9] transition-all rounded-r-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-heading">{formatPrice(item.price * item.quantity)}</p>
                      <button
                        onClick={() => setConfirm({ type: "remove", itemId: item.id, itemTitle: item.title })}
                        className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex gap-4 p-4">
                  <div className="relative w-32 h-32 bg-[#F8FAFC] rounded-lg flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill sizes="128px" className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.id}`}
                      className="text-base font-semibold text-heading hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-[#64748B] uppercase mt-1">{item.category}</p>
                    <p className="text-lg font-semibold text-primary mt-2">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E5E7EB] rounded-lg">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                          className="w-8 h-8 flex items-center justify-center text-[#64748B] hover:text-primary hover:bg-[#F1F5F9] transition-all rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x border-[#E5E7EB]">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="w-8 h-8 flex items-center justify-center text-[#64748B] hover:text-primary hover:bg-[#F1F5F9] transition-all rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => setConfirm({ type: "remove", itemId: item.id, itemTitle: item.title })}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-lg font-semibold text-heading">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 md:p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="text-lg font-semibold text-heading mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Subtotal ({cartItems.length} items)</span>
                <span className="font-medium text-heading">{formatPrice(subtotal / 16000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>
            <div className="border-t border-[#E5E7EB] pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-base font-semibold text-heading">Total</span>
                <span className="text-xl font-bold text-primary">{formatPrice(total / 16000)}</span>
              </div>
            </div>
            <button className="w-full h-12 bg-primary text-white font-medium rounded-[10px] hover:bg-primary-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              Proceed to Checkout
            </button>
            <Link href="/" className="block text-center text-sm text-primary hover:underline mt-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirm(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <button onClick={() => setConfirm(null)} className="absolute top-4 right-4 text-[#64748B] hover:text-heading transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-heading mb-2">
                {confirm.type === "clear" ? "Clear Cart" : "Remove Item"}
              </h3>
              <p className="text-sm text-[#64748B] mb-6">
                {confirm.type === "clear"
                  ? "Are you sure you want to remove all items from your cart?"
                  : `Are you sure you want to remove "${confirm.itemTitle}" from your cart?`}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="flex-1 h-11 border border-[#E5E7EB] text-heading font-medium rounded-[10px] hover:bg-[#F8FAFC] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 h-11 bg-red-500 text-white font-medium rounded-[10px] hover:bg-red-600 transition-colors text-sm"
              >
                {confirm.type === "clear" ? "Clear All" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
