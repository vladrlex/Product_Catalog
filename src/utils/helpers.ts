import { FullProduct } from '../types/FullProduct';
import { ShortProduct } from '../types/ShortProduct';
import { mobilesSpecKeys } from './constants';

export const Capitalize = (text: string) => {
  return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();
};

type SpecsType = {
  [key: string]: string | string[];
};

export const getSpecs = (product: ShortProduct | FullProduct) => {
  return mobilesSpecKeys.reduce((acc: SpecsType, key) => {
    if (key in product) {
      acc[key] = product[key as keyof (ShortProduct | FullProduct)] as string | string[];
    }

    return acc;
  }, {})
};
