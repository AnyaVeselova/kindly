export type SearchParamsType = {
  query: string;
  category: CategoryType;
  subcategory?: ApparelSubcategoryType | BooksSubcategoryType;
  limit: number;
  cursor: string;
};

export const defaultSearchParams: SearchParamsType = {
  query: '',
  category: 'clothing', // Default category
  subcategory: undefined,
  limit: 30, // Default limit
  cursor: '', // Default cursor
};
export type IconPropType = {
  width?: number;
  height?: number;
  active?: boolean;
  category?: string;
  subcategory?: string;
};

export type CategoryType =
  | 'clothing'
  | 'shoes'
  | 'toys'
  | 'books'
  | 'household';
export type ApparelSubcategoryType = 'men' | 'women' | 'girls' | 'boys' | '';
export type BooksSubcategoryType = 'adults' | 'children' | '';
