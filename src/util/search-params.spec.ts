import { describe, expect, it } from 'vitest';
import { searchParams } from './search-params';

describe('search params function', () => {
  const { addSearchParam, getSearchParam } = searchParams;
  const queryParam = {
    key: 'product',
    value: 'test',
  };

  it('should add query param to url', () => {
    addSearchParam(queryParam);

    expect(window.location.search).contains('product=test');
  });

  it('should get query param from url', () => {
    const queryParamValue = getSearchParam(queryParam.key);

    expect(queryParamValue).contains(queryParam.value);
  });
});
