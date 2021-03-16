import { useHttpClient } from '@/core/http-client';

type APIRandomImageResponse = {
  message: string;
  status: 'success' | 'error';
}

export type RandomPhoto = {
  image: string;
  name?: string;
}

export const useRandomImage = (breedTag?: string) => {
  const { data, ...rest } = useHttpClient<APIRandomImageResponse>(breedTag && `breed/${breedTag.replace('-', '/')}/images/random`, { onFocus: false });

  if (!data) {
    return {
      data,
      ...rest,
    };
  }

  return {
    data: {
      image: data.message,
      name: breedTag?.split('-').join(' '),
    },
    ...rest,
  };
};
