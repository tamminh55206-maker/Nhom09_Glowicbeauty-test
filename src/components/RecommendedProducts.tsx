"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types";
import { MOCK_PRODUCTS as ACTUAL_PRODUCTS } from "@/lib/mock-data";

const RecommendedProducts = () => {
  const addItem = useCartStore((state) => state.addItem);
  
  // Use products from mock-data, repeat if necessary to get 12 cards as requested
  const products: (Product & { image: string })[] = Array.from({ length: 12 }, (_, i) => {
    const original = ACTUAL_PRODUCTS[i % ACTUAL_PRODUCTS.length];
    return {
      ...original,
      id: `${original.id}-rec-${i}`, // Ensure unique keys
      image: original.images[0]
    };
  });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-brand-pink text-white px-8 py-2 rounded-full font-serif italic text-lg shadow-lg inline-block mb-6">
            Sản phẩm đề xuất
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-brand-peach/50 rounded-3xl p-4 flex flex-col group transition-all hover:bg-brand-peach hover:shadow-2xl"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-sm">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button 
                  onClick={() => addItem(product)}
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full text-brand-pink shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-pink hover:text-white"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{product.category}</span>
                <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{product.name}</h3>
                <p className="text-brand-pink font-black text-xl">
                  {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="bg-slate-900 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-brand-pink transition-all shadow-xl hover:shadow-brand-pink/20">
            Xem tất cả sản phẩm
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
