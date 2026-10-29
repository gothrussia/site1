import { heroPhoto, localFallback } from '../data/images';
import { SmartImage } from './SmartImage';

interface HeroProps {
  onCatalog: () => void;
  onFavorite: () => void;
}

export function Hero({ onCatalog, onFavorite }: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow reveal">Pâtisserie · Maison Douce</p>
          <h1 id="hero-title" className="hero__title reveal">
            Маленькие радости <em>со вкусом нежности</em>
          </h1>
          <p className="hero__lead reveal">Авторские десерты, созданные с любовью к каждой детали.</p>
          <div className="hero__cta reveal">
            <button type="button" className="btn btn--primary jelly" onClick={onCatalog}>
              Открыть каталог
            </button>
            <button type="button" className="btn btn--glass glass-btn jelly" onClick={onFavorite}>
              Выбрать любимый десерт
            </button>
          </div>
          <dl className="hero__facts reveal">
            <div>
              <dt>28</dt>
              <dd>десертов в меню</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>ручная работа</dd>
            </div>
            <div>
              <dt>0</dt>
              <dd>консервантов</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual reveal">
          <div className="hero__frame">
            <SmartImage
              photoId={heroPhoto.id}
              alt={heroPhoto.alt}
              fallbackSrc={localFallback.hero}
              widths={[640, 960, 1400]}
              ratio={1.2}
              sizes="(max-width: 900px) 92vw, 46vw"
              eager
            />
          </div>
          <div className="hero__chip glass" aria-hidden="true">
            <span className="hero__chip-dot" />
            Испечено сегодня утром
          </div>
        </div>
      </div>
    </section>
  );
}
