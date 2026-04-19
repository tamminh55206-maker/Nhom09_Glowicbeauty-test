import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/GlowicHeader";
import Footer from "@/components/GlowicFooter";
import { Toaster } from "sonner";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glow Beauty | Cửa Hàng Mỹ Phẩm Cao Cấp",
  description: "Khám phá vẻ đẹp tỏa sáng với các dòng mỹ phẩm chính hãng và chất lượng tại Glow Beauty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full scroll-smooth antialiased">
      <body className={`${inter.className} flex min-h-full flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50`}>
        <Toaster position="top-center" richColors />
        <Header />
        <PageTransition>
          <main className="flex-grow">
            {children}
          </main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
