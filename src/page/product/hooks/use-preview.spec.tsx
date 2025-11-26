import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePreview } from './use-preview';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('preview custom hook', () => {
  it('should returned as initial value', () => {
    const imageUrl = faker.image.url();
    const { result } = renderHook(usePreview, { initialProps: { img: imageUrl } });

    expect(result.current.state).toEqual({
      previewImage: imageUrl,
      isLoading: true,
    });
  });

  it('should update preview image and loading state when call handleSetNewPreviewImage', () => {
    const { result } = renderHook(usePreview, { initialProps: { img: faker.image.url() } });

    const imageUrl = faker.image.url();
    act(() => result.current.handleSetNewPreviewImage(imageUrl));

    expect(result.current.state).toEqual({
      previewImage: imageUrl,
      isLoading: true,
    });
  });

  it('should update loading state to false when call handleSetNewPreviewImage', () => {
    const imageUrl = faker.image.url();
    const { result } = renderHook(usePreview, { initialProps: { img: imageUrl } });

    act(() => result.current.handleFinishLoadingPreviewImage());

    expect(result.current.state).toEqual({
      previewImage: imageUrl,
      isLoading: false,
    });
  });
});
