import { Category } from "../../../types/Category";
import { ProductsCatalog } from "../MainCatalog/ProductsCatalog";

export const AccessoriesCatalog = () => {
  return (
    <ProductsCatalog
      title="Accessories"
      category={Category.Accessories}
    />
  );
};
