interface GridTemplateProps {
  children: React.ReactNode;
};

export const GridTemplate = ({ children }: GridTemplateProps) => {
  return (
    <div className="container-margin">
      <div className="global-container">
        {children}
      </div>
    </div>
  );
};
