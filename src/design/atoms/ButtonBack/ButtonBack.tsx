import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';

interface Props {
  className?: string;
}

export const ButtonBack = ({className=''}: Props) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className={`cart__back-button ${className}`} onClick={handleGoBack} >
      &lt; Back
    </button>
  );
};
