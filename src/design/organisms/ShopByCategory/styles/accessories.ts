import { Category } from '../types';
import { IMAGE_DEFAULT_STYLES, IMAGE_SIZE, CATEGORY_POSITIONS, CATEGORY_COLORS } from './constants';

export const accessories: Category = {
  id: 'accessories',
  title: 'Accessories',
  image: '/img/category-accessories.png',
  link: '/accessories',
  models: 100,
  styles: {
    image: {
      ...IMAGE_DEFAULT_STYLES,
      ...IMAGE_SIZE,
      ...CATEGORY_POSITIONS.accessories,
    },
    card: {
      backgroundColor: CATEGORY_COLORS.accessories,
      opacity: 0.9,
    },
  },
}; 