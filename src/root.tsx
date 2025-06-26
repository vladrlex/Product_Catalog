import { App } from './App';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage.tsx';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage.tsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { PhonesCatalog } from './pages/Catalogs/PhonesCatalog/PhonesCatalog.tsx';
import { TabletsCatalog } from './pages/Catalogs/TabletsCatalog/TabletsCatalog.tsx';
import { AccessoriesCatalog } from './pages/Catalogs/AccessoriesCatalog/AccessoriesCatalog.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { ProductPage } from './pages/ProductPage/ProductPage.tsx';
import { ComparePage } from './pages/ComparePage/ComparePage.tsx';

export const Root = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="homepage" element={<Navigate to="/" />}></Route>
            <Route path="phones">
              <Route index element={<PhonesCatalog />} />
              <Route path=":tabId" element={<ProductPage />} />
            </Route>
            <Route path="tablets">
              <Route index element={<TabletsCatalog />} />
              <Route path=":tabId" element={<ProductPage />} />
            </Route>
            <Route path="accessories">
              <Route index element={<AccessoriesCatalog />} />
              <Route path=":tabId" element={<ProductPage />} />
            </Route>
            <Route path="favourites" element={<FavouritesPage />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="compare" element={<ComparePage />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
};
