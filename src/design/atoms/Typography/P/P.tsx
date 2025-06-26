import { ReactNode } from "react"

interface P_Props extends React.ComponentProps<'p'> {
  children: ReactNode;
}

export const P: React.FC<P_Props> = ({ children, className = "", ...rest }) => {
  return (
    <p className={`p-regular ${className}`} {...rest}>{children}</p>
  );
}