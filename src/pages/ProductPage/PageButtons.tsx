import { FC } from 'react';
import { CompareButton } from '../../design/atoms/CompareButton/CompareButton';
import { FavouriteButton } from '../../design/atoms/FavouriteButton/FavouriteButton';
import { PrimaryButton } from '../../design/atoms/PrimaryButton/PrimaryButton';
import { ShortProductWithDetails } from '../../types/FullProduct';
import { ShortProduct } from '../../types/ShortProduct';
import { useActionButtons } from '../../utils/hooks/useActionButtons';
import { useCompareToggle } from '../../utils/hooks/useCompareToggle';

interface PageButtonsProps {
  product: ShortProduct;
  detailProduct: ShortProductWithDetails;
}

export const PageButtons: FC<PageButtonsProps> = ({product, detailProduct}) => {
  const { isInCart, isInFav, handleAddToCart, handleAddToFavourites } =
    useActionButtons(product);
  const { isInCompare, toggleCompare } = useCompareToggle(detailProduct);
  

  return (
    <div className='buttons'>
      <PrimaryButton
        onClick={handleAddToCart}
        isInCart={isInCart}
      >
        Add to cart
      </PrimaryButton>

      <CompareButton onClick={toggleCompare} isInCompare={isInCompare}/>

      <FavouriteButton
        isInFavourites={isInFav}
        onClick={handleAddToFavourites}
      ></FavouriteButton>
    </div>
  );
};
