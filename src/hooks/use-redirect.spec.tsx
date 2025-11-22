import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRedirect } from './use-redirect';
import { ROUTES_PATHNAMES } from '@/util/const';
import { faker } from '@faker-js/faker/locale/pt_BR';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
}));

describe('custom redirect', () => {
  it('should call handleTogglePage', () => {
    const { result } = renderHook(useRedirect);

    result.current.handleTogglePage({ pathName: ROUTES_PATHNAMES.CAR });

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES_PATHNAMES.CAR);
  });

  it('should call handleBackPage', () => {
    const spyHistoryBack = vi.spyOn(window.history, 'back');
    const { result } = renderHook(useRedirect);

    result.current.handleBackPage();

    expect(spyHistoryBack).toHaveBeenCalled();
  });

  it('should call handleReplacePage', () => {
    const mockReplace = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      replace: mockReplace,
    } as Location);
    const { result } = renderHook(useRedirect);

    result.current.handleReplacePage({ pathName: ROUTES_PATHNAMES.CAR });

    expect(mockReplace).toHaveBeenCalledWith(ROUTES_PATHNAMES.CAR);
  });

  it('should call handleRedirectionToProduct', () => {
    const productId = faker.database.mongodbObjectId();
    const { result } = renderHook(useRedirect);

    result.current.handleRedirectionToProduct(productId);

    expect(mockNavigate).toHaveBeenCalledWith(
      ROUTES_PATHNAMES.PRODUCT.replace(':productId', productId),
    );
  });
});
