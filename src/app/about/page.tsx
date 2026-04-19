"use client";

import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Mail, Globe, Link2 } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Nguyễn Văn A",
    id: "21000001",
    role: "Nhóm trưởng / Full-stack Developer",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    github: "https://github.com/",
    linkedin: "#",
  },
  {
    name: "Trần Thị B",
    id: "21000002",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    github: "https://github.com/",
    linkedin: "#",
  },
  {
    name: "Lê Văn C",
    id: "21000003",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    github: "https://github.com/",
    linkedin: "#",
  },
  {
    name: "Phạm Thị D",
    id: "21000004",
    role: "Content Specialist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    github: "https://github.com/",
    linkedin: "#",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-slate-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000&auto=format&fit=crop"
          alt="Beauty Lab"
          fill
          className="object-cover opacity-50"
        />
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold sm:text-7xl"
          >
            Về Glow Beauty
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-xl text-slate-300"
          >
            Sứ mệnh của chúng tôi là mang đến vẻ đẹp bền vững và rạng rỡ thông qua những sản phẩm mỹ phẩm cao cấp nhất.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
                <p>
                  Glow Beauty được thành lập vào năm 2024 bởi một nhóm các chuyên gia đam mê làm đẹp và sức khỏe da liễu. 
                  Chúng tôi nhận thấy nhu cầu ngày càng cao về những sản phẩm làm đẹp không chỉ hiệu quả mà còn phải an toàn và thân thiện với môi trường.
                </p>
                <p>
                  Mọi sản phẩm của Glow Beauty đều trải qua quy trình kiểm tra nghiêm ngặt, đảm bảo 100% không chứa các hóa chất độc hại, 
                  không thử nghiệm trên động vật và sử dụng bao bì có thể tái chế.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1556228578-8c7c2f2241b4?q=80&w=1000&auto=format&fit=crop"
                alt="Our values"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Đội Ngũ Thực Hiện" 
            subtitle="Dự án được phát triển bởi nhóm sinh viên đam mê công nghệ và làm đẹp."
          />
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative mb-6 h-64 w-64 overflow-hidden rounded-3xl shadow-lg transition-transform group-hover:scale-105">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-pink-600/20 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-sm font-bold text-pink-600 mb-2 uppercase tracking-wide">{member.role}</p>
                <p className="text-sm text-slate-500 mb-4">MSSV: {member.id}</p>
                
                <div className="flex space-x-4">
                  <Link href={member.github} target="_blank" className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:text-pink-600 transition-colors">
                    <Link2 className="h-5 w-5" />
                  </Link>
                  <Link href={member.linkedin} target="_blank" className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:text-pink-600 transition-colors">
                    <Globe className="h-5 w-5" />
                  </Link>
                  <Link href={`mailto:${member.id}@student.vn`} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:text-pink-600 transition-colors">
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-slate-900 py-16 px-8 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
               <Image src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1000&auto=format&fit=crop" alt="Pattern" fill className="object-cover" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Bạn đã sẵn sàng để tỏa sáng?</h2>
              <p className="mb-8 max-w-xl mx-auto text-slate-400 text-lg">
                Gia nhập cộng đồng Glow Beauty ngay hôm nay để nhận được những ưu đãi đặc biệt và bí quyết làm đẹp độc quyền.
              </p>
              <Link 
                href="/shop" 
                className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-pink-600 px-10 py-4 text-lg font-bold hover:bg-pink-700 transition-colors")}
              >
                Khám phá cửa hàng
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
