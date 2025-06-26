import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as favouriteProducts from '../../store/features/favouriteProducts';
import { ShortProduct } from '../../types/ShortProduct';

export const useFavToggle = (product: ShortProduct) => {
  const dispatch = useAppDispatch();
  const isInFav = useAppSelector(state =>
    state.favouriteProducts.some(favProduct => favProduct.itemId === product.itemId),
  );

  const toggleFav = () => {
    dispatch(
      isInFav
        ? favouriteProducts.removeFromFav(product.itemId)
        : favouriteProducts.addToFav(product),
    );
  };

  return { isInFav, toggleFav };
};
