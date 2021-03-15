import { useMemo } from 'react';
import { useHttpClient } from '@/core/http-client';

type APIBreedsListResponse = {
  message: Record<string, string[]>;
  status: 'success' | 'error';
}

const previewUrlBuilder = (breed: string, innerBreed?: string) => (innerBreed ? `/${breed}-${innerBreed}.jpg` : `/${breed}.jpg`);

export const useBreeds = () => {
  const { data, ...rest } = useHttpClient<APIBreedsListResponse>('breeds/list/all');

  const mappedData = useMemo(() => ({
    list: !data ? [] : Object.keys(data.message).reduce<{ name: string; previewUrl: string }[]>((acc, breed) => {
      const innerBreeds = data.message[breed];
      if (innerBreeds.length > 0) {
        const innerBreedsMapped = innerBreeds.map(innerBreed => ({
          name: `${breed} ${innerBreed}`,
          previewUrl: previewUrlBuilder(breed, innerBreed),
        }));

        return acc.concat(...innerBreedsMapped);
      }

      return acc.concat({
        name: breed,
        previewUrl: previewUrlBuilder(breed),
      });
    }, []),
  }), [data]);

  return {
    data: mappedData,
    ...rest,
  };
};
