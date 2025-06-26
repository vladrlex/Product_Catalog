import { FC } from "react"
import './CardsContainer.scss'

interface CardsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardsContainer: FC<CardsContainerProps> = ({ children, className = '', ...rest }) => {
  return (
    <div className={`cards-container-grid ${className}`} {...rest}>{children}</div>
  );
};
