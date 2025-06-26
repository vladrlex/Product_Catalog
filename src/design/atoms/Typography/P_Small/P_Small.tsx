import { ReactNode } from "react"

interface P_SmallProps extends React.ComponentProps<'p'> {
  children: ReactNode;
}

export const P_Small: React.FC<P_SmallProps> = ({ children, className = "", ...rest }) => {
  return (
    <p className={`p-small ${className}`} {...rest}>{children}</p>
  );
};
