"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserPlus, ArrowLeft } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
    router.push("/login");
  };

  return (
    <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl dark:bg-slate-900 dark:border-slate-800"
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Tạo tài khoản mới</h1>
          <p className="mt-2 text-slate-500">Khởi đầu hành trình làm đẹp cùng Glow Beauty</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input suppressHydrationWarning id="name" placeholder="Nguyễn Văn A" {...register("name")} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input suppressHydrationWarning id="email" type="email" placeholder="name@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input suppressHydrationWarning id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <Input suppressHydrationWarning id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <Button
            suppressHydrationWarning
            type="submit"
            className="w-full h-12 rounded-xl bg-slate-900 text-base font-bold hover:bg-pink-600 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : <><UserPlus className="mr-2 h-4 w-4" /> Đăng ký</>}
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link href="/login" className="flex items-center justify-center font-bold text-slate-500 hover:text-pink-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại đăng nhập
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
