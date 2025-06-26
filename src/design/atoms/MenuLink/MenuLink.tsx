import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { P_UpperCase } from '../Typography/P_UpperCase/P_UpperCase';

interface Props {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MenuLink = ({ to, children, className = '', onClick }: Props) => (
  <NavLink
    to={to}
    className={cn('link__effects', className || 'nav__menu-link')}
    onClick={onClick}
  >
    <P_UpperCase>{children}</P_UpperCase>
  </NavLink>
);
