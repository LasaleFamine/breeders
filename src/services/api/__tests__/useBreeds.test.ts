import * as httpClient from '@/core/http-client';
import { renderHook } from '@testing-library/react-hooks';
import { useBreeds } from '../useBreeds';

const baseHttpClientMock = {
  revalidate: async () => Promise.resolve(false),
  isValidating: false,
  mutate: async () => Promise.resolve(null),
};

describe('useBreeds', () => {
  it('should correctly map the list', () => {
    jest.spyOn(httpClient, 'useHttpClient').mockImplementation(() => ({
      data: {
        message: {
          goku: ['ssj1', 'ssj2'],
          vegeta: ['ssj1'],
          mrsatan: [],
        },
      },
      ...baseHttpClientMock,
    }));

    const { result } = renderHook(() => useBreeds());

    expect(result.current.data).toEqual({
      list: [{
        name: 'goku ssj1',
        previewUrl: '/goku-ssj1.jpg',
      }, {
        name: 'goku ssj2',
        previewUrl: '/goku-ssj2.jpg',
      }, {
        name: 'vegeta ssj1',
        previewUrl: '/vegeta-ssj1.jpg',
      }, {
        name: 'mrsatan',
        previewUrl: '/mrsatan.jpg',
      }],
    });
  });

  it('should correctly return and empty array when data is not provided', () => {
    jest.spyOn(httpClient, 'useHttpClient').mockImplementation(() => ({
      data: undefined,
      ...baseHttpClientMock,
    }));

    const { result } = renderHook(() => useBreeds());

    expect(result.current.data).toEqual({
      list: [],
    });
  });
});
