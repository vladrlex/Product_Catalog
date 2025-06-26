import { ReactNode } from "react"

interface H3Props extends React.ComponentProps<'h3'> {
  children: ReactNode;
}

export const H3: React.FC<H3Props> = ({ children, className = "", ...rest }) => {
  return (
    <h3 className={`h3-title ${className}`} {...rest}>{children}</h3>
  );
};
