import useSWR from 'swr';
import { fetcher } from './fetcher';

const API_BASE_URL = 'https://dog.ceo/api/';

type Opts = {
  onFocus?: boolean;
  suspense?: boolean;
}

export const useHttpClient = <D>(route?: string, opts: Opts = { onFocus: true, suspense: true }) => useSWR<D>(
  route ? `${API_BASE_URL}${route}` : null, fetcher, {
    suspense: opts.suspense,
    revalidateOnFocus: opts.onFocus,
  },
);
