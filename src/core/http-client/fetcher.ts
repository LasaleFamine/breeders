import fetch from 'isomorphic-unfetch';

export const fetcher = async (...args: [RequestInfo, RequestInit]) => {
  const res = await fetch(...args);
  return res.json();
};
