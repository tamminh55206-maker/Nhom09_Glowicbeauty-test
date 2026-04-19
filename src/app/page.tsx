"use client";

import HeroBanner from "@/components/HeroBanner";
import FlashSale from "@/components/FlashSale";
import CategoriesInterest from "@/components/CategoriesInterest";
import NeedSomething from "@/components/NeedSomething";
import FeaturedBrands from "@/components/FeaturedBrands";
import RecommendedProducts from "@/components/RecommendedProducts";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroBanner />
      </motion.div>

      {/* Flash Sale Section */}
      <FlashSale />

      {/* Categories of Interest Section */}
      <CategoriesInterest />

      {/* Need Something Section */}
      <NeedSomething />

      {/* Featured Brands Section */}
      <FeaturedBrands />

      {/* Recommended Products Section */}
      <RecommendedProducts />
    </div>
  );
}
