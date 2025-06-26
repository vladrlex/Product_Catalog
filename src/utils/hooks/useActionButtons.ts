import { ShortProduct } from "../../types/ShortProduct";
import { useCartToggle } from "./useCartToggle";
import { useFavToggle } from "./useFavouriteToggle";


export const useActionButtons = (product: ShortProduct) => {
  const {toggleCart, isInCart} = useCartToggle(product);
  const {toggleFav, isInFav} = useFavToggle(product);

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    toggleCart();
  };

  const handleAddToFavourites = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    toggleFav();
  };

  return { isInCart, isInFav, handleAddToCart, handleAddToFavourites };
}
