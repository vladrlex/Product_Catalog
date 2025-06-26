import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as cartActions from '../../store/features/cartProducts';
import { ShortProduct } from '../../types/ShortProduct';

export const useCartToggle = (product: ShortProduct) => {
  const dispatch = useAppDispatch();
  const isInCart = useAppSelector(state =>
    state.cartProducts.some(p => p.itemId === product.itemId),
  );

  const toggleCart = () => {
    dispatch(
      isInCart
        ? cartActions.removeFromCart(product.itemId)
        : cartActions.addToCart(product),
    );
  };

  return { isInCart, toggleCart };
};
