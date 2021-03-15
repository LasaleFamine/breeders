import useSWR from 'swr';
import { fetcher } from './fetcher';

const API_BASE_URL = 'https://dog.ceo/api/';

export const useHttpClient = <D>(route: string) => useSWR<D>(`${API_BASE_URL}${route}`, fetcher, { suspense: true });
