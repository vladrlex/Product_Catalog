import { P_Small } from '../../design/atoms/Typography/P_Small/P_Small';
import cn from 'classnames';
import { ShortProduct } from '../../types/ShortProduct';
import { Link } from 'react-router-dom';
import { useCalculateNewLink } from '../../utils/hooks/useCalculateNewLink';

interface Props {
  colorsAvailable: string[];
  current: string;
  category: string;
  id: string;
  tabId: string;
  product: ShortProduct;
}

export const ColorPicker: React.FC<Props> = ({
  colorsAvailable,
  current,
  category,
  id,
  tabId,
  product,
}) => {
  const { calculateNewLink } = useCalculateNewLink();

  return (
    <div className="colorpicker">
      <div className="colorpicker__text-container">
        <P_Small className="colorpicker__available">Available colors</P_Small>
        <P_Small className="colorpicker__item-id">ID: {id}</P_Small>
      </div>

      <div className="colorpicker__color-container">
        {colorsAvailable.map((option, index) => {
          return (
            <div
              className={cn('colorpicker__color-ind-container', {
                'colorpicker__color-ind-container--active': option === current,
              })}
              key={option + index}
            >
              <Link
                to={calculateNewLink({
                  tabId,
                  current,
                  option,
                  category,
                })}
                state={{ product }}
                className={cn(
                  `colorpicker__color colorpicker__color--${option.split(' ').join('-')}`,
                )}
              ></Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
