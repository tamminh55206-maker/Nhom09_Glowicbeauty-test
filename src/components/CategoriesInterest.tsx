"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  { id: 1, name: "Trang điểm", icon: "💄" },
  { id: 2, name: "Chăm sóc da", icon: "✨" },
  { id: 3, name: "Chăm sóc tóc", icon: "💇‍♀️" },
  { id: 4, name: "Nước hoa", icon: "🌸" },
  { id: 5, name: "Làm sạch da", icon: "🧼" },
  { id: 6, name: "Dưỡng thể", icon: "🧴" },
];

const CategoriesInterest = () => {
  return (
    <section className="bg-brand-peach py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-slate-800">Danh mục quan tâm</h2>
          <Link 
            href="/shop" 
            className="bg-brand-pink text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-brand-pink/90 transition-colors"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-pink flex items-center justify-center text-4xl shadow-lg group-hover:shadow-brand-pink/30 transition-all">
                {cat.icon}
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-brand-pink transition-colors text-center">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesInterest;
