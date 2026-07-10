"use client";

import { useState, useEffect } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/hooks";
import SearchModal from "@/components/search/SearchModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <>
      <nav className="bg-white border-b border-[#E5E7EB] shadow-sm sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[215px]">
          <div className="flex items-center justify-between h-[52px] md:h-[64px]">
            {/* Logo */}
            <Link href="/" className="text-lg md:text-2xl font-bold text-primary tracking-tight hover:opacity-80 transition-opacity">
              TJERMIN
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[#64748B] hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3 md:gap-5 relative">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-[#334155] hover:text-primary transition-colors hover:scale-110 duration-200"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="text-[#334155] hover:text-primary transition-colors hidden sm:block hover:scale-110 duration-200">
                <User className="w-5 h-5" />
              </button>
              <Link
                href="/cart"
                className="text-[#334155] hover:text-primary transition-colors relative hover:scale-110 duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-[#334155]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-40" : "max-h-0"}`}>
            <div className="border-t border-[#E5E7EB] py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-sm font-medium text-[#64748B] hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
