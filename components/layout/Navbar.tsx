"use client";

import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-[#E5E7EB] shadow-sm sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[215px]">
        <div className="flex items-center justify-between h-[52px] md:h-[64px]">
          {/* Logo */}
          <Link href="/" className="text-lg md:text-2xl font-bold text-primary tracking-tight">
            TJERMIN
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#64748B] hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-5 relative">
            <button className="text-[#334155] hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-[#334155] hover:text-primary transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button className="text-[#334155] hover:text-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

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
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-sm font-medium text-[#64748B] hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
