"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BRANDS = [
  { name: "Curel", logo: "CUREL" },
  { name: "Cocoon", logo: "COCOON" },
  { name: "L'Oréal", logo: "L'OREAL" },
  { name: "Cerave", logo: "CERAVE" },
  { name: "Maybelline", logo: "MAYBELLINE" },
  { name: "Peripera", logo: "PERIPERA" },
  { name: "Romand", logo: "ROM&ND" },
  { name: "Innisfree", logo: "INNISFREE" },
];

const FeaturedBrands = () => {
  return (
    <section className="bg-brand-pink py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-sans font-black text-white uppercase tracking-tighter">Thương hiệu nổi bật</h2>
          <Link 
            href="/brands" 
            className="bg-white text-brand-pink px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-lg"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {BRANDS.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white h-28 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer group p-4"
            >
              <span className="text-slate-400 font-sans font-black text-lg tracking-[0.2em] group-hover:text-brand-pink transition-colors text-center leading-tight">
                {brand.logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
