import { ReactNode } from "react"

interface H4Props extends React.ComponentProps<'h4'> {
  children: ReactNode;
}

export const H4: React.FC<H4Props> = ({ children, className = "", ...rest }) => {
  return (
    <h4 className={`h4-title ${className}`} {...rest}>{children}</h4>
  );
}