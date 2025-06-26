import { FC } from "react";
import cn from "classnames";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isInCart?: boolean;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children, isInCart = false, className = '', ...rest}) => {
  return (
    <button 
    className={cn(`primary-button ${className}`, {
      'primary-button--active': isInCart,
    })} 
    {...rest}>
            {isInCart ? 'Added' : children}
    </button>
  );
};
