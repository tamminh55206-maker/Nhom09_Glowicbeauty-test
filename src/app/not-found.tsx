"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, Ghost } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative mb-8 inline-block">
          <Ghost className="h-32 w-32 text-pink-100 dark:text-pink-900/20" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-pink-600 opacity-20">
            404
          </span>
        </div>
        
        <h1 className="mb-4 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-6xl">
          Trang không tồn tại
        </h1>
        <p className="mx-auto mb-12 max-w-md text-lg text-slate-500">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. 
          Hãy quay lại trang chủ để tiếp tục mua sắm nhé.
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
          <Link 
            href="/" 
            className={cn(buttonVariants({ size: "lg" }), "h-14 rounded-full bg-pink-600 px-8 text-lg hover:bg-pink-700")}
          >
            <Home className="mr-2 h-5 w-5" /> Quay về trang chủ
          </Link>
          <Link 
            href="/shop" 
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-14 rounded-full border-slate-200 px-8 text-lg")}
          >
            <Search className="mr-2 h-5 w-5" /> Tìm kiếm sản phẩm
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
