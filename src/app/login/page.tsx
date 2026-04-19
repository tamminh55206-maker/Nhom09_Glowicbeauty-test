"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { LogIn, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Giả lập đăng nhập
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (data.email === "test@example.com" && data.password === "123456") {
      login({
        id: "1",
        name: "Người dùng thử",
        email: data.email,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
      });
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } else {
      toast.error("Email hoặc mật khẩu không đúng. (Gợi ý: test@example.com / 123456)");
    }
  };

  return (
    <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl dark:bg-slate-900 dark:border-slate-800"
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Chào mừng trở lại</h1>
          <p className="mt-2 text-slate-500">Đăng nhập vào tài khoản Glow Beauty của bạn</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              suppressHydrationWarning
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                suppressHydrationWarning
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox suppressHydrationWarning id="rememberMe" {...register("rememberMe")} />
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>
            <Link href="#" className="text-sm font-bold text-pink-600 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            suppressHydrationWarning
            type="submit"
            className="w-full h-12 rounded-xl bg-slate-900 text-base font-bold hover:bg-pink-600 transition-all active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : <><LogIn className="mr-2 h-4 w-4" /> Đăng nhập</>}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-slate-500">Chưa có tài khoản? </span>
          <Link href="/register" className="font-bold text-pink-600 hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
