'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchParamsType } from '@/types/searchPageTypes';
import { PartialItem } from '@/types/supabaseTypes';
import { CategoryType } from '@/types/searchPageTypes';
//Components
import ItemDisplayContainer from '@/components/search/ItemDisplayContainer';
import { SearchBar } from '@/components/search/SearchBar';
import FilterOptions from '@/components/search/filter/FilterOptions';

//Utils
import searchItems from '@/supabase/models/filtering-items/searchItems';

export default function SearchItemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<PartialItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    const params = {
      query: searchParams.get('query') || '',
      category: searchParams.get('category') as CategoryType,
      subcategory: searchParams.get('subcategory') as
        | ''
        | 'men'
        | 'women'
        | 'girls'
        | 'boys'
        | 'adults'
        | 'children'
        | undefined,
      limit: parseInt(searchParams.get('limit') || '30'),
      cursor: searchParams.get('cursor') || '',
    };

    const data: PartialItem[] = await searchItems(params);

    setSearchResults(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchParams]);

  const handleSubmit = (newParams: SearchParamsType) => {
    const query = new URLSearchParams(
      Object.entries(newParams).map(([key, value]) => [key, String(value)])
    ).toString();
    router.push(`/search?${query}`);
  };

  return (
    <div className='mb-28 mt-8'>
      <div className='m-auto flex max-w-[450px] flex-wrap justify-center gap-3'>
        <SearchBar searchParams={searchParams} handleSubmit={handleSubmit} />
        <FilterOptions handleSubmit={handleSubmit} />
      </div>
      <ItemDisplayContainer
        searchResults={searchResults}
        isLoading={isLoading}
      />
    </div>
  );
}
