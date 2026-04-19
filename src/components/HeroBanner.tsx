"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HeroBanner = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[600px]">
        {/* Left: Large vertical banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 relative rounded-[2rem] overflow-hidden bg-brand-peach group aspect-[4/3] lg:aspect-auto"
        >
          {/* Placeholder for Unsplash */}
          <div className="absolute inset-0 flex items-center justify-center text-brand-pink/20 font-bold text-4xl italic">
            Banner Image
          </div>
          <Image 
            src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1200&auto=format&fit=crop"
            alt="Mùa hè rạng rỡ - Kem chống nắng"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-0"
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
          <div className="absolute bottom-8 left-8 lg:bottom-16 lg:left-16 text-white max-w-md">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-7xl font-sans font-black mb-4 drop-shadow-xl leading-tight uppercase tracking-tighter"
            >
              Mùa hè<br />rạng rỡ
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg lg:text-2xl drop-shadow-md font-medium opacity-90 mb-8"
            >
              Khám phá bộ sưu tập kem chống nắng mới nhất từ các thương hiệu hàng đầu.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-brand-pink px-8 py-3 rounded-full font-bold text-lg shadow-lg"
            >
              Mua ngay
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Two smaller banners */}
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative rounded-[2rem] overflow-hidden bg-brand-peach group aspect-[2/1] lg:aspect-auto"
          >
            <Image 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"
              alt="Khuyến mãi trang điểm 50%"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-0"
              onLoadingComplete={(img) => img.classList.remove("opacity-0")}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
               <h3 className="text-white text-3xl font-black font-sans uppercase tracking-tighter text-center px-4">Sale up to 50%</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 relative rounded-[2rem] overflow-hidden bg-brand-peach group aspect-[2/1] lg:aspect-auto"
          >
            <Image 
              src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop"
              alt="Sản phẩm dưỡng da mới"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-0"
              onLoadingComplete={(img) => img.classList.remove("opacity-0")}
            />
             <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
               <h3 className="text-white text-3xl font-black font-sans uppercase tracking-tighter text-center px-4">Sản phẩm mới</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
