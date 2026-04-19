import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-pink-600">GLOW BEAUTY</h3>
            <p className="text-sm text-slate-500">
              Nâng tầm vẻ đẹp tự nhiên của bạn với các sản phẩm mỹ phẩm cao cấp và an toàn nhất.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Mua sắm</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/products" className="hover:text-pink-600">Tất cả sản phẩm</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-pink-600">Sản phẩm mới</Link></li>
              <li><Link href="/best-sellers" className="hover:text-pink-600">Bán chạy nhất</Link></li>
              <li><Link href="/deals" className="hover:text-pink-600">Khuyến mãi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/faq" className="hover:text-pink-600">Câu hỏi thường gặp</Link></li>
              <li><Link href="/shipping" className="hover:text-pink-600">Giao hàng & Trả hàng</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-600">Chính sách bảo mật</Link></li>
              <li><Link href="/terms" className="hover:text-pink-600">Điều khoản sử dụng</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Email: support@glowbeauty.vn</li>
              <li>Hotline: 1900 1234</li>
              <li>Địa chỉ: 123 Đường ABC, Quận X, TP. HCM</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500 dark:border-slate-800">
          <p>© {new Date().getFullYear()} Glow Beauty. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
