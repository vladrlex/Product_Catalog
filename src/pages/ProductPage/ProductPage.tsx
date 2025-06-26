import { useLocation, useParams } from 'react-router-dom';
import { PictureSlider } from './PictureSlider';
import { ColorPicker } from './ColorPicker';
import { SelectCapacity } from './SelectCapacity';
import { PriceBlock } from './PriceBlock';
import {
  getAccessoryById,
  getPhoneById,
  getProducts,
  getShortProduct,
  getTabletById,
} from '../../services/api/allProductsAPI';
import { useEffect, useState } from 'react';
import { FullProduct, ShortProductWithDetails } from '../../types/FullProduct';
import { ShortProduct } from '../../types/ShortProduct';
import { Specs } from '../../design/molecules/Specs/Specs';
import { H2 } from '../../design/atoms/Typography/H2/H2';
import { About } from './About';
import { SwiperPhone } from '../../design/organisms/SwiperPhone/SwiperPhone';
import { PageButtons } from './PageButtons';
import { ProductCard } from '../../design/organisms/ProductCard/ProductCard';
import { H3 } from '../../design/atoms/Typography/H3/H3';
import { Breadcrumbs } from '../../design/atoms/Breadcrumbs';
import { ButtonBack } from '../../design/atoms/ButtonBack/ButtonBack';
import { Category } from '../../types/Category';
import { Sorting } from '../../types/Sorting';
import { getRandomProducts } from './Utils/Ulitls';
import { Loader } from './Loader';
import { getSpecs } from '../../utils/helpers';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToRecentlyViewed } from '../../store/features/recentlyViewedProducts';

export const ProductPage = () => {
  const [fullProduct, setFullProduct] = useState<FullProduct | null>(null);
  const [product, setProduct] = useState<ShortProduct | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<
    ShortProduct[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { tabId } = useParams();
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const recentlyViewed = useAppSelector(store => store.recentlyViewed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tabId) return;

    let productPromise;

    switch (category) {
      case 'phones':
        productPromise = getPhoneById(tabId);
        break;
      case 'tablets':
        productPromise = getTabletById(tabId);
        break;
      case 'accessories':
        productPromise = getAccessoryById(tabId);
        break;
      default:
        return;
    }

    Promise.all([productPromise, getShortProduct(tabId)])
      .then(([fullResult, shortResult]) => {
        setFullProduct(fullResult);
        setProduct(shortResult);
        dispatch(addToRecentlyViewed(shortResult));
      })
      .catch(() => setError(true));
  }, [category, tabId]);

  useEffect(() => {
    getProducts({
      limit: 50,
      page: 1,
      category: category as Category,
      sortBy: Sorting.Newest,
    })
      .then(res => {
        const products = res.products;
        const randomProducts = getRandomProducts(products, 8);
        setRecommendedProducts(randomProducts);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [tabId]);

  if ((!fullProduct || !product) && !error) {
    return (
      <div className="product">
        <Breadcrumbs className="product__breadcrumbs" />
        <ButtonBack className="product__button-back" />
        <Loader />
      </div>
    );
  } else if (error) {
    return <ErrorPage />;
  }

  if (fullProduct && product && !error && tabId) {
    const detailProduct = { ...product, ...getSpecs(fullProduct) };

    const {
      camera,
      capacity,
      capacityAvailable,
      cell,
      color,
      colorsAvailable,
      description,
      images,
      name,
      namespaceId,
      priceDiscount,
      priceRegular,
      processor,
      ram,
      resolution,
      screen,
      zoom,
    } = fullProduct;

    return (
      <div className="product">
        <Breadcrumbs className="product__breadcrumbs" />
        <ButtonBack className="product__button-back" />

        <H2 className="product__title">{name}</H2>

        <PictureSlider images={images} />

        <div className="product__top-details">
          <ColorPicker
            colorsAvailable={colorsAvailable}
            current={color}
            category={category}
            id={namespaceId}
            tabId={tabId}
            product={product}
          />

          <SelectCapacity
            capacityAvailable={capacityAvailable}
            current={capacity}
            category={category}
            tabId={tabId}
            product={product}
          />

          <PriceBlock
            priceDiscount={priceDiscount}
            priceRegular={priceRegular}
            year={product.year}
          />

          <PageButtons
            product={product}
            detailProduct={detailProduct as ShortProductWithDetails}
          />

          <Specs
            specs={{ screen, resolution, processor, ram }}
            className="product__specs"
          />
        </div>

        <About description={description} />

        <div className="product__tech-specs section">
          <H3 className="section__title">Tech specs</H3>

          <Specs
            specs={{
              screen,
              resolution,
              processor,
              ram,
              capacity,
              camera,
              zoom,
              cell,
            }}
            className="product__specs"
          />
        </div>

        <div className="product__swiper">
          <SwiperPhone title="You may also like" isLoading={isLoading}>
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SwiperPhone>
        </div>

        {recentlyViewed.length > 0 && (
          <div className="product__swiper">
            <SwiperPhone title="Recently viewed">
              {recentlyViewed.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SwiperPhone>
          </div>
        )}
      </div>
    );
  }
};
