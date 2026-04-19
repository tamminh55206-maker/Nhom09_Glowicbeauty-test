"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Họ tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  subject: z.string().min(5, "Tiêu đề quá ngắn"),
  message: z.string().min(10, "Nội dung tin nhắn quá ngắn"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
    reset();
  };

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold sm:text-6xl text-slate-900 dark:text-white"
          >
            Liên Hệ Với Chúng Tôi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Glow Beauty luôn lắng nghe ý kiến đóng góp và hỗ trợ khách hàng 24/7. 
            Hãy để lại lời nhắn nếu bạn có bất kỳ thắc mắc nào.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 dark:bg-pink-900/30">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Địa chỉ showroom</h3>
                    <p className="mt-2 text-slate-500 leading-relaxed">
                      123 Đường Mỹ Phẩm, Quận 1, <br />
                      Thành phố Hồ Chí Minh, Việt Nam.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Điện thoại</h3>
                    <p className="mt-2 text-slate-500">
                      Hotline: 1900 1234 <br />
                      CSKH: 028 3333 4444
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Email</h3>
                    <p className="mt-2 text-slate-500">
                      contact@glowbeauty.vn <br />
                      support@glowbeauty.vn
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-3xl border shadow-xl h-80 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.460232428331!2d106.6914669!3d10.7717883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f5018e581%3A0x2b255a06be331904!2zRGluaCDEkOG7mWMgTOG6rXA!5e0!3m2!1svi!2s!4v1713374400000!5m2!1svi!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="mb-8 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-pink-600" />
                <h2 className="text-2xl font-bold">Gửi lời nhắn cho chúng tôi</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" placeholder="Nguyễn Văn A" {...register("name")} />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" {...register("email")} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Tiêu đề</Label>
                  <Input id="subject" placeholder="Cần hỗ trợ về..." {...register("subject")} />
                  {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Nội dung tin nhắn</Label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-900 dark:border-slate-800"
                    placeholder="Viết lời nhắn của bạn ở đây..."
                    {...register("message")}
                  ></textarea>
                  {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-xl bg-slate-900 text-lg font-bold hover:bg-pink-600 transition-all active:scale-95"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : <><Send className="mr-2 h-5 w-5" /> Gửi tin nhắn ngay</>}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
