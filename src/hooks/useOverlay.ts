import { useCallback, useEffect, useRef, useState } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Общая логика для модального окна и корзины:
 * закрытие по Escape, блокировка прокрутки, удержание фокуса внутри,
 * анимация закрытия и возврат фокуса на исходный элемент.
 */
export function useOverlay(onClose: () => void, closeDelay = 240) {
  const ref = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    if (closing) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setClosing(true);
    window.setTimeout(onClose, reduce ? 0 : closeDelay);
  }, [closing, onClose, closeDelay]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbar}px`;

    const node = ref.current;
    const first = node?.querySelector<HTMLElement>('[data-autofocus]') ?? node?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  return { ref, closing, close };
}
