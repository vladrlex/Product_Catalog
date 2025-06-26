import { ShortProductWithDetails } from '../../../types/FullProduct';
import { useAppDispatch } from '../../../store/hooks';
import * as compareActions from '../../../store/features/compareProducts';
import { H4 } from '../../atoms/Typography/H4/H4';
import { H3 } from '../../atoms/Typography/H3/H3';
import { FC } from 'react';
import { useActionButtons } from '../../../utils/hooks/useActionButtons';
import { P } from '../../atoms/Typography/P/P';
import { FavouriteButton } from '../../atoms/FavouriteButton/FavouriteButton';
import { PrimaryButton } from '../../atoms/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';

interface TableHeaderPartProps {
  product: ShortProductWithDetails;
}

export const TableHeaderPart: FC<TableHeaderPartProps> = ({ product }) => {
  const {
    id,
    image,
    year,
    price,
    fullPrice,
    category,
    itemId,
    name,
    screen,
    capacity,
    ram,
    color,
  } = product;

  const shortProduct = {
    id,
    image,
    year,
    price,
    fullPrice,
    category,
    itemId,
    name,
    screen,
    capacity,
    ram,
    color,
  };

  const dispatch = useAppDispatch();
  const { handleAddToCart, handleAddToFavourites, isInCart, isInFav } =
    useActionButtons(shortProduct);

  return (
    <th key={product.id} className="product-column">
      <div className="table-header-side">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <Link to={`/${category}/${itemId}`}>
          <H4>{product.name}</H4>
        </Link>
        <button
          className="close-button"
          onClick={() =>
            dispatch(compareActions.removeFromCompare(product.itemId))
          }
          aria-label="Remove from comparison"
        >
          ✕
        </button>
        <div className="product-price">
          <H3> ${year < 2022 ? price : fullPrice}</H3>
          {year < 2022 && <P className="product-old-price">${fullPrice}</P>}
        </div>

        <div className="product-card__buttons">
          <PrimaryButton isInCart={isInCart} onClick={handleAddToCart}>
            Add to cart
          </PrimaryButton>

          <FavouriteButton
            isInFavourites={isInFav}
            onClick={handleAddToFavourites}
          />
        </div>
      </div>
    </th>
  );
};
