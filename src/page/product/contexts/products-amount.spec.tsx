import { act, renderHook } from '@testing-library/react';
import { useContext, type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { ProductAmountContext, ProductsAmountProvider } from './products-amount';

const wrapper = ({ children }: { children: ReactNode }) => {
  return <ProductsAmountProvider>{children}</ProductsAmountProvider>;
};

describe('product amount context', () => {
  it('should returned productsAmount as initial value', () => {
    const { result } = renderHook(() => useContext(ProductAmountContext), { wrapper });

    expect(result.current.productsAmount).toEqual(1);
  });

  it('no should less value when is equal 1', () => {
    const { result } = renderHook(() => useContext(ProductAmountContext), { wrapper });

    expect(result.current.productsAmount).toEqual(1);

    act(() => result.current.handleRemoveProduct());

    expect(result.current.productsAmount).toEqual(1);
  });

  it('should great value when call handleAddProduct', () => {
    const { result } = renderHook(() => useContext(ProductAmountContext), { wrapper });

    expect(result.current.productsAmount).toEqual(1);

    act(() => result.current.handleAddProduct());

    expect(result.current.productsAmount).toEqual(2);
  });

  it('should less value when call handleRemoveProduct', () => {
    const { result } = renderHook(() => useContext(ProductAmountContext), { wrapper });

    expect(result.current.productsAmount).toEqual(1);

    act(() => result.current.handleAddProduct());

    expect(result.current.productsAmount).toEqual(2);

    act(() => result.current.handleAddProduct());

    expect(result.current.productsAmount).toEqual(3);

    act(() => result.current.handleRemoveProduct());

    expect(result.current.productsAmount).toEqual(2);
  });

  it('should reset value to initial state when is call handleResetProducts', () => {
    const { result } = renderHook(() => useContext(ProductAmountContext), { wrapper });

    expect(result.current.productsAmount).toEqual(1);

    act(() => result.current.handleAddProduct());

    expect(result.current.productsAmount).toEqual(2);

    act(() => result.current.handleAddProduct());

    expect(result.current.productsAmount).toEqual(3);

    act(() => result.current.handleResetProducts());

    expect(result.current.productsAmount).toEqual(1);
  });
});
