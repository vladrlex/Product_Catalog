import { useEffect, useState } from 'react';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { useAppSelector } from '../../../store/hooks';

export const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const cartProducts = useAppSelector(state => state.cartProducts);
  const favProducts = useAppSelector(state => state.favouriteProducts);
  const compareProducts = useAppSelector(state => state.compareProducts);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <div className="nav">
      <div className="nav__container">
        {width > 768 && (
          <HeaderDesktop
            cartProducts={cartProducts.length}
            favProducts={favProducts.length}
            compareProducts={compareProducts.length}
          />
        )}
        {width <= 768 && (
          <HeaderMobile
            cartProducts={cartProducts.length}
            favProducts={favProducts.length}
            compareProducts={compareProducts.length}
          />
        )}
      </div>
    </div>
  );
};
