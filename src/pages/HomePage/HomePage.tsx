import { useEffect, useState } from 'react';
import {
  getHotPricedProducts,
  getProducts,
} from '../../services/api/allProductsAPI';
import { ShortProduct } from '../../types/ShortProduct';
import { ProductCard } from '../../design/organisms/ProductCard/ProductCard';
import { SwiperPhone } from '../../design/organisms/SwiperPhone/SwiperPhone';
import SwiperBanner from '../../design/organisms/SwiperBanner/SwiperBanner';
import { ShopByCategory } from '../../design/organisms/ShopByCategory';
import { H1 } from '../../design/atoms/Typography/H1/H1';
import { Category } from '../../types/Category';
import { Sorting } from '../../types/Sorting';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<ShortProduct[]>([]);
  const [newProducts, setNewProducts] = useState<ShortProduct[]>([]);

  const [isHotProductsLoading, setIsHotProductsLoading] = useState(true);
  const [isNewProductsLoading, setIsNewProductsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      getHotPricedProducts()
        .then(products => {
          setHotProducts(products);
        })
        .catch(error => {
          console.error('Error loading hot products:', error);
        })
        .finally(() => {
          setIsHotProductsLoading(false);
        });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getProducts({
        limit: 10,
        page: 1,
        category: Category.Phones,
        sortBy: Sorting.Newest,
      })
        .then(res => {
          setNewProducts(res.products);
        })
        .catch(error => {
          console.error('Error loading new products:', error);
        })
        .finally(() => {
          setIsNewProductsLoading(false);
        });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <H1 className="home-page__title">{t("hello_world")}</H1> */}
      <H1 className="home-page__title">Welcome to Nice Gadgets store</H1>

      <div className="home-page__content">
        <SwiperBanner />
      </div>

      <div className="home-page__content">
        <SwiperPhone title="Brand new models" isLoading={isNewProductsLoading}>
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SwiperPhone>
      </div>

      <ShopByCategory />

      <div className="home-page__content">
        <SwiperPhone title="Hot prices" isLoading={isHotProductsLoading}>
          {hotProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SwiperPhone>
      </div>
    </>
  );
};
