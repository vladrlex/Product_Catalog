import { useState } from 'react';
import { Logo } from '../../atoms/Logo/Logo';
import { MenuLink } from '../../atoms/MenuLink/MenuLink';
import { MenuToggleIcon } from '../../atoms/MenuToggleIconMobile/MenuToggleIcon';
import { IconLink } from '../../atoms/IconLink/IconLink';
import { Switcher } from '../../atoms/Switcher/Switcher';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceSharpIcon from '@mui/icons-material/BalanceSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  cartProducts: number;
  favProducts: number;
  compareProducts: number;
}

export const HeaderMobile: React.FC<Props> = ({
  cartProducts,
  favProducts,
  compareProducts,
}) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <>
      <Logo linkClass={'nav__logo'} imgClass={'nav__logo-image'} />
      <Switcher />
      <MenuToggleIcon onClick={handleToggleMobileMenu}>
        <MenuIcon
          className="nav__icon"
          sx={{ color: 'var(--primary-grey-color)' }}
        />
      </MenuToggleIcon>

      <aside
        className={isMobileMenuActive ? 'nav--mobile active' : 'nav--mobile'}
      >
        <div className="top-bar">
          <Logo linkClass={'nav__logo'} imgClass={'nav__logo-image'} />

          <Switcher />

          <MenuToggleIcon onClick={handleToggleMobileMenu}>
            <CloseIcon
              className="nav__icon"
              sx={{ color: 'var(--primary-grey-color)' }}
            />
          </MenuToggleIcon>
        </div>

        <nav className="nav__menu--mobile">
          <ul
            className="nav__menu--mobile-links"
            onClick={handleToggleMobileMenu}
          >
            <li className="nav__menu--mobile--li">
              <MenuLink to="/" className="nav__menu-link--mobile">
                home
              </MenuLink>
            </li>
            <li className="nav__menu--mobile--li">
              <MenuLink to="/phones" className="nav__menu-link--mobile">
                phones
              </MenuLink>
            </li>
            <li className="nav__menu--mobile--li">
              <MenuLink to="/tablets" className="nav__menu-link--mobile">
                tablets
              </MenuLink>
            </li>
            <li className="nav__menu--mobile--li">
              <MenuLink to="/accessories" className="nav__menu-link--mobile">
                accessories
              </MenuLink>
            </li>
          </ul>
        </nav>

        <div className="bottom-bar" onClick={handleToggleMobileMenu}>
          <IconLink
            to="/favourites"
            className="bottom-bar__link"
            quantity={favProducts}
          >
            <FavoriteBorderIcon sx={{ color: 'var(--primary-grey-color)' }} />
          </IconLink>
          <IconLink
            to="/compare"
            className="bottom-bar__link"
            quantity={compareProducts}
          >
            <BalanceSharpIcon sx={{ color: 'var(--primary-grey-color)' }} />
          </IconLink>
          <IconLink
            to="/cart"
            className="bottom-bar__link"
            quantity={cartProducts}
          >
            <ShoppingCartSharpIcon
              sx={{ color: 'var(--primary-grey-color)' }}
            />
          </IconLink>
        </div>
      </aside>
    </>
  );
};
