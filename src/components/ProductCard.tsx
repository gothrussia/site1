import type { CSSProperties } from 'react';
import { localFallback } from '../data/images';
import { categories, minPrice, type Product } from '../data/products';
import { formatPrice } from '../hooks/useCart';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
  onOpen: (p: Product) => void;
  style?: CSSProperties;
}

export function ProductCard({ product, onOpen, style }: ProductCardProps) {
  const from = product.sizes.length > 1;
  return (
    <article className="card" style={style}>
      <button
        type="button"
        className="card__media"
        onClick={() => onOpen(product)}
        aria-label={`${product.name}: подробнее`}
        tabIndex={-1}
      >
        <SmartImage
          photoId={product.image.id}
          alt={product.image.alt}
          fallbackSrc={localFallback[product.category]}
          widths={[400, 640, 900]}
          ratio={1}
          sizes="(max-width: 560px) 92vw, (max-width: 1000px) 45vw, 300px"
        />
        {product.badge && <span className="card__badge">{product.badge}</span>}
      </button>
      <div className="card__body">
        <p className="card__cat">{categories.find((c) => c.id === product.category)?.title}</p>
        <h3 className="card__title">{product.name}</h3>
        <p className="card__desc">{product.short}</p>
        <div className="card__footer">
          <p className="card__price">
            {from && <span className="card__from">от</span>} {formatPrice(minPrice(product))}
          </p>
          <button type="button" className="btn btn--small btn--soft jelly" onClick={() => onOpen(product)}>
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
}
