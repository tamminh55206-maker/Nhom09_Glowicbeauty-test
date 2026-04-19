"use client";

import { ShoppingCart, User, Search, Menu, Heart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const GlowicHeader = () => {
  const { items } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex flex-col w-full font-sans">
      {/* Main Header */}
      <header className="bg-brand-pink text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-black tracking-tighter uppercase">Glowic</h1>
            <span className="text-[10px] ml-1 self-end mb-1 font-bold italic opacity-80">beauty</span>
          </Link>

          {/* Search Bar - Pill shape */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative hidden sm:block">
            <input
              type="text"
              placeholder="Bạn tìm gì hôm nay?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 px-6 pr-12 rounded-full bg-white/95 text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-slate-400 text-sm transition-all"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-pink transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {isMounted && cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-white text-brand-pink text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/wishlist" className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href={isAuthenticated ? "/profile" : "/login"} className="flex items-center gap-2 p-1 hover:bg-white/10 rounded-full md:rounded-lg pr-3 transition-colors">
              <div className="bg-white/20 p-1 rounded-full">
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm hidden lg:inline whitespace-nowrap font-medium">
                {isAuthenticated ? user?.name : "Đăng nhập / Đăng ký"}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-brand-pink/95 text-white border-t border-white/10 overflow-x-auto scrollbar-hide">
        <div className="container mx-auto flex items-center px-4">
          <button className="p-4 hover:bg-white/10 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex whitespace-nowrap">
            <Link href="/" className="px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 border-b-2 border-transparent hover:border-white transition-all">
              Trang chủ
            </Link>
            <Link href="/shop" className="px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 border-b-2 border-transparent hover:border-white transition-all">
              Danh mục sản phẩm
            </Link>
            <Link href="/flash-sale" className="px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 border-b-2 border-transparent hover:border-white transition-all">
              Flash Sale
            </Link>
            <Link href="/brands" className="px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 border-b-2 border-transparent hover:border-white transition-all">
              Thương hiệu nổi bật
            </Link>
            <Link href="/blog" className="px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 border-b-2 border-transparent hover:border-white transition-all">
              Bài viết mới nhất
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default GlowicHeader;
