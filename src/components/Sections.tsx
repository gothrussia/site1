import { aboutPhoto, galleryPhotos, localFallback } from '../data/images';
import { favoriteIds, minPrice, products, type Product } from '../data/products';
import { formatPrice } from '../hooks/useCart';
import { SmartImage } from './SmartImage';
import {
  ClockIcon,
  GiftIcon,
  HandIcon,
  InstagramIcon,
  LeafIcon,
  Logo,
  PhoneIcon,
  PinIcon,
  TelegramIcon,
  VkIcon,
} from './Icons';

export function Favorites({ onOpen }: { onOpen: (p: Product) => void }) {
  const favs = favoriteIds.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  return (
    <section className="section favorites" id="favorites" aria-labelledby="fav-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Выбор гостей</p>
          <h2 id="fav-title" className="section__title">
            Наши <em>фавориты</em>
          </h2>
        </header>
        <div className="fav-grid">
          {favs.map((p, i) => (
            <button key={p.id} type="button" className={`fav jelly-soft fav--${i}`} onClick={() => onOpen(p)}>
              <SmartImage
                photoId={p.image.id}
                alt={p.image.alt}
                fallbackSrc={localFallback[p.category]}
                widths={[480, 800, 1100]}
                sizes="(max-width: 700px) 92vw, 45vw"
              />
              <span className="fav__caption glass">
                <span className="fav__name">{p.name}</span>
                <span className="fav__price">от {formatPrice(minPrice(p))}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__inner">
        <div className="about__media">
          <SmartImage
            photoId={aboutPhoto.id}
            alt={aboutPhoto.alt}
            fallbackSrc={localFallback.cakes}
            widths={[480, 800, 1100]}
            ratio={1.15}
            sizes="(max-width: 900px) 92vw, 44vw"
          />
        </div>
        <div className="about__text">
          <p className="eyebrow">О нас</p>
          <h2 id="about-title" className="section__title">
            Маленькая кондитерская <em>с большим сердцем</em>
          </h2>
          <p>
            Maison Douce родилась из любви к французской патиссери и русскому домашнему чаепитию. Мы печём небольшими
            партиями каждое утро, сами варим конфитюры и кремы и никуда не торопимся — потому что нежность не терпит спешки.
          </p>
          <p>
            Каждый десерт собирается вручную: от тончайших коржей медовика до глянцевой глазури муссовых пирожных.
          </p>
          <p className="about__sign">— команда Maison Douce</p>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: LeafIcon, title: 'Свежие ингредиенты', text: 'Фермерские сливки, настоящее сливочное масло, сезонные ягоды и никаких консервантов.' },
  { icon: HandIcon, title: 'Ручная работа', text: 'Каждый торт и каждое пирожное собираются кондитером вручную небольшими партиями.' },
  { icon: GiftIcon, title: 'Красивая упаковка', text: 'Пудровые коробки с лентой и открыткой — десерт сразу готов стать подарком.' },
];

export function Benefits() {
  return (
    <section className="section benefits" aria-labelledby="benefits-title">
      <div className="container">
        <h2 id="benefits-title" className="visually-hidden">
          Преимущества
        </h2>
        <ul className="benefits__list">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title} className="benefit">
              <span className="benefit__icon">
                <Icon width={24} height={24} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Галерея</p>
          <h2 id="gallery-title" className="section__title">
            Немного <em>красоты</em>
          </h2>
        </header>
        <ul className="gallery__grid">
          {galleryPhotos.map((g, i) => (
            <li key={g.id} className={`gallery__item gallery__item--${i}`}>
              <SmartImage
                photoId={g.id}
                alt={g.alt}
                fallbackSrc={localFallback[g.fallback]}
                widths={[400, 700]}
                sizes="(max-width: 700px) 46vw, 25vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Contacts() {
  return (
    <section className="section contacts" id="contacts" aria-labelledby="contacts-title">
      <div className="container contacts__inner glass">
        <div>
          <p className="eyebrow">Контакты</p>
          <h2 id="contacts-title" className="section__title">
            Заходите <em>на чай</em>
          </h2>
        </div>
        <ul className="contacts__list">
          <li>
            <PinIcon /> <span>ул. Сливочная, 7 (демо-адрес)</span>
          </li>
          <li>
            <ClockIcon /> <span>Ежедневно, 8:00 — 21:00</span>
          </li>
          <li>
            <PhoneIcon /> <a href="tel:+70000000000">+7 (000) 000-00-00</a>
          </li>
        </ul>
        <div className="socials">
          <a className="icon-btn glass-btn jelly" href="#" aria-label="Instagram (демо-ссылка)">
            <InstagramIcon />
          </a>
          <a className="icon-btn glass-btn jelly" href="#" aria-label="Telegram (демо-ссылка)">
            <TelegramIcon />
          </a>
          <a className="icon-btn glass-btn jelly" href="#" aria-label="ВКонтакте (демо-ссылка)">
            <VkIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="brand">
          <Logo />
          <span className="brand__name">
            Maison <em>Douce</em>
          </span>
        </a>
        <p className="footer__note">
          © {new Date().getFullYear()} Maison Douce · демонстрационный сайт. Цены и составы вымышлены.
          <br />
          Фотографии —{' '}
          <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">
            Unsplash (лицензия Unsplash)
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
