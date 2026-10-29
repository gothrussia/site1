import { useMemo } from 'react';
import { categories, minPrice, products, type Product } from '../data/products';
import type { CategoryId } from '../data/images';
import { ProductCard } from './ProductCard';
import { CloseIcon, SearchIcon } from './Icons';

export type SortMode = 'popular' | 'price-asc' | 'price-desc';

interface CatalogProps {
  category: CategoryId | 'all';
  onCategory: (c: CategoryId | 'all') => void;
  query: string;
  onQuery: (q: string) => void;
  sort: SortMode;
  onSort: (s: SortMode) => void;
  onOpen: (p: Product) => void;
}

const normalize = (s: string) => s.toLowerCase().replace(/ё/g, 'е').trim();

export function Catalog({ category, onCategory, query, onQuery, sort, onSort, onOpen }: CatalogProps) {
  const list = useMemo(() => {
    const q = normalize(query);
    const filtered = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (!q) return true;
      return normalize(`${p.name} ${p.short}`).includes(q);
    });
    const sorted = [...filtered];
    if (sort === 'popular') sorted.sort((a, b) => b.popularity - a.popularity);
    if (sort === 'price-asc') sorted.sort((a, b) => minPrice(a) - minPrice(b));
    if (sort === 'price-desc') sorted.sort((a, b) => minPrice(b) - minPrice(a));
    return sorted;
  }, [category, query, sort]);

  const current = categories.find((c) => c.id === category);

  return (
    <section className="section catalog" id="catalog" aria-labelledby="catalog-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Каталог</p>
          <h2 id="catalog-title" className="section__title">
            {current ? current.title : 'Все десерты'}
          </h2>
          <p className="section__sub">{current ? current.subtitle : 'Выберите категорию или найдите десерт по названию'}</p>
        </header>

        <div className="toolbar">
          <div className="tabs" role="tablist" aria-label="Категории">
            {(['all', ...categories.map((c) => c.id)] as const).map((id) => {
              const title = id === 'all' ? 'Все' : categories.find((c) => c.id === id)!.title;
              const count = id === 'all' ? products.length : products.filter((p) => p.category === id).length;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={category === id}
                  className={`tab jelly ${category === id ? 'is-active' : ''}`}
                  onClick={() => onCategory(id)}
                >
                  {title}
                  <span className="tab__count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="toolbar__row">
            <label className="search glass">
              <SearchIcon />
              <span className="visually-hidden">Поиск по названию десерта</span>
              <input
                type="search"
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="Найти десерт…"
                autoComplete="off"
              />
              {query && (
                <button type="button" className="search__clear jelly" onClick={() => onQuery('')} aria-label="Очистить поиск">
                  <CloseIcon width={16} height={16} />
                </button>
              )}
            </label>

            <label className="sort">
              <span className="sort__label">Сортировка</span>
              <select value={sort} onChange={(e) => onSort(e.target.value as SortMode)}>
                <option value="popular">По популярности</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>
            </label>
          </div>
        </div>

        <p className="catalog__meta" aria-live="polite">
          {list.length > 0 ? `Найдено: ${list.length}` : ''}
        </p>

        {list.length > 0 ? (
          <div className="grid" key={`${category}-${sort}`}>
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} onOpen={onOpen} style={{ animationDelay: `${Math.min(i, 10) * 45}ms` }} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p className="empty__title">Ничего не нашлось</p>
            <p className="empty__text">
              По запросу «{query}» {current ? `в разделе «${current.title}»` : ''} десертов нет. Попробуйте другое слово.
            </p>
            <button
              type="button"
              className="btn btn--soft jelly"
              onClick={() => {
                onQuery('');
                onCategory('all');
              }}
            >
              Показать все десерты
            </button>
          </div>
        )}
        <p className="note">Цены, составы и вес на сайте демонстрационные.</p>
      </div>
    </section>
  );
}
