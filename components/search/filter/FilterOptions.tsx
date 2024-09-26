'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUpdatedParams } from '@/utils/searchUtils';

// Types
import {
  BooksSubcategoryType,
  CategoryType,
  SearchParamsType,
  ApparelSubcategoryType,
} from '@/types/searchPageTypes';

// Components
import CategoryButtonContainer from './CategoryButtonContainer.';
import FilterIcon from '@/components/icons/FilterIcon';

type FilterOptionsProps = {
  handleSubmit: (newParams: SearchParamsType) => void;
};

const FilterOptions: React.FC<FilterOptionsProps> = ({ handleSubmit }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const handleCategoryClick = (value: CategoryType) => {
    const updateParams = createUpdatedParams(searchParams, {
      category: value,
      subcategory: undefined,
    });
    handleSubmit(updateParams);
  };

  const handleSubcategoryClick = (
    value: BooksSubcategoryType | ApparelSubcategoryType
  ) => {
    const updatedParams = createUpdatedParams(searchParams, {
      subcategory: value,
    });
    handleSubmit(updatedParams);
  };

  const handleFilterClear = () => {
    router.push('/search');
  };

  const updatedSearchParams = {
    category: (searchParams.get('category') as CategoryType) || 'clothing',
    subcategory: searchParams.get('subcategory') as
      | ApparelSubcategoryType
      | BooksSubcategoryType
      | undefined,
  };

  return (
    <>
      <button
        type='button'
        className='mt-2 px-4'
        aria-label='Filter Options'
        aria-haspopup='true'
        aria-expanded={filtersOpen.toString()}
        data-cy='filter-button'
        onClick={() => setFiltersOpen((prev) => !prev)}
      >
        <FilterIcon width={30} height={30} active={filtersOpen} />
      </button>
      {filtersOpen && (
        <CategoryButtonContainer
          searchParams={updatedSearchParams}
          handleCategoryClick={handleCategoryClick}
          handleSubcategoryClick={handleSubcategoryClick}
          handleFilterClear={handleFilterClear}
        />
      )}
    </>
  );
};

export default FilterOptions;
