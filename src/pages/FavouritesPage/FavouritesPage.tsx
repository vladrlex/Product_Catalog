import { ProductCard } from '../../design/organisms/ProductCard/ProductCard';
import { useAppSelector } from '../../store/hooks';
import { H1 } from '../../design/atoms/Typography/H1/H1';
import { P_Small } from '../../design/atoms/Typography/P_Small/P_Small';
import { Breadcrumbs } from '../../design/atoms/Breadcrumbs';
import './FavouritesPage.scss';
import { CardsContainer } from '../../design/atoms/CardsContainer/CardsContainer';
import { EmptyFavouritesImage } from '../../design/atoms/EmptyFavouritesImage/EmptyFavouritesImage';

export const FavouritesPage = () => {
  const favourites = useAppSelector(state => state.favouriteProducts);

  return (
    <div className="favourites-page">
      <Breadcrumbs className="favourites-page__breadcrumbs" />
      <H1 className="favourites-page__title">Favourites</H1>
      <P_Small className="favourites-page__count">
        {favourites.length} items
      </P_Small>

      {favourites.length > 0 ? (
        <CardsContainer>
          {favourites.map(product => (
            <ProductCard key={product.itemId} product={product} />
          ))}
        </CardsContainer>
      ) : (
        <EmptyFavouritesImage />
      )}
    </div>
  );
};
