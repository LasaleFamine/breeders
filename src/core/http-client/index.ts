import useSWR from 'swr';
import { fetcher } from './fetcher';

const API_BASE_URL = 'https://dog.ceo/api/';

type Opts = {
  onFocus: boolean;
}

export const useHttpClient = <D>(route?: string, opts: Opts = { onFocus: true }) => useSWR<D>(route ? `${API_BASE_URL}${route}` : null, fetcher, {
  suspense: true,
  revalidateOnFocus: opts.onFocus,
});
