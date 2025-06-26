import { P } from '../../design/atoms/Typography/P/P';
import { P_Small } from '../../design/atoms/Typography/P_Small/P_Small';
import cn from 'classnames';
import { ShortProduct } from '../../types/ShortProduct';
import { useCalculateNewLink } from '../../utils/hooks/useCalculateNewLink';
import { Link } from 'react-router-dom';

interface Props {
  capacityAvailable: string[];
  current: string;
  category: string;
  tabId: string;
  product: ShortProduct;
}

export const SelectCapacity: React.FC<Props> = ({
  capacityAvailable,
  current,
  category,
  tabId,
  product,
}) => {
  const { calculateNewLink } = useCalculateNewLink();

  return (
    <div className="capacity">
      <P_Small className="capacity__text">
        {category === 'accessories' ? 'Select size' : 'Select Capacity'}
      </P_Small>

      <div className="capacity__options">
        {capacityAvailable.map(option => {
          return (
            <Link
              key={option}
              to={calculateNewLink({
                tabId,
                current,
                option,
                category,
              })}
              state={{ product }}
            >
              <P
                className={cn('capacity__option', {
                  'capacity__option--filled': option === current,
                })}
              >
                {option}
              </P>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
