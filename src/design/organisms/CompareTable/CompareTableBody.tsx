import React, { FC } from 'react';
import { Capitalize } from '../../../utils/helpers';
import { ShortProductWithDetails } from '../../../types/FullProduct';
import { P } from '../../atoms/Typography/P/P';

interface CompareTableBodyProps {
  spec: string;
  hasDifferences: (val: string) => boolean;
  showOnlyDifferences: boolean;
  compareProducts: ShortProductWithDetails[];
  formatCellValue: (cell: string[]) => React.ReactNode;
}

export const CompareTableBody: FC<CompareTableBodyProps> = ({
  spec,
  hasDifferences,
  showOnlyDifferences,
  compareProducts,
  formatCellValue,
}) => {
  const isDifferent = hasDifferences(spec);
  if (showOnlyDifferences && !isDifferent) {
    return null;
  }

  return (
    <tr key={spec} className={isDifferent ? 'difference-row' : 'default-row'}>
      <td className="spec-name">
        {spec !== 'ram' ? Capitalize(spec) : spec.toUpperCase()}
      </td>
      {compareProducts.map(phone => {
        return (
          <td key={phone.id}>
              {spec === 'cell'
                ? formatCellValue(phone[spec])
                : <P>{phone[spec as keyof ShortProductWithDetails]}</P>}
          </td>
        );
      })}
    </tr>
  );
};
