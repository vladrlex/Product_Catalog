import { Link } from 'react-router-dom';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export const MenuToggleIcon = ({ onClick, children }: Props) => {
  return (
    <div className="nav__icons">
      <Link to="#" className="nav__icon-link link__effects" onClick={onClick}>
        {children}
      </Link>
    </div>
  );
};