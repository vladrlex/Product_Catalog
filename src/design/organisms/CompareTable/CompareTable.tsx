import React, { useState } from 'react';
import { ShortProductWithDetails } from '../../../types/FullProduct';
import { accessoriesSpecKeys, mobilesSpecKeys } from '../../../utils/constants';
import { H4 } from '../../atoms/Typography/H4/H4';
import { CompareTableTitle } from './CompareTableTitle';
import { TableHeaderPart } from './TableHeaderPart';
import { CompareTableBody } from './CompareTableBody';
import { P } from '../../atoms/Typography/P/P';

interface ComparisonTableProps {
  compareProducts: ShortProductWithDetails[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  compareProducts,
}) => {
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const specKeys =
    compareProducts[0].category === 'accessories'
      ? accessoriesSpecKeys
      : mobilesSpecKeys;

  const hasDifferences = (spec: string): boolean => {
    if (compareProducts.length <= 1) return false;

    const values = compareProducts.map(phone => {
      if (spec === 'cell') {
        return (phone[spec] as string[]).join(',');
      }
      return String(phone[spec as keyof ShortProductWithDetails]);
    });

    return !values.every(val => val === values[0]);
  };

  const formatCellValue = (cell: string[]): React.ReactNode => {
    return cell.map((item, index) => <P key={index}>{item}</P>);
  };

  return (
    <>
      <CompareTableTitle
        compareProduct={compareProducts[0]}
        setShowOnlyDifferences={setShowOnlyDifferences}
        showOnlyDifferences={showOnlyDifferences}
      />

      <div className="comparison-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th style={{backgroundColor: 'var(--surface-card)'}}>
                <H4>Specifications</H4>
              </th>
              {compareProducts.map(product => {
                return <TableHeaderPart product={product} key={product.id} />;
              })}
            </tr>
          </thead>

          <tbody>
            {specKeys.map(spec => {
              return (
                <CompareTableBody
                  compareProducts={compareProducts}
                  formatCellValue={formatCellValue}
                  hasDifferences={hasDifferences}
                  showOnlyDifferences={showOnlyDifferences}
                  spec={spec}
                  key={spec}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
