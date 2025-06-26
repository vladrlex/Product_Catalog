import { ReactNode } from "react"

interface H2Props extends React.ComponentProps<'h2'> {
  children: ReactNode;
}

export const H2: React.FC<H2Props> = ({ children, className = "", ...rest }) => {
  return (
    <h2 className={`h2-title ${className}`} {...rest}>{children}</h2>
  );
};
