export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'starters' | 'main_bowls' | 'refreshments';
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  time: string;
  distance: string;
  cuisine: string;
  categories: string[];
  bannerImage: string;
  deliveryFee: string;
  menu: MenuItem[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  specification: string;
  restaurantId: string;
}

export interface Order {
  id: string;
  restaurantName: string;
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  date: string;
  estimatedTime: string;
  courierName?: string;
  courierImage?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  address: string;
  phone: string;
}
