import { SearchParamsType, CategoryType } from '@/types/searchPageTypes';

export const createUpdatedParams = (
  searchParams: URLSearchParams,
  newParams: Partial<SearchParamsType>
): SearchParamsType => {
  const updatedParams = {
    query: searchParams.get('query') || '',
    category: (searchParams.get('category') as CategoryType) || '',
    subcategory: searchParams.get('subcategory') as
      | ApparelSubcategoryType
      | BooksSubcategoryType
      | undefined,
    limit: Number(searchParams.get('limit')) || 30,
    cursor: searchParams.get('cursor') || '',
    ...newParams,
  };
  return updatedParams;
};
