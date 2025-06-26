import { ReactNode } from "react"

interface H1Props extends React.ComponentProps<'h1'> {
  children: ReactNode;
}

export const H1: React.FC<H1Props> = ({ children, className = "", ...rest }) => {
  return (
    <h1 className={`h1-title ${className}`} {...rest}>{children}</h1>
  );
};
