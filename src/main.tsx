import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/base.css';
import './styles/layout.css';
import './styles/catalog.css';
import './styles/overlays.css';
import './styles/sections.css';

/**
 * Желеобразная анимация нажатия: класс .is-jelly добавляется любому элементу
 * с классом .jelly при нажатии и снимается по окончании анимации.
 */
document.addEventListener('pointerdown', (e) => {
  const el = (e.target as Element | null)?.closest<HTMLElement>('.jelly, .jelly-soft');
  if (!el || el.matches(':disabled')) return;
  el.classList.remove('is-jelly');
  void el.offsetWidth; // перезапуск анимации
  el.classList.add('is-jelly');
});
document.addEventListener('animationend', (e) => {
  const el = e.target as HTMLElement;
  if (e.animationName.startsWith('jelly')) el.classList.remove('is-jelly');
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
