"use client";

import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";
import { Search as SearchIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!query) return [];
    return MOCK_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Kết quả tìm kiếm cho: <span className="text-pink-600">{"\""}{query}{"\""}</span>
          </h1>
          <p className="mt-2 text-slate-500">Tìm thấy {results.length} sản phẩm phù hợp</p>
        </div>
        <Link href="/shop" className="flex items-center text-sm font-bold text-slate-500 hover:text-pink-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Xem tất cả sản phẩm
        </Link>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-[50vh] flex-col items-center justify-center text-center"
        >
          <div className="mb-6 rounded-full bg-slate-50 p-12 dark:bg-slate-900">
            <SearchIcon className="h-16 w-16 text-slate-300" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">Rất tiếc, chúng tôi không tìm thấy kết quả nào</h2>
          <p className="mb-8 max-w-md text-slate-500">
            Hãy thử tìm kiếm với từ khóa khác hoặc tham khảo các sản phẩm bán chạy nhất của chúng tôi.
          </p>
          <Link 
            href="/shop" 
            className="rounded-full bg-slate-900 px-8 py-3 font-bold text-white hover:bg-pink-600 transition-colors"
          >
            Đến cửa hàng ngay
          </Link>
        </motion.div>
      )}
    </div>
  );
}
