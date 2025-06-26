import { FC } from 'react';
import cn from 'classnames';
import { H2 } from '../../atoms/Typography/H2/H2';
import { CategoryCard } from './components/CategoryCard';
import { phones } from './styles/phones';
import { tablets } from './styles/tablets';
import { accessories } from './styles/accessories';
import { CategoryProps } from './types';
import './ShopByCategory.scss';

const categories = [phones, tablets, accessories];

export const ShopByCategory: FC<CategoryProps> = ({ className }) => {
  return (
    <section className={cn('categories', className)}>
      <H2 className="categories__title">
        Shop by category
      </H2>

      <div className="categories__grid">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}; 