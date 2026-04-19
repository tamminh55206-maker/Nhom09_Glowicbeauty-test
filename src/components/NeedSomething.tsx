"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const NeedSomething = () => {
  return (
    <section className="bg-brand-peach py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-6xl font-sans font-black text-slate-800 leading-tight uppercase tracking-tighter">
                Bạn cần gì đó?<br />
                <span className="text-brand-pink italic lowercase font-serif">Có Glowic đây</span>
              </h2>
            </div>
            
            <p className="text-slate-600 text-lg max-w-md font-medium">
              Lựa chọn sản phẩm phù hợp với từng loại da của bạn. Chúng tôi mang đến những giải pháp làm đẹp tối ưu nhất.
            </p>

            <div className="text-brand-pink font-sans text-3xl italic font-black uppercase tracking-widest">
              Thật dễ dàng!
            </div>

            <Link 
              href="/shop" 
              className="inline-flex bg-brand-pink text-white px-8 py-3 rounded-full font-bold text-lg items-center gap-2 hover:bg-brand-pink/90 transition-all shadow-lg hover:shadow-brand-pink/20"
            >
              Xem tất cả <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          {/* Right Side - Grid of 4 cards */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  className="aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-xl relative group"
                >
                  <div className="absolute inset-0 bg-brand-pink/5 flex items-center justify-center text-brand-pink/20 font-bold text-6xl">
                    {i}
                  </div>
                  <Image 
                    src={`https://images.unsplash.com/photo-${[
                      "1556228578-0d85b1a4d571",
                      "1512496015851-a90fb38ba796",
                      "1522335789203-aabd1fc54bc9",
                      "1596462502278-27bfdc4033c8"
                    ][i-1]}?q=80&w=400`}
                    alt="Need Something Item"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-0"
                    onLoadingComplete={(img) => img.classList.remove("opacity-0")}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                     <span className="text-white font-bold">Gợi ý #{i}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeedSomething;
