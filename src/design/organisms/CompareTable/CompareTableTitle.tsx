import { Checkbox } from '@mui/material';
import { H2 } from '../../atoms/Typography/H2/H2';
import { P } from '../../atoms/Typography/P/P';
import { FC } from 'react';
import { ShortProductWithDetails } from '../../../types/FullProduct';
import { Capitalize } from '../../../utils/helpers';

interface CompareTableTitleProps {
  compareProduct: ShortProductWithDetails;
  showOnlyDifferences: boolean;
  setShowOnlyDifferences: (val: boolean) => void;
}

export const CompareTableTitle: FC<CompareTableTitleProps> = ({
  compareProduct,
  showOnlyDifferences,
  setShowOnlyDifferences,
}) => {
  return (
    <div className="comparison-title">
      <H2>{`${Capitalize(compareProduct.category)}`} Compare</H2>
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={showOnlyDifferences}
          onChange={() => setShowOnlyDifferences(!showOnlyDifferences)}
        />
        <P>Show differences only</P>
      </label>
    </div>
  );
};
