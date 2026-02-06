import { Product, Offer, Seller } from '@/types/marketplace';

export const sellers: Seller[] = [
  { id: 's1', name: 'GameVault Pro', rating: 4.9, verified: true, salesCount: 45230, responseTimeMinutes: 5, avatar: '' },
  { id: 's2', name: 'KeyMaster', rating: 4.7, verified: true, salesCount: 32100, responseTimeMinutes: 10, avatar: '' },
  { id: 's3', name: 'DigitalDeals', rating: 4.5, verified: false, salesCount: 8450, responseTimeMinutes: 30, avatar: '' },
  { id: 's4', name: 'InstantKeys', rating: 4.8, verified: true, salesCount: 67800, responseTimeMinutes: 2, avatar: '' },
  { id: 's5', name: 'GameForge', rating: 4.6, verified: true, salesCount: 21500, responseTimeMinutes: 15, avatar: '' },
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Elden Ring',
    platform: 'PC',
    thumbnailUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=600&fit=crop',
    description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.',
    categories: ['RPG', 'Action', 'Open World'],
    offers: ['o1', 'o2', 'o3'],
    lowestPrice: 42.99,
    currency: 'USD',
  },
  {
    id: 'p2',
    title: 'Cyberpunk 2077',
    platform: 'PC',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop',
    description: 'An open-world action-adventure set in the megalopolis of Night City.',
    categories: ['RPG', 'Action', 'Sci-Fi'],
    offers: ['o4', 'o5'],
    lowestPrice: 29.99,
    currency: 'USD',
  },
  {
    id: 'p3',
    title: 'God of War Ragnarök',
    platform: 'PS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493711662062-fa541f7f897a?w=400&h=600&fit=crop',
    description: 'Embark on an epic journey as Kratos and Atreus.',
    categories: ['Action', 'Adventure'],
    offers: ['o6', 'o7'],
    lowestPrice: 54.99,
    currency: 'USD',
  },
  {
    id: 'p4',
    title: 'Forza Horizon 5',
    platform: 'XBOX',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop',
    description: 'Explore the vibrant open world landscapes of Mexico.',
    categories: ['Racing', 'Open World'],
    offers: ['o8'],
    lowestPrice: 39.99,
    currency: 'USD',
  },
  {
    id: 'p5',
    title: 'The Legend of Zelda: TOTK',
    platform: 'NINTENDO',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop',
    description: 'An epic adventure across the land and skies of Hyrule.',
    categories: ['Adventure', 'Action', 'Open World'],
    offers: ['o9', 'o10'],
    lowestPrice: 59.99,
    currency: 'USD',
  },
  {
    id: 'p6',
    title: 'FIFA 24',
    platform: 'PC',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493711662062-fa541f7f897a?w=400&h=600&fit=crop',
    description: 'The worlds game with HyperMotion technology.',
    categories: ['Sports', 'Simulation'],
    offers: ['o11', 'o12'],
    lowestPrice: 34.99,
    currency: 'USD',
  },
  {
    id: 'p7',
    title: 'Hogwarts Legacy',
    platform: 'PC',
    thumbnailUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=600&fit=crop',
    description: 'Experience Hogwarts in the 1800s.',
    categories: ['RPG', 'Adventure', 'Open World'],
    offers: ['o13', 'o14'],
    lowestPrice: 44.99,
    currency: 'USD',
  },
  {
    id: 'p8',
    title: 'Steam Wallet $50',
    platform: 'PC',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop',
    description: 'Add $50 to your Steam Wallet.',
    categories: ['Gift Card', 'Steam'],
    offers: ['o15'],
    lowestPrice: 47.50,
    currency: 'USD',
  },
];

export const offers: Offer[] = [
  { id: 'o1', productId: 'p1', sellerId: 's1', price: 42.99, currency: 'USD', deliveryType: 'instant', regionLock: null, etaMinutes: 0, paymentMethods: ['card', 'paypal', 'crypto'], stock: 50, rating: 4.9, sellerBadge: ['verified', 'top-seller'] },
  { id: 'o2', productId: 'p1', sellerId: 's2', price: 44.99, currency: 'USD', deliveryType: 'instant', regionLock: 'EU', etaMinutes: 0, paymentMethods: ['card', 'paypal'], stock: 25, rating: 4.7, sellerBadge: ['verified'] },
  { id: 'o3', productId: 'p1', sellerId: 's3', price: 41.50, currency: 'USD', deliveryType: 'manual', regionLock: null, etaMinutes: 30, paymentMethods: ['card'], stock: 10, rating: 4.5, sellerBadge: [] },
  { id: 'o4', productId: 'p2', sellerId: 's1', price: 29.99, currency: 'USD', deliveryType: 'instant', regionLock: null, etaMinutes: 0, paymentMethods: ['card', 'paypal', 'crypto'], stock: 100, rating: 4.9, sellerBadge: ['verified', 'top-seller'] },
  { id: 'o5', productId: 'p2', sellerId: 's4', price: 31.99, currency: 'USD', deliveryType: 'instant', regionLock: 'US', etaMinutes: 0, paymentMethods: ['card', 'paypal'], stock: 45, rating: 4.8, sellerBadge: ['verified'] },
  { id: 'o6', productId: 'p3', sellerId: 's2', price: 54.99, currency: 'USD', deliveryType: 'instant', regionLock: null, etaMinutes: 0, paymentMethods: ['card', 'paypal'], stock: 30, rating: 4.7, sellerBadge: ['verified'] },
  { id: 'o7', productId: 'p3', sellerId: 's5', price: 56.99, currency: 'USD', deliveryType: 'email', regionLock: 'EU', etaMinutes: 60, paymentMethods: ['card'], stock: 15, rating: 4.6, sellerBadge: ['verified'] },
  { id: 'o8', productId: 'p4', sellerId: 's4', price: 39.99, currency: 'USD', deliveryType: 'instant', regionLock: null, etaMinutes: 0, paymentMethods: ['card', 'paypal', 'crypto'], stock: 80, rating: 4.8, sellerBadge: ['verified', 'top-seller'] },
  { id: 'o9', productId: 'p5', sellerId: 's1', price: 59.99, currency: 'USD', deliveryType: 'instant', regionLock: null, etaMinutes: 0, paymentMethods: ['card', 'paypal'], stock: 40, rating: 4.9, sellerBadge: ['verified', 'top-seller'] },
  { id: 'o10', productId: 'p5', sellerId: 's3', price: 57.99, currency: 'USD', deliveryType: 'manual', regionLock: null, etaMinutes: 45, paymentMethods: ['card'], stock: 5, rating: 4.5, sellerBadge: [] },
  { id: 'o11', productId: 'p6', sellerId: 's2', price: 34.99, currency: 'USD', deliveryType: 'instant', regionLock: null, etaMinutes: 0, paymentMethods: ['card', 'paypal'], stock: 60, rating: 4.7, sellerBadge: ['verified'] },
  { id: 'o12', productId: 'p6', sellerId: 's5', price: 36.99, currency: 'USD', deliveryType: 'instant', regionLock: 'EU', etaMinutes: 0, paymentMethods: ['card'], stock: 35, rating: 4.6, sellerBadge: ['verified'] },
  { id: 'o13', productId: 'p7', sellerId: 's1', price: 44.99, currency: 'USD', deliveryType: 'instant', regionLock: null, etaMinutes: 0, paymentMethods: ['card', 'paypal', 'crypto'], stock: 70, rating: 4.9, sellerBadge: ['verified', 'top-seller'] },
  { id: 'o14', productId: 'p7', sellerId: 's4', price: 46.99, currency: 'USD', deliveryType: 'instant', regionLock: null, etaMinutes: 0, paymentMethods: ['card', 'paypal'], stock: 55, rating: 4.8, sellerBadge: ['verified'] },
  { id: 'o15', productId: 'p8', sellerId: 's4', price: 47.50, currency: 'USD', deliveryType: 'instant', regionLock: null, etaMinutes: 0, paymentMethods: ['card', 'paypal'], stock: 999, rating: 4.8, sellerBadge: ['verified'] },
];

export const categories = [
  { id: 'games', name: 'Games', icon: '🎮' },
  { id: 'gift-cards', name: 'Gift Cards', icon: '🎁' },
  { id: 'top-ups', name: 'Top-Ups', icon: '💳' },
  { id: 'software', name: 'Software', icon: '💿' },
  { id: 'subscriptions', name: 'Subscriptions', icon: '🔄' },
];

export const platforms = ['PC', 'PS', 'XBOX', 'NINTENDO'] as const;

export function getSellerById(id: string): Seller | undefined {
  return sellers.find(s => s.id === id);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getOffersByProductId(productId: string): Offer[] {
  return offers.filter(o => o.productId === productId).sort((a, b) => a.price - b.price);
}

export function getOfferById(id: string): Offer | undefined {
  return offers.find(o => o.id === id);
}

export function searchProducts(query: string, platform?: string): Product[] {
  return products.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) ||
                         p.categories.some(c => c.toLowerCase().includes(query.toLowerCase()));
    const matchesPlatform = !platform || p.platform === platform;
    return matchesQuery && matchesPlatform;
  });
}
