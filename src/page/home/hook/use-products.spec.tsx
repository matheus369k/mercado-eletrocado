import { act, renderHook, waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';
import { describe } from 'vitest';
import { useProductsCategories } from './use-products';

describe('products categories custom hooks', () => {
  it('should returned category initial value with all', () => {
    const { result } = renderHook(useProductsCategories);

    expect(result.current.category).toBe('all');
  });

  it('should restore category old value when is have saved in the url', () => {
    const newUrl = new URL(window.location.toString());
    newUrl.searchParams.set('filter', 'phone');
    window.history.pushState({}, '', newUrl);
    const { result } = renderHook(useProductsCategories);

    expect(result.current.category).toBe('phone');
  });

  it('should update filter state and URLState when call handleUpdateFilter with new value', () => {
    const { result } = renderHook(useProductsCategories);

    act(() => result.current.handleUpdateFilter('notebook'));

    expect(result.current.category).toBe('notebook');
    const url = new URL(window.location.toString());
    expect(url.searchParams.get('filter')).toBe('notebook');
  });
});
