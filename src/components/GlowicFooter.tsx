"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Share2, Globe } from "lucide-react";

const GlowicFooter = () => {
  return (
    <footer className="bg-brand-pink text-white pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <h1 className="text-4xl font-black tracking-tighter uppercase">Glowic</h1>
              <span className="text-[10px] ml-1 self-end mb-2 font-bold italic opacity-80">beauty</span>
            </Link>
            <div className="space-y-4">
              <h4 className="font-black text-lg uppercase tracking-wider">Thông tin liên hệ</h4>
              <div className="space-y-4 text-sm opacity-90">
                <div className="flex items-start gap-3 group">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Phone className="h-4 w-4 shrink-0" />
                  </div>
                  <span className="pt-1">Hotline: 1900 2410 (8:00 - 21:00)</span>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Mail className="h-4 w-4 shrink-0" />
                  </div>
                  <span className="pt-1">sales@glowic.com</span>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <MapPin className="h-4 w-4 shrink-0" />
                  </div>
                  <span className="pt-1 leading-relaxed">123 Đường Mỹ Phẩm, Quận 1, TP. Hồ Chí Minh</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] opacity-60 leading-loose uppercase tracking-widest font-bold">
              CÔNG TY TNHH MỘT THÀNH VIÊN GLOWIC<br />
              MST: 0312345678 - TP.HCM
            </p>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-6">
            <h4 className="font-black text-lg uppercase tracking-wider">Danh mục</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Trang chủ</Link></li>
              <li><Link href="/shop" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Danh mục sản phẩm</Link></li>
              <li><Link href="/flash-sale" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Flash Sale</Link></li>
              <li><Link href="/brands" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Thương hiệu nổi bật</Link></li>
              <li><Link href="/blog" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Bài viết mới nhất</Link></li>
            </ul>
            <div className="pt-4">
              <h4 className="font-black text-lg uppercase tracking-wider mb-4">Hỗ trợ</h4>
              <Link href="/faq" className="opacity-80 hover:opacity-100 text-sm font-medium">Câu hỏi thường gặp</Link>
            </div>
          </div>

          {/* Column 3: Policy */}
          <div className="space-y-6">
            <h4 className="font-black text-lg uppercase tracking-wider">Về Glowic</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/about" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Giới thiệu</Link></li>
              <li><Link href="/payment" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Phương thức thanh toán</Link></li>
              <li><Link href="/refund" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Chính sách đổi trả</Link></li>
              <li><Link href="/shipping" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Chính sách giao hàng</Link></li>
              <li><Link href="/privacy" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Chính sách bảo mật</Link></li>
              <li><Link href="/terms" className="opacity-80 hover:opacity-100 hover:pl-2 transition-all block">Điều khoản dịch vụ</Link></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h4 className="font-black text-lg uppercase tracking-wider">Kết nối với chúng tôi</h4>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-brand-pink transition-all font-black text-sm group shadow-lg">
                  FB
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-brand-pink transition-all font-black text-sm group shadow-lg">
                  IG
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-brand-pink transition-all font-black text-sm group shadow-lg">
                  TW
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-brand-pink transition-all font-black text-sm group shadow-lg">
                  YT
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-black text-lg uppercase tracking-wider">Thanh toán an toàn</h4>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white h-10 w-16 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-[10px] text-slate-400 font-black">VISA</span>
                </div>
                <div className="bg-white h-10 w-16 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-[10px] text-slate-400 font-black">MOMO</span>
                </div>
                <div className="bg-white h-10 w-16 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-[10px] text-slate-400 font-black">VNPAY</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs font-bold opacity-60 uppercase tracking-tighter">
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" /> Tiếng Việt
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-3 w-3" /> Theo dõi
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold opacity-40 uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Glowic Beauty Ecosystem. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/sitemap" className="hover:opacity-100 transition-opacity">Sitemap</Link>
            <Link href="/cookies" className="hover:opacity-100 transition-opacity">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlowicFooter;
