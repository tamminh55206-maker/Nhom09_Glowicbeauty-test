"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { MOCK_ORDERS, Order } from "@/lib/mock-data";
import { 
  User, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Star, 
  Clock, 
  HelpCircle, 
  Headphones, 
  BookOpen, 
  ChevronRight,
  Edit3,
  LogOut,
  MapPin,
  CreditCard,
  Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SIDEBAR_ITEMS = [
  { id: "profile", label: "Tài khoản của tôi", icon: User },
  { id: "orders", label: "Đơn mua", icon: Package },
  { id: "notifications", label: "Thông báo", icon: Bell },
  { id: "payment", label: "Ngân hàng", icon: CreditCard },
  { id: "address", label: "Địa chỉ", icon: MapPin },
];

const SUPPORT_ITEMS = [
  { label: "Trung tâm trợ giúp", icon: HelpCircle },
  { label: "Chăm sóc khách hàng", icon: Headphones },
  { label: "Blog làm đẹp", icon: BookOpen },
];

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [orderFilter, setOrderFilter] = useState("all");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isMounted || !user) return null;

  const filteredOrders = MOCK_ORDERS.filter(order => 
    orderFilter === "all" ? true : order.status === orderFilter
  );

  const handleAction = (action: string) => {
    toast.info(`Tính năng '${action}' đang được phát triển.`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-8">
          <div className="flex items-center space-x-4 px-2">
            <Avatar className="h-12 w-12 ring-2 ring-pink-100">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{user.name}</p>
              <button onClick={() => handleAction("Chỉnh sửa hồ sơ")} className="text-xs text-slate-500 hover:text-pink-600 flex items-center">
                <Edit3 className="h-3 w-3 mr-1" /> Sửa hồ sơ
              </button>
            </div>
          </div>

          <nav className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? "bg-pink-50 text-pink-600 dark:bg-pink-900/20" 
                    : "text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
            <Separator className="my-4" />
            <button 
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-5 w-5" />
              <span>Đăng xuất</span>
            </button>
          </nav>

          <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-900">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Hỗ trợ</h4>
            <div className="space-y-3">
              {SUPPORT_ITEMS.map((item) => (
                <button key={item.label} className="flex w-full items-center justify-between text-sm text-slate-600 hover:text-pink-600">
                  <span className="flex items-center">
                    <item.icon className="h-4 w-4 mr-2" /> {item.label}
                  </span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {activeTab === "orders" ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Đơn mua của tôi</h2>
              </div>

              <Tabs defaultValue="all" className="w-full" onValueChange={setOrderFilter}>
                <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-slate-100 rounded-none h-auto p-0 mb-6 dark:border-slate-800">
                  <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 px-6 py-4 font-bold">Tất cả</TabsTrigger>
                  <TabsTrigger value="pending" className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 px-6 py-4 font-bold">Chờ xác nhận</TabsTrigger>
                  <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 px-6 py-4 font-bold">Đang giao</TabsTrigger>
                  <TabsTrigger value="delivered" className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 px-6 py-4 font-bold">Hoàn thành</TabsTrigger>
                  <TabsTrigger value="cancelled" className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 px-6 py-4 font-bold">Đã hủy</TabsTrigger>
                </TabsList>

                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    {filteredOrders.length > 0 ? (
                      <motion.div
                        key={orderFilter}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        {filteredOrders.map((order) => (
                          <OrderCard key={order.id} order={order} />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-slate-400"
                      >
                        <Package className="h-16 w-16 mb-4 opacity-20" />
                        <p>Chưa có đơn hàng nào.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Tabs>
            </div>
          ) : (
            <Card className="border-slate-100 shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <CardTitle>{SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label}</CardTitle>
              </CardHeader>
              <CardContent className="py-20 text-center text-slate-400">
                Tính năng này đang được phát triển.
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Chờ thanh toán";
      case "shipping": return "Đang giao";
      case "delivered": return "Hoàn thành";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 mr-1 text-orange-500" />;
      case "shipping": return <Truck className="h-4 w-4 mr-1 text-blue-500" />;
      case "delivered": return <CheckCircle className="h-4 w-4 mr-1 text-green-500" />;
      case "cancelled": return <XCircle className="h-4 w-4 mr-1 text-red-500" />;
      default: return null;
    }
  };

  return (
    <Card className="border-slate-100 shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 py-4 dark:border-slate-800">
        <div className="flex items-center text-sm font-bold text-slate-900 dark:text-white">
          <Package className="h-4 w-4 mr-2 text-pink-600" />
          Mã đơn: {order.id}
        </div>
        <div className="flex items-center text-sm font-bold uppercase tracking-wider">
          {getStatusIcon(order.status)}
          <span className={
            order.status === "delivered" ? "text-green-600" : 
            order.status === "shipping" ? "text-blue-600" : 
            order.status === "pending" ? "text-orange-600" : "text-red-600"
          }>
            {getStatusText(order.status)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                <p className="text-sm text-slate-500">Số lượng: x{item.quantity}</p>
                <p className="text-sm font-bold text-pink-600">{item.price.toLocaleString()}đ</p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-lg font-bold">
            Thành tiền: <span className="text-pink-600">{order.totalPrice.toLocaleString()}đ</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-xl border-slate-200">Theo dõi đơn hàng</Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl max-w-md">
                <DialogHeader>
                  <DialogTitle>Lịch sử vận chuyển</DialogTitle>
                </DialogHeader>
                <div className="mt-6 space-y-6">
                  {order.timeline.map((event, idx) => (
                    <div key={idx} className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-0 last:pb-0 dark:border-slate-800">
                      <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white bg-slate-200 dark:border-slate-900 ${idx === 0 ? "bg-pink-600 ring-4 ring-pink-100 dark:ring-pink-900/30" : ""}`} />
                      <p className={`text-sm font-bold ${idx === 0 ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>{event.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{event.date}</p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {order.status === "delivered" ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="rounded-xl bg-pink-600 hover:bg-pink-700">Đánh giá</Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl">
                    <DialogHeader>
                      <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="h-8 w-8 text-yellow-400 cursor-pointer fill-current" />
                        ))}
                      </div>
                      <textarea 
                        className="w-full h-32 rounded-2xl border border-slate-200 p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-800 dark:border-slate-700"
                        placeholder="Chia sẻ cảm nhận của bạn về sản phẩm nhé..."
                      />
                      <Button className="w-full rounded-xl bg-pink-600" onClick={() => toast.success("Cảm ơn bạn đã đánh giá!")}>Gửi đánh giá</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" className="rounded-xl text-slate-500" onClick={() => toast.info("Yêu cầu hoàn tiền đã được gửi.")}>Yêu cầu hoàn tiền</Button>
              </>
            ) : order.status === "shipping" ? (
              <Button className="rounded-xl bg-pink-600" onClick={() => toast.success("Đã xác nhận nhận hàng.")}>Đã nhận hàng</Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
