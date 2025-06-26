import { useEffect, useState } from 'react';
import { ButtonBack } from '../../design/atoms/ButtonBack/ButtonBack';
import { H4 } from '../../design/atoms/Typography/H4/H4';
import { ComparisonTable } from '../../design/organisms/CompareTable/CompareTable';
import { ProductCard } from '../../design/organisms/ProductCard/ProductCard';
import { SwiperPhone } from '../../design/organisms/SwiperPhone/SwiperPhone';
import { useAppSelector } from '../../store/hooks';
import { getHotPricedProducts } from '../../services/api/allProductsAPI';
import { ShortProduct } from '../../types/ShortProduct';

export const ComparePage = () => {
  const compareProducts = useAppSelector(state => state.compareProducts);
  const recentlyViewed = useAppSelector(state => state.recentlyViewed);
  const [hotProducts, setHotProducts] = useState<ShortProduct[]>([]);
  const [isHotProductsLoading, setIsHotProductsLoading] = useState(true);

  const comparePhones = compareProducts.filter(
    cProduct => cProduct.category === 'phones',
  );
  const compareTablets = compareProducts.filter(
    cProduct => cProduct.category === 'tablets',
  );
  const compareAccessories = compareProducts.filter(
    cProduct => cProduct.category === 'accessories',
  );

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

  if (!compareProducts || compareProducts.length === 0) {
    return (
      <>
        <ButtonBack className="mb-24" />
        <H4 className="comparison__title">
          No items to compare, but you can add some:
        </H4>
        {recentlyViewed.length > 0 && (
          <div className="comparison__swiper">
            <SwiperPhone title="Recently viewed">
              {recentlyViewed.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SwiperPhone>
          </div>
        )}

        {recentlyViewed.length === 0 && (
          <div className="comparison__swiper">
            <SwiperPhone title="Hot prices" isLoading={isHotProductsLoading}>
              {hotProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SwiperPhone>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <ButtonBack className="mb-24" />
      {!!comparePhones.length && (
        <ComparisonTable compareProducts={comparePhones} />
      )}
      {!!compareTablets.length && (
        <ComparisonTable compareProducts={compareTablets} />
      )}
      {!!compareAccessories.length && (
        <ComparisonTable compareProducts={compareAccessories} />
      )}
    </>
  );
};
