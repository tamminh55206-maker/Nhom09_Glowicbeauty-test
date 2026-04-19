"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowLeft,
  ChevronRight,
  Tag
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 rounded-full bg-slate-50 p-12 dark:bg-slate-900">
            <ShoppingCart className="h-24 w-24 text-slate-300" />
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white">Giỏ hàng của bạn đang trống</h1>
          <p className="mb-8 max-w-md text-lg text-slate-500">
            Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá những sản phẩm tuyệt vời của chúng tôi nhé!
          </p>
          <Link 
            href="/shop" 
            className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-pink-600 px-8 py-6 text-lg hover:bg-pink-700")}
          >
            Tiếp tục mua sắm
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-12 text-4xl font-extrabold text-slate-900 dark:text-white">Giỏ Hàng Của Bạn</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800"
              >
                <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                </div>
                
                <div className="flex flex-1 flex-col sm:flex-row items-center justify-between gap-6 w-full">
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="mb-1 text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.category}</p>
                    <div className="mt-2 text-lg font-bold text-pink-600 sm:hidden">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 rounded-full border border-slate-200 p-1 dark:border-slate-800">
                    <button 
                      suppressHydrationWarning
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button 
                      suppressHydrationWarning
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="hidden sm:block text-right min-w-[120px]">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)} / sản phẩm
                    </p>
                  </div>

                  <button 
                    suppressHydrationWarning
                    onClick={() => removeItem(item.id)}
                    className="rounded-full p-2 text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link href="/shop" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-pink-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Tiếp tục mua sắm
          </Link>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <h2 className="mb-6 text-xl font-bold">Tổng đơn hàng</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-slate-500">
                <span>Tạm tính</span>
                <span className="font-bold text-slate-900 dark:text-white">{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Phí vận chuyển</span>
                <span className="font-bold text-green-600">{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}đ`}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-xl font-extrabold">
                <span>Tổng cộng</span>
                <span className="text-pink-600">{total.toLocaleString()}đ</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input suppressHydrationWarning placeholder="Mã giảm giá" className="pl-10 h-12 rounded-xl" />
                <button suppressHydrationWarning className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-pink-600 hover:underline">Áp dụng</button>
              </div>
              <Link 
                href="/checkout"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full h-14 rounded-xl bg-slate-900 text-lg font-bold hover:bg-pink-600 dark:bg-slate-700"
                )}
              >
                Thanh toán ngay <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500 dark:bg-slate-900">
            <p className="mb-2 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="h-4 w-4 text-pink-600" /> Thanh toán an toàn
            </p>
            <p>Dữ liệu của bạn luôn được bảo mật tuyệt đối với các tiêu chuẩn an ninh hàng đầu.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
