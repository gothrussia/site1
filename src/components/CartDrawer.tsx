import { useState } from 'react';
import { localFallback } from '../data/images';
import { formatPrice, type Cart } from '../hooks/useCart';
import { useOverlay } from '../hooks/useOverlay';
import { SmartImage } from './SmartImage';
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

interface CartDrawerProps {
  cart: Cart;
  onClose: () => void;
  onBrowse: () => void;
}

export function CartDrawer({ cart, onClose, onBrowse }: CartDrawerProps) {
  const { ref, closing, close } = useOverlay(onClose, 300);
  const [ordered, setOrdered] = useState<number | null>(null);

  const checkout = () => {
    setOrdered(cart.total);
    cart.clear();
  };

  return (
    <div className={`overlay overlay--drawer ${closing ? 'is-closing' : ''}`} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <aside ref={ref} className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="drawer__head">
          <h2 id="cart-title">Корзина</h2>
          <button type="button" className="icon-btn glass-btn jelly" onClick={close} aria-label="Закрыть корзину" data-autofocus>
            <CloseIcon />
          </button>
        </header>

        {ordered !== null ? (
          <div className="drawer__empty">
            <div className="drawer__empty-icon" aria-hidden="true">✓</div>
            <p className="empty__title">Спасибо! Это демо-заказ</p>
            <p className="empty__text">
              Заказ на {formatPrice(ordered)} оформлен в демонстрационном режиме. Реальная оплата и доставка на сайте пока
              не подключены, деньги не списываются.
            </p>
            <button type="button" className="btn btn--soft jelly" onClick={() => setOrdered(null)}>
              Понятно
            </button>
          </div>
        ) : cart.lines.length === 0 ? (
          <div className="drawer__empty">
            <div className="drawer__empty-icon" aria-hidden="true">
              <BagIcon width={30} height={30} />
            </div>
            <p className="empty__title">Здесь пока пусто</p>
            <p className="empty__text">Загляните в каталог — там торты, макаронс и тёплые круассаны.</p>
            <button
              type="button"
              className="btn btn--primary jelly"
              onClick={() => {
                close();
                onBrowse();
              }}
            >
              Выбрать десерт
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer__list">
              {cart.lines.map((l) => (
                <li key={l.key} className="line">
                  <div className="line__img">
                    <SmartImage
                      photoId={l.product.image.id}
                      alt={l.product.image.alt}
                      fallbackSrc={localFallback[l.product.category]}
                      widths={[160]}
                      ratio={1}
                      sizes="80px"
                    />
                  </div>
                  <div className="line__info">
                    <p className="line__name">{l.product.name}</p>
                    <p className="line__size">
                      {l.size.label} · {formatPrice(l.size.price)}
                    </p>
                    <div className="qty qty--small" role="group" aria-label={`Количество: ${l.product.name}`}>
                      <button type="button" className="qty__btn jelly" onClick={() => cart.setQty(l.key, l.qty - 1)} aria-label="Уменьшить">
                        <MinusIcon width={14} height={14} />
                      </button>
                      <output className="qty__value">{l.qty}</output>
                      <button type="button" className="qty__btn jelly" onClick={() => cart.setQty(l.key, l.qty + 1)} aria-label="Увеличить">
                        <PlusIcon width={14} height={14} />
                      </button>
                    </div>
                  </div>
                  <div className="line__side">
                    <p className="line__total">{formatPrice(l.lineTotal)}</p>
                    <button type="button" className="line__remove jelly" onClick={() => cart.remove(l.key)} aria-label={`Удалить ${l.product.name}`}>
                      <TrashIcon width={16} height={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="drawer__foot">
              <div className="drawer__sum">
                <span>Итого · {cart.count} шт.</span>
                <strong>{formatPrice(cart.total)}</strong>
              </div>
              <button type="button" className="btn btn--primary btn--block jelly" onClick={checkout}>
                Оформить заказ (демо)
              </button>
              <p className="note">Онлайн-оплата не подключена: это демонстрационный сайт, оплата не проводится.</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
