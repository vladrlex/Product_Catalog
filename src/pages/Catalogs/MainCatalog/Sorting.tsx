import React from 'react';
import { FilterType } from '../../../types/FilterType';
import { Select } from '../../../design/atoms/Select/Select';

type Props = {
  sortBy: string;
  itemsPerPage: number;
  onSortChange: (value: string) => void;
  onItemsPerPageChange: (value: number) => void;
  availableFilters: FilterType | null;
  onResetFilters: () => void;
  onApplyFilters: () => void;
  selectedColor: string[];
  selectedRam: string[];
  selectedCapacity: string[];
  setTempColor: (val: string[]) => void;
  setTempRam: (val: string[]) => void;
  setTempCapacity: (val: string[]) => void;
};

export const Filters: React.FC<Props> = ({
  sortBy,
  itemsPerPage,
  onSortChange,
  onItemsPerPageChange,
  availableFilters,
  onResetFilters,
  onApplyFilters,
  selectedColor,
  selectedRam,
  selectedCapacity,
  setTempColor,
  setTempRam,
  setTempCapacity,
}) => {
  const sortByDefault = sortBy || 'newest';
  const itemsPerPageDefault = itemsPerPage || 16;

  const renderFilterSelect = (
    label: string,
    id: string,
    options: string[],
    onChange: (val: string | string[]) => void,
    multiple: boolean,
    value: string[] = [],
  ) => (
    <Select
      id={id}
      label={label}
      options={options}
      onChange={onChange}
      multiple={multiple}
      value={value}
    />
  );

  return (
    <div className="products-catalog__filters">
      {renderFilterSelect(
        'Sort by',
        'sort',
        ['newest', 'cheapest', 'most expensive'],
        onSortChange as (val: string | string[]) => void,
        false,
        [sortByDefault],
      )}

      {renderFilterSelect(
        'Items on page',
        'itemsPerPage',
        ['4', '8', '16', '32'],
        v => onItemsPerPageChange(Number(v)),
        false,
        [itemsPerPageDefault.toString()],
      )}

      {availableFilters && (
        <>
          {renderFilterSelect(
            'Color',
            'color',
            availableFilters.allColors,
            setTempColor as (val: string | string[]) => void,
            true,
            selectedColor,
          )}
          {renderFilterSelect(
            'RAM',
            'ram',
            availableFilters.allRam,
            setTempRam as (val: string | string[]) => void,
            true,
            selectedRam,
          )}
          {renderFilterSelect(
            'Capacity',
            'capacity',
            availableFilters.allCapacity,
            setTempCapacity as (val: string | string[]) => void,
            true,
            selectedCapacity,
          )}
        </>
      )}

      <div className="products-catalog__filter">
        <button className="products-catalog__button" onClick={onApplyFilters}>
          Apply
        </button>
      </div>

      <div className="products-catalog__filter">
        <button className="products-catalog__button" onClick={onResetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
};
