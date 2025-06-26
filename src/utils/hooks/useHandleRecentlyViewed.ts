import { useAppDispatch } from '../../store/hooks';
import { ShortProduct } from '../../types/ShortProduct';
import { addToRecentlyViewed } from '../../store/features/recentlyViewedProducts';

export const useHandleRecentlyViewed = (product: ShortProduct) => {
  const dispatch = useAppDispatch();

  const handleRecentlyViewed = () => {
    dispatch(addToRecentlyViewed(product));
  };

  return { handleRecentlyViewed };
};
