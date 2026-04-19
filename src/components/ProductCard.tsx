"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[400px] rounded-xl border border-slate-100 bg-slate-50 animate-pulse dark:bg-slate-900/50" />
    );
  }

  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white transition-all hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
    >
      <Link href={`/shop/${product.id}`} className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-white/90 text-pink-600 hover:bg-white dark:bg-slate-900/90 dark:text-pink-400">
            {product.category}
          </Badge>
          {product.rating >= 4.8 && (
            <Badge className="bg-pink-600 text-white hover:bg-pink-700">Best Seller</Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/shop/${product.id}`}>
          <h3 className="mb-2 text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-pink-600 dark:text-white transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mb-4 text-sm text-slate-500 line-clamp-2 dark:text-slate-400">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
          </span>
          <button
            suppressHydrationWarning
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-pink-600 active:scale-95 dark:bg-slate-700 dark:hover:bg-pink-600"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
