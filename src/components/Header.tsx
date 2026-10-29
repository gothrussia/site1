import { useEffect, useState } from 'react';
import { categories } from '../data/products';
import type { CategoryId } from '../data/images';
import { BagIcon, CloseIcon, Logo, MenuIcon } from './Icons';

interface HeaderProps {
  active: CategoryId | 'all';
  onCategory: (c: CategoryId) => void;
  cartCount: number;
  onCartOpen: () => void;
}

export function Header({ active, onCategory, cartCount, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // лёгкое «подпрыгивание» счётчика при добавлении товара
  useEffect(() => {
    if (cartCount === 0) return;
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 450);
    return () => window.clearTimeout(t);
  }, [cartCount]);

  const pick = (c: CategoryId) => {
    onCategory(c);
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="glass header__bar">
        <a href="#top" className="brand" aria-label="Maison Douce — на главную">
          <Logo />
          <span className="brand__name">
            Maison <em>Douce</em>
          </span>
        </a>

        <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Категории десертов">
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={`nav__link jelly ${active === c.id ? 'is-active' : ''}`}
                  aria-current={active === c.id ? 'true' : undefined}
                  onClick={() => pick(c.id)}
                >
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="icon-btn glass-btn jelly cart-btn"
            onClick={onCartOpen}
            aria-label={`Корзина, товаров: ${cartCount}`}
          >
            <BagIcon />
            {cartCount > 0 && (
              <span className={`cart-badge ${bump ? 'is-bump' : ''}`} aria-hidden="true">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="icon-btn glass-btn jelly menu-btn"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
