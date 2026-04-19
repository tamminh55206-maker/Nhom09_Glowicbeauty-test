"use client";

import { use, useState, useEffect } from "react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Star, 
  ShoppingCart, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!product) {
    notFound();
  }

  if (!isMounted) return null;

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-pink-600">Trang chủ</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-pink-600">Cửa hàng</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-slate-900 dark:text-white truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Images */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-square overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800"
          >
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                suppressHydrationWarning
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  activeImage === idx ? "border-pink-600 ring-2 ring-pink-100" : "border-transparent"
                }`}
              >
                <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="mb-2 inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-600 dark:bg-pink-900/30">
              {product.category}
            </span>
            <h1 className="mb-4 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              {product.name}
            </h1>
            
            <div className="mb-6 flex items-center space-x-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 fill-current ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-slate-300"}`} 
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {product.rating} ({product.reviews.length} đánh giá)
                </span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm font-medium text-green-600">Còn hàng</span>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-extrabold text-pink-600">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
              </span>
            </div>

            <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {product.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="flex items-center space-x-1 rounded-full border border-slate-200 p-1 dark:border-slate-800">
                <button 
                  suppressHydrationWarning
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-full p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-lg font-bold">{quantity}</span>
                <button 
                  suppressHydrationWarning
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-full p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button 
                suppressHydrationWarning
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                }}
                className="h-14 flex-1 rounded-full bg-slate-900 text-lg font-bold hover:bg-pink-600 dark:bg-slate-700"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Thêm vào giỏ hàng
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 p-6 sm:grid-cols-3 dark:bg-slate-900">
              <div className="flex flex-col items-center text-center">
                <Truck className="mb-2 h-6 w-6 text-pink-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Giao nhanh 2h</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="mb-2 h-6 w-6 text-pink-600" />
                <span className="text-xs font-bold uppercase tracking-wider">100% Chính hãng</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="mb-2 h-6 w-6 text-pink-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Đổi trả 7 ngày</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 dark:bg-slate-900">
            <TabsTrigger value="description" className="text-base font-bold data-[state=active]:bg-white data-[state=active]:text-pink-600">Mô tả chi tiết</TabsTrigger>
            <TabsTrigger value="specs" className="text-base font-bold data-[state=active]:bg-white data-[state=active]:text-pink-600">Thông số kỹ thuật</TabsTrigger>
            <TabsTrigger value="reviews" className="text-base font-bold data-[state=active]:bg-white data-[state=active]:text-pink-600">Đánh giá ({product.reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-8">
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {product.description} Sản phẩm được nghiên cứu kỹ lưỡng để mang lại hiệu quả tối ưu nhất cho người sử dụng. 
                Thành phần tự nhiên, an toàn và lành tính, phù hợp với mọi loại da, kể cả da nhạy cảm nhất.
              </p>
              <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
                <li>• Thành phần 100% tự nhiên</li>
                <li>• Không chứa paraben và cồn</li>
                <li>• Công nghệ tiên tiến từ Hàn Quốc</li>
                <li>• Đã qua kiểm nghiệm da liễu</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specs" className="mt-8">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b dark:border-slate-800">
                <span className="font-bold text-slate-500">Thương hiệu</span>
                <span>Glow Beauty Premium</span>
              </div>
              <div className="flex justify-between py-2 border-b dark:border-slate-800">
                <span className="font-bold text-slate-500">Xuất xứ</span>
                <span>Hàn Quốc</span>
              </div>
              <div className="flex justify-between py-2 border-b dark:border-slate-800">
                <span className="font-bold text-slate-500">Trọng lượng / Dung tích</span>
                <span>50ml / 3.5g</span>
              </div>
              <div className="flex justify-between py-2 border-b dark:border-slate-800">
                <span className="font-bold text-slate-500">Loại da phù hợp</span>
                <span>Mọi loại da</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-8">
            {product.reviews.length > 0 ? (
              <div className="space-y-8">
                {product.reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">{review.user}</h4>
                      <span className="text-xs text-slate-500">{review.date}</span>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 fill-current ${i < review.rating ? "text-yellow-400" : "text-slate-300"}`} />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{review.comment}</p>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500 py-12">Chưa có đánh giá nào cho sản phẩm này.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-32">
          <SectionHeading title="Sản Phẩm Liên Quan" align="left" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
