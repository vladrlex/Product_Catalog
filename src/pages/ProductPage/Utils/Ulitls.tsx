import { ShortProduct } from '../../../types/ShortProduct';

export const getRandomProducts = (products: ShortProduct[], count: number): ShortProduct[] => {
  const array = [...products];
  
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.slice(0, count);
};