"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MOCK_FLASH_SALE = [
  { id: 1, name: "Sữa Rửa Mặt CeraVe", price: 250000, oldPrice: 320000, discount: 22, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400" },
  { id: 2, name: "Kem Chống Nắng Anessa", price: 450000, oldPrice: 650000, discount: 30, image: "https://images.unsplash.com/photo-1556229167-731384e96bb9?q=80&w=400" },
  { id: 3, name: "Serum Cocoon Bưởi", price: 180000, oldPrice: 220000, discount: 18, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400" },
  { id: 4, name: "Son L'Oreal Rouge", price: 290000, oldPrice: 380000, discount: 24, image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=400" },
  { id: 5, name: "Tẩy Trang Bioderma", price: 350000, oldPrice: 420000, discount: 16, image: "https://images.unsplash.com/photo-1594125355630-94966e758273?q=80&w=400" },
];

const FlashSale = () => {
  return (
    <section className="bg-brand-light-pink py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black italic text-brand-pink uppercase tracking-tighter">Flash Sale</h2>
            <div className="flex gap-2">
              <span className="bg-brand-pink text-white px-2 py-1 rounded font-bold">02</span>
              <span className="text-brand-pink font-bold">:</span>
              <span className="bg-brand-pink text-white px-2 py-1 rounded font-bold">45</span>
              <span className="text-brand-pink font-bold">:</span>
              <span className="bg-brand-pink text-white px-2 py-1 rounded font-bold">12</span>
            </div>
          </div>
          <Link 
            href="/flash-sale" 
            className="bg-brand-pink text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-brand-pink/90 transition-colors"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {MOCK_FLASH_SALE.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative aspect-square w-full mb-4 bg-slate-50 rounded-xl overflow-hidden">
                <div className="absolute top-2 left-2 bg-brand-pink text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                  -{item.discount}%
                </div>
                <Image 
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2 h-10">{item.name}</h3>
              <div className="flex flex-col items-center">
                <span className="text-brand-pink font-black text-lg">
                  {new Intl.NumberFormat("vi-VN").format(item.price)}đ
                </span>
                <span className="text-slate-400 text-xs line-through">
                  {new Intl.NumberFormat("vi-VN").format(item.oldPrice)}đ
                </span>
              </div>
              <div className="w-full mt-4 h-2 bg-slate-100 rounded-full overflow-hidden relative">
                 <div className="absolute inset-y-0 left-0 bg-brand-pink rounded-full w-[65%]" />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 uppercase font-bold italic">Đã bán 65%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
