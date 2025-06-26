import { IconLink } from '../../atoms/IconLink/IconLink';
import { Logo } from '../../atoms/Logo/Logo';
import { MenuLink } from '../../atoms/MenuLink/MenuLink';
import { Switcher } from '../../atoms/Switcher/Switcher';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceSharpIcon from '@mui/icons-material/BalanceSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';

interface Props {
  cartProducts: number;
  favProducts: number;
  compareProducts: number;
}

export const HeaderDesktop: React.FC<Props> = ({ cartProducts, favProducts, compareProducts }) => {
  return (
    <>
      <div className="nav__left__container">
        <Logo linkClass={"nav__logo"} imgClass={"nav__logo-image"} />

        <nav className="nav__menu">
        <MenuLink to="/">home</MenuLink>
        <MenuLink to="/phones">phones</MenuLink>
        <MenuLink to="/tablets">tablets</MenuLink>
        <MenuLink to="/accessories">accessories</MenuLink>
        </nav>
      </div>
      <Switcher />
      <div className="nav__icons">
        <IconLink
          to="/favourites"
          quantity={favProducts}
        >
          <FavoriteBorderIcon sx={{color: 'var(--primary-grey-color)'}}/>
        </IconLink>
        <IconLink
          to="/compare"
          quantity={compareProducts}
        >
          <BalanceSharpIcon sx={{color: 'var(--primary-grey-color)'}}/>
        </IconLink>
        <IconLink
          to="/cart"
          quantity={cartProducts}
        >
          <ShoppingCartSharpIcon sx={{color: 'var(--primary-grey-color)'}}/>
        </IconLink>
      </div>
    </>
  );
};
