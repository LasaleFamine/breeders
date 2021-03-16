import * as httpClient from '@/core/http-client';
import { renderHook } from '@testing-library/react-hooks';
import { mockHttpClient } from '@/jest-helpers/helpers';
import { useBreeds } from '../useBreeds';

describe('useBreeds', () => {
  it('should correctly map the list', () => {
    jest.spyOn(httpClient, 'useHttpClient').mockImplementation(mockHttpClient({
      message: {
        goku: ['ssj1', 'ssj2'],
        vegeta: ['ssj1'],
        mrsatan: [],
      },
    }));

    const { result } = renderHook(() => useBreeds());

    expect(result.current.data).toEqual({
      list: [{
        name: 'goku ssj1',
        previewUrl: '/goku-ssj1.jpg',
        tag: 'goku-ssj1',
      }, {
        name: 'goku ssj2',
        previewUrl: '/goku-ssj2.jpg',
        tag: 'goku-ssj2',
      }, {
        name: 'vegeta ssj1',
        previewUrl: '/vegeta-ssj1.jpg',
        tag: 'vegeta-ssj1',
      }, {
        name: 'mrsatan',
        previewUrl: '/mrsatan.jpg',
        tag: 'mrsatan',
      }],
    });
  });

  it('should correctly return and empty array when data is not provided', () => {
    jest.spyOn(httpClient, 'useHttpClient').mockImplementation(mockHttpClient(undefined));

    const { result } = renderHook(() => useBreeds());

    expect(result.current.data).toEqual({
      list: [],
    });
  });
});
