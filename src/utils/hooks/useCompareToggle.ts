import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as compareActions from '../../store/features/compareProducts';
import { ShortProductWithDetails } from '../../types/FullProduct';

export const useCompareToggle = (product: ShortProductWithDetails) => {
  const dispatch = useAppDispatch();
  const isInCompare = useAppSelector(state =>
    state.compareProducts.some(p => p.itemId === product.itemId),
  );

  const toggleCompare = () => {
    dispatch(
      isInCompare
        ? compareActions.removeFromCompare(product.itemId)
        : compareActions.addToCompare(product),
    );
  };

  return { isInCompare, toggleCompare };
};