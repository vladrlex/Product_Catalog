import React from 'react';
import { Link } from 'react-router-dom';
import { Specs } from '../../molecules/Specs/Specs';
import { H4 } from '../../atoms/Typography/H4/H4';
import { PrimaryButton } from '../../atoms/PrimaryButton/PrimaryButton';
import { FavouriteButton } from '../../atoms/FavouriteButton/FavouriteButton';
import { H3 } from '../../atoms/Typography/H3/H3';
import { ShortProduct } from '../../../types/ShortProduct';
import { getSpecs } from '../../../utils/helpers';
import { useActionButtons } from '../../../utils/hooks/useActionButtons';
interface ProductCardProps {
  product: ShortProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const {
    category,
    fullPrice,
    image,
    itemId,
    name,
    price,
    year,
  } = product;

  const { isInCart, isInFav, handleAddToCart, handleAddToFavourites } = useActionButtons(product);

  const specs = getSpecs(product);

  return (
    <div className="product-card">
        <Link
        to={`/${category}/${itemId}`}
        state={{ product }}
        className="product-card__link"
      >
        <div className="product-card__image-container">
          <img src={image} alt={name} className="product-card__image" />
        </div>

        <H4 className="product-card__title">{name}</H4>

        <div className="product-card__price-block">
          <H3> ${year < 2022 ? price : fullPrice}</H3>
          {year < 2022 && (
            <span className="product-card__full-price">${fullPrice}</span>
          )}
        </div>

        <div className="product-card__divider" />

        <Specs specs={specs} />

        <div className="product-card__buttons">
          <PrimaryButton isInCart={isInCart} onClick={handleAddToCart}>
            Add to cart
          </PrimaryButton>

          <FavouriteButton
            isInFavourites={isInFav}
            onClick={handleAddToFavourites}
          />
        </div>
      </Link>
    </div>
  );
};
