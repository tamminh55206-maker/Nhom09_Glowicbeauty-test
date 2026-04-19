import { Product } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Son Kem Lì Siêu Mịn",
    price: 350000,
    description: "Son kem lì với kết cấu siêu nhẹ, màu sắc rực rỡ và độ bám cao suốt cả ngày.",
    images: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1000&auto=format&fit=crop"],
    category: "Trang điểm môi",
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        user: "Nguyễn An",
        rating: 5,
        comment: "Màu rất đẹp, không gây khô môi.",
        date: "2024-03-15",
      },
    ],
  },
  {
    id: "2",
    name: "Serum Cấp Ẩm Hyaluronic Acid",
    price: 520000,
    description: "Serum giúp cấp ẩm sâu, làm căng bóng da và giảm thiểu nếp nhăn hiệu quả.",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop"],
    category: "Chăm sóc da",
    rating: 4.9,
    reviews: [],
  },
  {
    id: "3",
    name: "Phấn Nước Cushion Che Phủ Hoàn Hảo",
    price: 480000,
    description: "Cushion mang lại lớp nền mỏng nhẹ tự nhiên nhưng vẫn có độ che phủ cực tốt.",
    images: ["https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1000&auto=format&fit=crop"],
    category: "Trang điểm mặt",
    rating: 4.7,
    reviews: [],
  },
  {
    id: "4",
    name: "Kem Chống Nắng Phổ Rộng",
    price: 420000,
    description: "Bảo vệ da tối ưu dưới tác động của tia UVA/UVB, không để lại vệt trắng.",
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop"],
    category: "Chăm sóc da",
    rating: 4.8,
    reviews: [],
  },
  {
    id: "5",
    name: "Nước Tẩy Trang Dịu Nhẹ",
    price: 280000,
    description: "Làm sạch sâu bụi bẩn và lớp trang điểm mà không gây kích ứng cho da.",
    images: ["https://images.unsplash.com/photo-1556229167-731384e96bb9?q=80&w=1000&auto=format&fit=crop"],
    category: "Làm sạch",
    rating: 4.6,
    reviews: [],
  },
];

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: "pending" | "shipping" | "delivered" | "cancelled";
  items: OrderItem[];
  totalPrice: number;
  timeline: { date: string; message: string }[];
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    date: "2024-03-15",
    status: "delivered",
    totalPrice: 630000,
    items: [
      {
        id: "1",
        name: "Son Kem Lì Siêu Mịn",
        price: 350000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: "5",
        name: "Nước Tẩy Trang Dịu Nhẹ",
        price: 280000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556229167-731384e96bb9?q=80&w=1000&auto=format&fit=crop"
      }
    ],
    timeline: [
      { date: "2024-03-15 14:30", message: "Đơn hàng đã được giao thành công" },
      { date: "2024-03-14 09:15", message: "Đang trên đường giao đến bạn" },
      { date: "2024-03-13 18:00", message: "Đã rời kho phân loại" },
      { date: "2024-03-13 10:00", message: "Đã xác nhận thanh toán" }
    ]
  },
  {
    id: "ORD-002",
    date: "2024-03-17",
    status: "shipping",
    totalPrice: 520000,
    items: [
      {
        id: "2",
        name: "Serum Cấp Ẩm Hyaluronic Acid",
        price: 520000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop"
      }
    ],
    timeline: [
      { date: "2024-03-18 08:00", message: "Shipper đang lấy hàng" },
      { date: "2024-03-17 21:00", message: "Đơn hàng đang được đóng gói" },
      { date: "2024-03-17 20:00", message: "Chờ xác nhận" }
    ]
  },
  {
    id: "ORD-003",
    date: "2024-03-18",
    status: "pending",
    totalPrice: 280000,
    items: [
      {
        id: "5",
        name: "Nước Tẩy Trang Dịu Nhẹ",
        price: 280000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556229167-731384e96bb9?q=80&w=1000&auto=format&fit=crop"
      }
    ],
    timeline: [
      { date: "2024-03-18 10:00", message: "Đang chờ thanh toán" }
    ]
  }
];
