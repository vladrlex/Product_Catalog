import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  linkClass: string;
  imgClass: string;
}

export const Logo = ({ linkClass, imgClass }: Props) => {
  const {theme} = useAppSelector(state => state.theme);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  return (
    <Link to="/" className={linkClass} onClick={handleScrollToTop}>
      <img
        src={theme === 'dark' ? "/img/logos/Logo-dark.svg" : "/img/logos/logo.svg"}
        alt="Nice Gadgets Logo"
        className={imgClass}
      />
    </Link>
  );
};
