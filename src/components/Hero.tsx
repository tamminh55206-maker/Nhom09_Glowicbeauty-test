"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center md:items-start md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 block text-sm font-bold uppercase tracking-[0.3em] text-pink-600"
          >
            Sưu tập Mùa Xuân 2024
          </motion.span>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl dark:text-white">
            Vẻ Đẹp <span className="text-pink-600 underline decoration-pink-200 decoration-8 underline-offset-8">Tự Nhiên</span> <br />
            Khơi Nguồn Cảm Hứng
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Khám phá những dòng mỹ phẩm thuần chay cao cấp, mang lại vẻ rạng rỡ và an toàn tuyệt đối cho làn da của bạn.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link 
              href="/shop" 
              className={cn(buttonVariants({ size: "lg" }), "h-14 bg-pink-600 px-8 text-lg hover:bg-pink-700")}
            >
              Mua sắm ngay
            </Link>
            <Link 
              href="/about" 
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-14 border-pink-600 px-8 text-lg text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950")}
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/2 right-0 hidden w-1/2 -translate-y-1/2 md:block lg:w-2/5"
      >
        <div className="relative aspect-square">
          <Image
            src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1000&auto=format&fit=crop"
            alt="Cosmetic product"
            fill
            priority
            sizes="50vw"
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-20 dark:opacity-10">
        <div className="absolute top-[10%] right-[10%] h-64 w-64 rounded-full bg-pink-300 blur-3xl" />
        <div className="absolute bottom-[20%] left-[20%] h-96 w-96 rounded-full bg-blue-200 blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;
