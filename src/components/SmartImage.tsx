import { useEffect, useRef, useState } from 'react';
import { unsplashJpgUrl, unsplashSrcSet, unsplashUrl } from '../data/images';

interface SmartImageProps {
  photoId: string;
  alt: string;
  /** Локальная иллюстрация на случай, если фото не загрузилось */
  fallbackSrc: string;
  /** Ширины для srcset */
  widths?: number[];
  /** Высота / ширина — если нужно резать кадр на стороне CDN */
  ratio?: number;
  sizes?: string;
  className?: string;
  eager?: boolean;
  /** Сколько ждать загрузки, прежде чем переключиться на запасной вариант, мс */
  timeoutMs?: number;
}

type Stage = 'primary' | 'jpg' | 'local';

/**
 * Изображение с плавной загрузкой и цепочкой запасных вариантов:
 * Unsplash (WebP/AVIF) → тот же снимок в JPG → локальная SVG-иллюстрация.
 * Если сеть «зависла», по таймауту тоже переходим к следующему варианту.
 */
export function SmartImage({
  photoId,
  alt,
  fallbackSrc,
  widths = [480, 800, 1200],
  ratio,
  sizes = '(max-width: 640px) 100vw, 33vw',
  className = '',
  eager = false,
  timeoutMs = 15000,
}: SmartImageProps) {
  const [stage, setStage] = useState<Stage>('primary');
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Сбрасываем состояние, если сменилась фотография
  useEffect(() => {
    setStage('primary');
    setLoaded(false);
  }, [photoId]);

  // Если изображение уже в кэше, onLoad может не прийти до гидрации — проверяем вручную
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, [stage, photoId]);

  // Таймаут на случай «подвисшей» загрузки
  useEffect(() => {
    if (loaded || stage === 'local') return;
    const img = imgRef.current;
    // ленивые изображения ещё не начали грузиться — таймер запускаем, только когда они в зоне видимости
    let timer: number | undefined;
    const start = () => {
      timer = window.setTimeout(() => {
        if (!imgRef.current || imgRef.current.naturalWidth === 0) next();
      }, timeoutMs);
    };
    if (!img || eager || !('IntersectionObserver' in window)) {
      start();
      return () => window.clearTimeout(timer);
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        start();
      }
    }, { rootMargin: '200px' });
    io.observe(img);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, loaded, photoId]);

  function next() {
    setLoaded(false);
    setStage((s) => (s === 'primary' ? 'jpg' : 'local'));
  }

  const maxW = widths[widths.length - 1];
  let src: string;
  let srcSet: string | undefined;
  if (stage === 'primary') {
    src = unsplashUrl(photoId, maxW, ratio ? Math.round(maxW * ratio) : undefined);
    srcSet = unsplashSrcSet(photoId, widths, ratio);
  } else if (stage === 'jpg') {
    src = unsplashJpgUrl(photoId, maxW);
  } else {
    src = fallbackSrc;
  }

  return (
    <span
      className={`smart-img ${loaded ? 'is-loaded' : 'is-loading'} ${stage === 'local' ? 'is-fallback' : ''} ${className}`}
    >
      <img
        ref={imgRef}
        key={stage}
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (stage !== 'local') next();
          else setLoaded(true); // даже локальная картинка не загрузилась — показываем фон-заглушку
        }}
      />
    </span>
  );
}
