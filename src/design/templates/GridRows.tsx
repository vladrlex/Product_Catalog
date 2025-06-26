interface Props {
  children: React.ReactNode;
};

export const GridRows = ({ children }: Props) => {
  return (
    <div className="container-grid-rows">
      {children}
    </div>
  );
};
