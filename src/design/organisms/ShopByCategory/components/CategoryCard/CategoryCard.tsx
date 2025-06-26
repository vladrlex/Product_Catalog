import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { H3 } from '../../../../atoms/Typography/H3/H3';
import { P_Small } from '../../../../atoms/Typography/P_Small/P_Small';
import { Category } from '../../types';
import './CategoryCard.scss';

interface Props {
  category: Category;
}

export const CategoryCard: FC<Props> = ({ category }) => {
  const { title, image, link, models, styles } = category;

  const imageStyle = {
    right: styles?.image?.right,
    bottom: styles?.image?.bottom,
    width: styles?.image?.width,
    height: styles?.image?.height,
    objectFit: styles?.image?.objectFit,
  };

  const cardStyle = {
    backgroundColor: styles?.card?.backgroundColor,
    opacity: styles?.card?.opacity,
  };

  return (
    <div className="categories__item">
      <Link
        to={link}
        className={cn('categories__card')}
        style={cardStyle}
      >
        <img
          src={image}
          alt={title}
          className="categories__image"
          style={imageStyle}
        />
      </Link>
      
      <div className="categories__content">
        <H3 className="categories__card-title">
          {title}
        </H3>
        <P_Small className="categories__models">
          {models} models
        </P_Small>
      </div>
    </div>
  );
}; 
