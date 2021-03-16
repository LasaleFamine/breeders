import * as httpClient from '@/core/http-client';
import { mockHttpClient } from '@/jest-helpers/helpers';
import { renderHook } from '@testing-library/react-hooks';
import { useRandomImage } from '../useRandomImage';

describe('useRandomImage', () => {
  it('should correctly random image', () => {
    const spy = jest.spyOn(httpClient, 'useHttpClient').mockImplementation(mockHttpClient({
      message: 'http://someimage.png',
    }));

    const { result } = renderHook(() => useRandomImage('some'));

    expect(result.current.data).toEqual({
      image: 'http://someimage.png',
      name: 'some',
    });
    expect(spy).toHaveBeenCalledWith('breed/some/images/random', { onFocus: false });
  });

  it('should correctly random image with multitag', () => {
    const spy = jest.spyOn(httpClient, 'useHttpClient').mockImplementation(mockHttpClient({
      message: 'http://someimage.png',
    }));

    const { result } = renderHook(() => useRandomImage('some-tag'));

    expect(result.current.data).toEqual({
      image: 'http://someimage.png',
      name: 'some tag',
    });
    expect(spy).toHaveBeenCalledWith('breed/some/tag/images/random', { onFocus: false });
  });

  it('should correctly return no data when tag is not specified', () => {
    const spy = jest.spyOn(httpClient, 'useHttpClient').mockImplementation(mockHttpClient(undefined));

    const { result } = renderHook(() => useRandomImage());

    expect(result.current.data).toEqual(undefined);
    expect(spy).toHaveBeenCalledWith(undefined, { onFocus: false });
  });
});
