
export type Category = 'Shirts' | 'Chinos' | 'Bags' | 'Shoes' | 'Accessories' | 'Denims' | 'Polos' | 'Vouchers';
export type Fit = 'Slim Fit' | 'Regular Fit' | 'Relaxed Fit' | 'Standard';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  description: string;
  image: string;
  colors: string[];
  sizes: string[];
  fit: Fit;
  inStock: boolean;
  onSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
  totalPrice: number;
}
