import { H2 } from '../../design/atoms/Typography/H2/H2';
import { H3 } from '../../design/atoms/Typography/H3/H3';

interface Props {
  priceDiscount: number;
  priceRegular: number;
  year: number;
}

export const PriceBlock: React.FC<Props> = ({
  priceDiscount,
  priceRegular,
  year,
}) => {
  return (
    <div className="price">
      <H2>${year < 2022 ? priceDiscount : priceRegular}</H2>
      {year < 2022 
        && <H3 className="price__full">${priceRegular}</H3>
      }
    </div>
  );
};
