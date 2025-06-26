/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../../design/organisms/ProductCard/ProductCard';
import { Filters } from './Sorting';
import { Pagination } from './Pagination';
import { getProducts } from '../../../services/api/allProductsAPI';
import { getPageNumbers } from './Functions';
import { Breadcrumbs } from '../../../design/atoms/Breadcrumbs/Breadcrumbs';
import { ButtonBack } from '../../../design/atoms/ButtonBack/ButtonBack';
import { H2 } from '../../../design/atoms/Typography/H2/H2';
import { P_Small } from '../../../design/atoms/Typography/P_Small/P_Small';
import { CardsContainer } from '../../../design/atoms/CardsContainer/CardsContainer';
import { SkeletonCards } from '../../../design/organisms/SkeletonCards/SkeletonCards';
import { Category } from '../../../types/Category';
import { Sorting } from '../../../types/Sorting';
import { FilterType } from '../../../types/FilterType';
import { ShortProduct } from '../../../types/ShortProduct';

type Props = {
  title: string;
  category: Category;
};

export const ProductsCatalog: React.FC<Props> = ({ title, category }) => {
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<null | FilterType>(null);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'newest';
  const itemsPerPage = +(searchParams.get('itemsPerPage') || 16);
  const currentPage = +(searchParams.get('page') || 1);

  const selectedColor = searchParams.getAll('color') || '';
  const selectedRam = searchParams.getAll('ram') || '';
  const selectedCapacity = searchParams.getAll('capacity') || '';

  const [tempColor, setTempColor] = useState(selectedColor);
  const [tempRam, setTempRam] = useState(selectedRam);
  const [tempCapacity, setTempCapacity] = useState(selectedCapacity);

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === Sorting.Newest) {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    params.delete('page');
    setSearchParams(params);
  };

  const handleItemsPerPageChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    if (value === 16) {
      params.delete('itemsPerPage');
    } else {
      params.set('itemsPerPage', value.toString());
    }
    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('color');
    newParams.delete('ram');
    newParams.delete('capacity');
    newParams.delete('sort');
    newParams.delete('itemsPerPage');
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (tempColor.length > 0) {
      params.set('color', tempColor.join(','));
    } else {
      params.delete('color');
    }

    if (tempRam.length > 0) {
      params.set('ram', tempRam.join(','));
    } else {
      params.delete('ram');
    }

    if (tempCapacity.length > 0) {
      params.set('capacity', tempCapacity.join(','));
    } else {
      params.delete('capacity');
    }

    params.delete('page');
    setSearchParams(params);
  };

  useEffect(() => {
    setLoading(true);
    getProducts({
      limit: itemsPerPage,
      page: currentPage,
      category,
      sortBy: sortBy as Sorting,
      color: selectedColor.join(','),
      ram: selectedRam.join(','),
      capacity: selectedCapacity.join(','),
    })
      .then(({ products, totalCount, allColors, allRam, allCapacity }) => {
        setProducts(products);
        setTotalCount(totalCount);
        setFilters({ allColors, allRam, allCapacity });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [
    category,
    currentPage,
    itemsPerPage,
    sortBy,
    JSON.stringify(selectedColor),
    JSON.stringify(selectedRam),
    JSON.stringify(selectedCapacity),
  ]);

  useEffect(() => {
    setTempColor(selectedColor);
    setTempRam(selectedRam);
    setTempCapacity(selectedCapacity);
  }, [
    selectedColor.join(','),
    selectedRam.join(','),
    selectedCapacity.join(','),
  ]);

  return (
    <div className="products-catalog">
      <Breadcrumbs className="products-catalog__breadcrumbs" />
      <ButtonBack className="products-catalog__button-back" />
      <H2 className="products-catalog__title">{title}</H2>
      <P_Small className="products-catalog__count">{totalCount} models</P_Small>

      <Filters
        sortBy={sortBy}
        itemsPerPage={itemsPerPage}
        onSortChange={handleSortChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        availableFilters={filters}
        onResetFilters={handleResetFilters}
        onApplyFilters={handleApplyFilters}
        selectedColor={selectedColor}
        selectedRam={selectedRam}
        selectedCapacity={selectedCapacity}
        setTempColor={setTempColor}
        setTempRam={setTempRam}
        setTempCapacity={setTempCapacity}
      />

      <CardsContainer>
        {loading ? (
          <SkeletonCards quantity={itemsPerPage} />
        ) : products.length === 0 ? (
          <P_Small className="products-catalog__no-results">
            Products not found
          </P_Small>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={{ ...product, category }} />
          ))
        )}
      </CardsContainer>

      {!loading && products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageNumbers={pageNumbers}
        />
      )}
    </div>
  );
};
