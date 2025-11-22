import { describe, expect, it, vi } from 'vitest';
import { useDetectedScreenMode } from './use-detect-mobile-mode';
import { fireEvent, renderHook } from '@testing-library/react';

describe('custom hook detected screen mode hook', () => {
  it('should initial value with false when is greater than 769px', () => {
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1024);
    const { result } = renderHook(() => useDetectedScreenMode({ maxWidth: 769 }));

    expect(result.current.isMobileMode).toEqual(false);
  });

  it('should initial value with true when is less than 769px', () => {
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(549);
    const { result } = renderHook(() => useDetectedScreenMode({ maxWidth: 769 }));

    expect(result.current.isMobileMode).toEqual(true);
  });

  it('should update value when it is changed size of container', () => {
    const spyClientWith = vi.spyOn(document.body, 'clientWidth', 'get');
    spyClientWith.mockReturnValue(1024);
    const { result } = renderHook(() => useDetectedScreenMode({ maxWidth: 769 }));

    expect(result.current.isMobileMode).toEqual(false);

    spyClientWith.mockReturnValue(549);
    fireEvent.resize(window);

    expect(result.current.isMobileMode).toEqual(true);
  });
});
