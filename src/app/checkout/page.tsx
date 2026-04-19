"use client";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CreditCard, Truck, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Họ tên không được để trống"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Địa chỉ không hợp lệ"),
  city: z.string().min(2, "Vui lòng chọn thành phố"),
  paymentMethod: z.enum(["cod", "banking", "momo"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod",
    }
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    // Chỉ chuyển hướng về giỏ hàng nếu giỏ hàng trống và không phải đang xử lý đặt hàng
    if (isMounted && items.length === 0 && !isSubmitting) {
      router.push("/cart");
    }
  }, [items, router, isMounted, isSubmitting]);

  if (!isMounted) return null;

  const onSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // eslint-disable-next-line react-hooks/purity
    const orderId = "#GB" + Math.floor(Math.random() * 100000);
    toast.success(`Chúc mừng! Đơn hàng của bạn đã được tiếp nhận (Mã đơn: ${orderId})`);
    clearCart();
    router.push("/");
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-12 text-4xl font-extrabold text-slate-900 dark:text-white">Thanh Toán</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left: Shipping Info */}
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-white font-bold">1</div>
              <h2 className="text-2xl font-bold">Thông tin nhận hàng</h2>
            </div>
            
            {!isAuthenticated && (
              <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                Bạn đã có tài khoản? <a href="/login" className="font-bold underline">Đăng nhập ngay</a> để tích điểm thành viên.
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input suppressHydrationWarning id="fullName" {...register("fullName")} />
                {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input suppressHydrationWarning id="phone" {...register("phone")} />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="address">Địa chỉ chi tiết</Label>
                <Input suppressHydrationWarning id="address" placeholder="Số nhà, tên đường, phường/xã..." {...register("address")} />
                {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="city">Tỉnh / Thành phố</Label>
                <Input suppressHydrationWarning id="city" placeholder="Hồ Chí Minh, Hà Nội..." {...register("city")} />
                {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-white font-bold">2</div>
              <h2 className="text-2xl font-bold">Phương thức thanh toán</h2>
            </div>

              <RadioGroup 
                defaultValue="cod" 
                className="grid grid-cols-1 gap-4"
                onValueChange={(val) => setValue("paymentMethod", val as "cod" | "banking" | "momo")}
              >
              <div className="flex items-center space-x-4 rounded-2xl border p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                <RadioGroupItem suppressHydrationWarning value="cod" id="cod" />
                <Label htmlFor="cod" className="flex flex-1 items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-slate-500" />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-4 rounded-2xl border p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                <RadioGroupItem suppressHydrationWarning value="banking" id="banking" />
                <Label htmlFor="banking" className="flex flex-1 items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-slate-500" />
                    <span>Chuyển khoản ngân hàng</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-4 rounded-2xl border p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                <RadioGroupItem suppressHydrationWarning value="momo" id="momo" />
                <Label htmlFor="momo" className="flex flex-1 items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-pink-500 rounded flex items-center justify-center text-[10px] text-white font-bold">M</div>
                    <span>Ví MoMo</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </section>
        </div>

        {/* Right: Order Summary */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl dark:bg-slate-900 dark:border-slate-800 sticky top-24">
            <h2 className="mb-6 text-xl font-bold">Tóm tắt đơn hàng</h2>
            
            <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-500">Số lượng: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-bold">{(item.price * item.quantity).toLocaleString()}đ</div>
                </div>
              ))}
            </div>

            <Separator className="mb-6" />
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Tạm tính</span>
                <span className="font-bold text-slate-900 dark:text-white">{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Phí vận chuyển</span>
                <span className="font-bold text-green-600">{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}đ`}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-extrabold">
                <span>Tổng tiền</span>
                <span className="text-pink-600">{total.toLocaleString()}đ</span>
              </div>
            </div>

            <Button 
              suppressHydrationWarning
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full h-14 rounded-xl bg-slate-900 text-lg font-bold hover:bg-pink-600 dark:bg-slate-700 active:scale-95 transition-all"
            >
              {isSubmitting ? "Đang đặt hàng..." : <>Hoàn tất đặt hàng <ChevronRight className="ml-2 h-5 w-5" /></>}
            </Button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Bảo mật thanh toán SSL 256-bit</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
