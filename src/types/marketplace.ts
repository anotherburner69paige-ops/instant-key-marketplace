// Data models matching the API contracts
export interface Product {
  id: string;
  title: string;
  platform: 'PC' | 'PS' | 'XBOX' | 'NINTENDO';
  thumbnailUrl: string;
  description: string;
  categories: string[];
  offers: string[];
  lowestPrice: number;
  currency: string;
}

export interface Offer {
  id: string;
  productId: string;
  sellerId: string;
  price: number;
  currency: string;
  deliveryType: 'instant' | 'manual' | 'email';
  regionLock: string | null;
  etaMinutes: number;
  paymentMethods: ('card' | 'paypal' | 'crypto')[];
  stock: number;
  rating: number;
  sellerBadge: ('verified' | 'top-seller')[];
}

export interface Seller {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  salesCount: number;
  responseTimeMinutes: number;
  avatar?: string;
}

export interface CartItem {
  offerId: string;
  productId: string;
  price: number;
  qty: number;
  title: string;
  thumbnailUrl: string;
  platform: Product['platform'];
  sellerName: string;
}

export interface Order {
  id: string;
  userId: string;
  items: { offerId: string; price: number; qty: number }[];
  total: number;
  currency: string;
  status: 'pending' | 'processing' | 'delivered' | 'failed';
  deliveredPayload?: { type: 'key'; value: string };
  createdAt: string;
}

export type Platform = Product['platform'];
export type DeliveryType = Offer['deliveryType'];
export type PaymentMethod = 'card' | 'paypal' | 'crypto';
