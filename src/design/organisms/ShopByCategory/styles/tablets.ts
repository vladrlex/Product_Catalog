import { Category } from '../types';
import { IMAGE_DEFAULT_STYLES, IMAGE_SIZE, CATEGORY_POSITIONS, CATEGORY_COLORS } from './constants';

export const tablets: Category = {
  id: 'tablets',
  title: 'Tablets',
  image: '/img/category-tablets.png',
  link: '/tablets',
  models: 24,
  styles: {
    image: {
      ...IMAGE_DEFAULT_STYLES,
      ...IMAGE_SIZE,
      ...CATEGORY_POSITIONS.tablets,
    },
    card: {
      backgroundColor: CATEGORY_COLORS.tablets,
      opacity: 0.9,
    },
  },
}; 