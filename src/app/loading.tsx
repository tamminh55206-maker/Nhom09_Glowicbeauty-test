"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-32">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-4 border-slate-100 border-t-pink-600 animate-spin"></div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-pink-600"
        >
          GLOW
        </motion.div>
      </div>
      <p className="mt-8 text-lg font-bold text-slate-500 animate-pulse">
        Đang tải dữ liệu làm đẹp...
      </p>
    </div>
  );
}
