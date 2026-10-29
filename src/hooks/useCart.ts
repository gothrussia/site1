import { useEffect, useMemo, useReducer } from 'react';
import { products, type Product, type SizeOption } from '../data/products';

export interface CartLine {
  key: string; // productId::sizeId
  productId: string;
  sizeId: string;
  qty: number;
}

export interface CartLineView extends CartLine {
  product: Product;
  size: SizeOption;
  lineTotal: number;
}

type Action =
  | { type: 'add'; productId: string; sizeId: string; qty: number }
  | { type: 'setQty'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'clear' };

const STORAGE_KEY = 'maison-douce-cart-v1';
const MAX_QTY = 99;

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const key = `${action.productId}::${action.sizeId}`;
      const existing = state.find((l) => l.key === key);
      if (existing) {
        return state.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + action.qty) } : l));
      }
      return [...state, { key, productId: action.productId, sizeId: action.sizeId, qty: Math.min(MAX_QTY, action.qty) }];
    }
    case 'setQty':
      if (action.qty <= 0) return state.filter((l) => l.key !== action.key);
      return state.map((l) => (l.key === action.key ? { ...l, qty: Math.min(MAX_QTY, action.qty) } : l));
    case 'remove':
      return state.filter((l) => l.key !== action.key);
    case 'clear':
      return [];
  }
}

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    // отбрасываем позиции, которых больше нет в каталоге
    return Array.isArray(parsed)
      ? parsed.filter((l) => {
          const p = products.find((x) => x.id === l.productId);
          return p && p.sizes.some((s) => s.id === l.sizeId) && l.qty > 0;
        })
      : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [lines, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* хранилище недоступно — корзина просто живёт до перезагрузки */
    }
  }, [lines]);

  const view = useMemo<CartLineView[]>(
    () =>
      lines.flatMap((l) => {
        const product = products.find((p) => p.id === l.productId);
        const size = product?.sizes.find((s) => s.id === l.sizeId);
        if (!product || !size) return [];
        return [{ ...l, product, size, lineTotal: size.price * l.qty }];
      }),
    [lines],
  );

  const count = view.reduce((n, l) => n + l.qty, 0);
  const total = view.reduce((n, l) => n + l.lineTotal, 0);

  return {
    lines: view,
    count,
    total,
    add: (productId: string, sizeId: string, qty = 1) => dispatch({ type: 'add', productId, sizeId, qty }),
    setQty: (key: string, qty: number) => dispatch({ type: 'setQty', key, qty }),
    remove: (key: string) => dispatch({ type: 'remove', key }),
    clear: () => dispatch({ type: 'clear' }),
  };
}

export type Cart = ReturnType<typeof useCart>;

export const formatPrice = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;
