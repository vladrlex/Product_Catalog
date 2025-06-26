import { Category } from '../types';
import { IMAGE_DEFAULT_STYLES, IMAGE_SIZE, CATEGORY_POSITIONS, CATEGORY_COLORS } from './constants';

export const phones: Category = {
  id: 'phones',
  title: 'Mobile phones',
  image: '/img/category-phones.png',
  link: '/phones',
  models: 95,
  styles: {
    image: {
      ...IMAGE_DEFAULT_STYLES,
      ...IMAGE_SIZE,
      ...CATEGORY_POSITIONS.phones,
    },
    card: {
      backgroundColor: CATEGORY_COLORS.phones,
      opacity: 0.9,
    },
  },
}; 