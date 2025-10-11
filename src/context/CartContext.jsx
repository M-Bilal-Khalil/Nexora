import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_items_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart_items_v1', JSON.stringify(cartItems));
  }, [cartItems]);

  const normalizeId = (product) => product.id ?? product._id ?? product.sku ?? String(product.title ?? product.name);

  const addToCart = (product) => {
    const id = normalizeId(product);
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      }
      const price = Number(product.price ?? 0);
      const title = product.title ?? product.name ?? 'Product';
      const image = product.image ?? product.thumbnail ?? '';
      return [...prev, { id, title, price, qty: 1, image }];
    });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const incrementQty = (id) => setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));

  // if qty becomes 0 we remove the item
  const decrementQty = (id) => setCartItems(prev => prev.flatMap(item => {
    if (item.id !== id) return item;
    const newQty = item.qty - 1;
    if (newQty <= 0) return []; // remove
    return { ...item, qty: newQty };
  }));

  const resetCart = () => setCartItems([]);

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  const itemCount = cartItems.length; // distinct products count (badge shows this)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      incrementQty,
      decrementQty,
      resetCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
