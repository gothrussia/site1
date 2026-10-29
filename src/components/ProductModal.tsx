import { useState } from 'react';
import { categories, type Product } from '../data/products';
import { localFallback } from '../data/images';
import { formatPrice } from '../hooks/useCart';
import { useOverlay } from '../hooks/useOverlay';
import { SmartImage } from './SmartImage';
import { CloseIcon, MinusIcon, PlusIcon } from './Icons';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAdd: (productId: string, sizeId: string, qty: number) => void;
}

export function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const { ref, closing, close } = useOverlay(onClose);
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  const category = categories.find((c) => c.id === product.category);
  const titleId = `product-title-${product.id}`;

  const handleAdd = () => {
    onAdd(product.id, size.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className={`overlay ${closing ? 'is-closing' : ''}`} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div ref={ref} className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button type="button" className="icon-btn glass-btn jelly modal__close" onClick={close} aria-label="Закрыть">
          <CloseIcon />
        </button>

        <div className="modal__media">
          <SmartImage
            photoId={product.image.id}
            alt={product.image.alt}
            fallbackSrc={localFallback[product.category]}
            widths={[640, 960, 1200]}
            ratio={1}
            sizes="(max-width: 860px) 100vw, 50vw"
            eager
          />
          {product.badge && <span className="card__badge">{product.badge}</span>}
        </div>

        <div className="modal__body">
          <p className="eyebrow">{category?.title}</p>
          <h2 id={titleId} className="modal__title">
            {product.name}
          </h2>
          <p className="modal__desc">{product.description}</p>

          <div className="modal__block">
            <h3>Состав</h3>
            <p>{product.ingredients.join(', ')}.</p>
          </div>

          <div className="modal__block">
            <h3>Аллергены</h3>
            <ul className="chips">
              {product.allergens.map((a) => (
                <li key={a} className="chip">
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <fieldset className="modal__block sizes">
            <legend>Размер</legend>
            <div className="sizes__list">
              {product.sizes.map((s) => (
                <label key={s.id} className={`size jelly ${s.id === sizeId ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name={`size-${product.id}`}
                    value={s.id}
                    checked={s.id === sizeId}
                    onChange={() => setSizeId(s.id)}
                  />
                  <span className="size__label">{s.label}</span>
                  <span className="size__price">{formatPrice(s.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="modal__buy">
            <div className="qty" role="group" aria-label="Количество">
              <button
                type="button"
                className="qty__btn jelly"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Уменьшить количество"
              >
                <MinusIcon width={16} height={16} />
              </button>
              <output className="qty__value" aria-live="polite">
                {qty}
              </output>
              <button
                type="button"
                className="qty__btn jelly"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Увеличить количество"
              >
                <PlusIcon width={16} height={16} />
              </button>
            </div>
            <p className="modal__total">{formatPrice(size.price * qty)}</p>
          </div>

          <button type="button" className={`btn btn--primary btn--block jelly ${added ? 'is-done' : ''}`} onClick={handleAdd} data-autofocus>
            {added ? 'Добавлено в корзину ✓' : 'Добавить в корзину'}
          </button>
          <p className="note">Демонстрационные цена, состав и вес.</p>
        </div>
      </div>
    </div>
  );
}
