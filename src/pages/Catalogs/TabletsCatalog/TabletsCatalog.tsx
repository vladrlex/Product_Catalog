import { Category } from '../../../types/Category';
import { ProductsCatalog } from '../MainCatalog/ProductsCatalog';

export const TabletsCatalog = () => {
  return (
    <ProductsCatalog
      title="Tablets"
      category={Category.Tablets}

    />
  );
};
