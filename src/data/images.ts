/**
 * Фотографии с Unsplash (https://unsplash.com).
 * Лицензия Unsplash: бесплатное коммерческое и некоммерческое использование,
 * указание автора не обязательно (https://unsplash.com/license).
 * Фотографии Unsplash+ (premium) сознательно не используются.
 *
 * Для каждого изображения строится:
 *  1) основная ссылка (auto=format: браузер получает WebP/AVIF);
 *  2) запасная ссылка на тот же снимок в формате JPG;
 *  3) локальная иллюстрация из /public/fallback, если Unsplash недоступен.
 */

export type CategoryId = 'cakes' | 'pastries' | 'bakery' | 'croissants' | 'shakes';

const BASE = 'https://images.unsplash.com/photo-';

export interface PhotoSource {
  /** id фотографии в CDN Unsplash: часть URL после "photo-" */
  id: string;
  /** Описание для alt-текста */
  alt: string;
}

export function unsplashUrl(id: string, width: number, height?: number): string {
  const h = height ? `&h=${height}` : '';
  return `${BASE}${id}?auto=format&fit=crop&w=${width}${h}&q=75`;
}

export function unsplashSrcSet(id: string, widths: number[], ratio?: number): string {
  return widths
    .map((w) => `${unsplashUrl(id, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`)
    .join(', ');
}

/** Тот же снимок, но явно в JPG — на случай проблем с автоматическим форматом. */
export function unsplashJpgUrl(id: string, width: number): string {
  return `${BASE}${id}?fm=jpg&fit=crop&w=${width}&q=70`;
}

const fallback = (name: string) => `${import.meta.env.BASE_URL}fallback/${name}.svg`;

export const localFallback: Record<CategoryId | 'hero', string> = {
  hero: fallback('hero'),
  cakes: fallback('cakes'),
  pastries: fallback('pastries'),
  bakery: fallback('bakery'),
  croissants: fallback('croissants'),
  shakes: fallback('shakes'),
};

export const heroPhoto: PhotoSource = {
  id: '1677840147140-252adb9ca347',
  alt: 'Нежно-розовый торт с кремовыми розочками и свежей клубникой',
};

export const aboutPhoto: PhotoSource = {
  id: '1629389861081-43cc4f172b0c',
  alt: 'Белый торт, украшенный нежно-розовыми цветами',
};

export const galleryPhotos: (PhotoSource & { fallback: CategoryId })[] = [
  { id: '1558326567-98ae2405596b', alt: 'Пастельные макаронс на розовом фоне', fallback: 'pastries' },
  { id: '1717677737586-99affb851595', alt: 'Мини-пирожные со взбитыми сливками и ягодами', fallback: 'pastries' },
  { id: '1530648672449-81f6c723e2f1', alt: 'Розовые муссовые пирожные с клубникой', fallback: 'pastries' },
  { id: '1587536849024-daaa4a417b16', alt: 'Капкейки с пастельным кремом', fallback: 'cakes' },
  { id: '1633435904053-ce175c8057d1', alt: 'Кусочек торта на столе с цветами', fallback: 'cakes' },
  { id: '1770488853558-fe21a2f98089', alt: 'Разноцветные меренги', fallback: 'pastries' },
  { id: '1620527793798-d3e7d7a02eb3', alt: 'Макаронс и сердечки на белой тарелке', fallback: 'pastries' },
  { id: '1702745572427-c7c772b45ff3', alt: 'Макаронс на нежно-розовой поверхности', fallback: 'pastries' },
];
