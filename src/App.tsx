import { useCallback, useEffect, useState } from 'react';
import type { CategoryId } from './data/images';
import type { Product } from './data/products';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog, type SortMode } from './components/Catalog';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { About, Benefits, Contacts, Favorites, Footer, Gallery } from './components/Sections';

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
};

export default function App() {
  const cart = useCart();
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('popular');
  const [openProduct, setOpenProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const goCategory = useCallback((c: CategoryId) => {
    setCategory(c);
    setQuery('');
    scrollToId('catalog');
  }, []);

  const addToCart = (productId: string, sizeId: string, qty: number) => {
    cart.add(productId, sizeId, qty);
    setToast('Десерт добавлен в корзину');
  };

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  return (
    <>
      <a className="skip-link" href="#catalog">
        Перейти к каталогу
      </a>
      <Header active={category} onCategory={goCategory} cartCount={cart.count} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onCatalog={() => scrollToId('catalog')} onFavorite={() => scrollToId('favorites')} />
        <Catalog
          category={category}
          onCategory={setCategory}
          query={query}
          onQuery={setQuery}
          sort={sort}
          onSort={setSort}
          onOpen={setOpenProduct}
        />
        <Favorites onOpen={setOpenProduct} />
        <About />
        <Benefits />
        <Gallery />
        <Contacts />
      </main>
      <Footer />

      {openProduct && (
        <ProductModal key={openProduct.id} product={openProduct} onClose={() => setOpenProduct(null)} onAdd={addToCart} />
      )}
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onBrowse={() => scrollToId('catalog')} />}

      <div className="toast-region" aria-live="polite">
        {toast && (
          <div className="toast glass">
            {toast}
            <button
              type="button"
              className="toast__link"
              onClick={() => {
                setToast(null);
                setOpenProduct(null);
                setCartOpen(true);
              }}
            >
              Открыть
            </button>
          </div>
        )}
      </div>
    </>
  );
}
