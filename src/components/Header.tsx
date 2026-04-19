"use client";

import { ShoppingCart, User, Search, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Header = () => {
  const { items } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
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
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tighter text-pink-600">
            GLOW BEAUTY
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden space-x-8 md:flex">
          <Link href="/" className="text-sm font-bold uppercase tracking-widest text-slate-600 transition-colors hover:text-pink-600">
            Trang chủ
          </Link>
          <Link href="/shop" className="text-sm font-bold uppercase tracking-widest text-slate-600 transition-colors hover:text-pink-600">
            Cửa hàng
          </Link>
          <Link href="/about" className="text-sm font-bold uppercase tracking-widest text-slate-600 transition-colors hover:text-pink-600">
            Giới thiệu
          </Link>
          <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-slate-600 transition-colors hover:text-pink-600">
            Liên hệ
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-5">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Tìm kiếm mỹ phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-64 rounded-full bg-slate-100 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-900"
            />
          </form>

          {/* User */}
          <div className="flex items-center space-x-1">
            {isMounted && isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="flex items-center space-x-2 p-2 text-slate-600 transition-colors hover:text-pink-600">
                  <User className="h-6 w-6" />
                  <span className="hidden text-sm font-bold text-slate-700 md:block">Hi, {user?.name}</span>
                </Link>
                <button 
                  suppressHydrationWarning
                  onClick={() => logout()}
                  className="p-2 text-slate-600 transition-colors hover:text-pink-600"
                  title="Đăng xuất"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="p-2 text-slate-600 transition-colors hover:text-pink-600">
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-slate-600 transition-colors hover:text-pink-600">
              <ShoppingCart className="h-6 w-6" />
              {isMounted && cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white ring-2 ring-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>
          
          <button suppressHydrationWarning className="md:hidden p-2 text-slate-600">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
