/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { searchParams } from '@/util/search-params';

export type CategoryTypes = 'notebook' | 'tablet' | 'phone' | 'all';

export const useProductsCategories = () => {
  const [category, setCategory] = useState<CategoryTypes>(() => {
    const categoryQuery = searchParams.getSearchParam('filter') as CategoryTypes;
    if (categoryQuery) {
      return categoryQuery;
    }
    return 'all';
  });

  const handleUpdateFilter = (filter: CategoryTypes) => {
    searchParams.addSearchParam({
      key: 'filter',
      value: filter,
    });
    setCategory(filter);
  };

  return {
    category,
    handleUpdateFilter,
  };
};
