"use client";

import { useState, useMemo } from "react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

const CATEGORIES = ["Tất cả", "Chăm sóc da", "Trang điểm", "Nước hoa", "Làm sạch", "Trang điểm môi", "Trang điểm mặt"];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Tất cả" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // Default newest (mock data doesn't have dates yet)
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cửa hàng</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`lg:w-1/4 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between lg:hidden">
            <h2 className="text-xl font-bold">Bộ lọc</h2>
            <button onClick={() => setShowFilters(false)}><X className="h-6 w-6" /></button>
          </div>

          {/* Search */}
          <div className="space-y-3">
            <Label className="text-base font-bold">Tìm kiếm</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input 
                suppressHydrationWarning
                placeholder="Tên sản phẩm..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label className="text-base font-bold">Danh mục</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1 text-sm transition-colors hover:bg-pink-100 hover:text-pink-600 dark:hover:bg-pink-900"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-bold">Khoảng giá</Label>
              <span className="text-sm font-medium text-pink-600">
                {priceRange[1].toLocaleString()}đ
              </span>
            </div>
            <Slider
              defaultValue={[0, 1000000]}
              max={1000000}
              step={10000}
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as number[])}
              className="py-4"
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>0đ</span>
              <span>1.000.000đ+</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Sản phẩm ({filteredProducts.length})
            </h1>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button 
                suppressHydrationWarning
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium lg:hidden"
              >
                <Filter className="h-4 w-4" /> Lọc
              </button>
              
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-none rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-900 dark:border-slate-800"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex h-96 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 dark:border-slate-800">
              <Search className="mb-4 h-12 w-12 opacity-20" />
              <p className="text-lg font-medium">Không tìm thấy sản phẩm nào phù hợp.</p>
              <button 
                suppressHydrationWarning
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Tất cả");
                  setPriceRange([0, 1000000]);
                }}
                className="mt-4 text-pink-600 underline"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
