import { ReactNode } from "react"

interface P_UpperCaseProps extends React.ComponentProps<'p'> {
  children: ReactNode;
}

export const P_UpperCase: React.FC<P_UpperCaseProps> = ({ children, className = "", ...rest }) => {
  return (
    <p className={`p-uppercase ${className}`} {...rest}>{children}</p>
  );
}
