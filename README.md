# Product Catalog

Проєкт "Product Catalog" — це сучасний веб-застосунок для перегляду, фільтрації, сортування та додавання товарів у кошик, обране чи порівняння.
[DEMO](https://harmonious-faloodeh-7b7ebb.netlify.app/)

## 🚀 Технології

- React + TypeScript
- Redux Toolkit
- Vite
- SCSS (SASS)
- Atomic Design
- REST API

## 📁 Структура проєкту

```
src/
├── design/                 # Atomic Design (atoms, molecules, organisms, templates)
│
├── pages/                 # Сторінки застосунку
│   ├── Cart/
│   ├── Catalogs/
│   ├── ComparePage/
│   ├── ErrorPage/
│   ├── FavouritesPage/
│   ├── HomePage/
│   └── ProductPage/
│
├── services/              # API-клієнти
│   ├── api/
│   └── client/
│
├── store/                 # Redux store + features
│   ├── features/
│   │   ├── cartProducts.ts
│   │   ├── compareProducts.ts
│   │   ├── favouriteProducts.ts
│   │   ├── recentlyViewedProducts.tsx
│   │   └── theme.ts
│   ├── middleware.ts
│   ├── hooks.ts
│   └── store.ts
│
├── styles/                # Глобальні стилі
├── types/                 # Типи TypeScript
├── utils/                 # Хелпери: сортування, пагінація тощо
│
├── App.tsx
├── root.tsx
├── theme.ts
├── main.tsx
└── vite-env.d.ts
```

## 📦 Скрипти

- `npm run dev` — запуск застосунку у режимі розробки
- `npm run build` — зібрати проєкт
- `npm run preview` — перегляд production-збірки
