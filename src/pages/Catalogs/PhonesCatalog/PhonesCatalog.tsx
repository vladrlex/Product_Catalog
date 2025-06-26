import { Category } from "../../../types/Category";
import { ProductsCatalog } from "../MainCatalog/ProductsCatalog";

export const PhonesCatalog = () => {
  return (
    <ProductsCatalog
      title="Mobile Phones"
      category={Category.Phones}

    />
  );
};
