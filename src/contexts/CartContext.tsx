import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem } from '@/types/marketplace';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (offerId: string) => void;
  updateQuantity: (offerId: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.offerId === item.offerId);
      if (existing) {
        return prev.map(i => 
          i.offerId === item.offerId 
            ? { ...i, qty: i.qty + item.qty }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((offerId: string) => {
    setItems(prev => prev.filter(i => i.offerId !== offerId));
  }, []);

  const updateQuantity = useCallback((offerId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(offerId);
      return;
    }
    setItems(prev => prev.map(i => 
      i.offerId === offerId ? { ...i, qty } : i
    ));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
