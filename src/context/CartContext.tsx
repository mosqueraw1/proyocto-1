import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { Product } from '../types';

type CartItem = { product: Product; qty: number };

type Action = { type: 'ADD'; product: Product } | { type: 'REMOVE'; id: string } | { type: 'CLEAR' };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const idx = state.findIndex(ci => ci.product.id === action.product.id);
      if (idx >= 0) {
        const copy = [...state];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...state, { product: action.product, qty: 1 }];
    }
    case 'REMOVE': {
      const found = state.find(ci => ci.product.id === action.id);
      if (!found) return state;
      if (found.qty <= 1) return state.filter(ci => ci.product.id !== action.id);
      return state.map(ci => (ci.product.id === action.id ? { ...ci, qty: ci.qty - 1 } : ci));
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

const CartContext = createContext<any>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, []);
  const total = useMemo(() => state.reduce((sum, it) => sum + it.product.price * it.qty, 0), [state]);
  return (
    <CartContext.Provider value={{ items: state, add: (p: Product) => dispatch({ type: 'ADD', product: p }), remove: (id: string) => dispatch({ type: 'REMOVE', id }), clear: () => dispatch({ type: 'CLEAR' }), total }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() { return useContext(CartContext); }
