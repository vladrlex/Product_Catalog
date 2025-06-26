import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './design/organisms/Header/Header';
import { Footer } from './design/organisms/Footer/Footer';
import { GridTemplate } from './design/templates/GridTemplate';
import { GridRows } from './design/templates/GridRows';
// eslint-disable-next-line max-len
import { WelcomeAnimation } from './design/organisms/WelcomeAnimation/WelcomeAnimation';
import { useAppSelector } from './store/hooks';
import { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import './styles/simplebar.scss';

export const App = () => {
  const { theme } = useAppSelector(state => state.theme);
  const { pathname, search } = useLocation();
  const simpleBarRef = useRef<any>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (simpleBarRef.current) {
      simpleBarRef.current.getScrollElement().scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname, search]);

  return (
    <SimpleBar
      ref={simpleBarRef}
      style={{ maxHeight: '100dvh' }}
      autoHide={true}
    >
      <WelcomeAnimation />
      <GridRows>
        <Header />
        <GridTemplate>
          <Outlet />
        </GridTemplate>
        <Footer />
      </GridRows>
    </SimpleBar>
  );
};
