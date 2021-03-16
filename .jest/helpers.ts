const baseHttpClientMock = {
  revalidate: async () => Promise.resolve(false),
  isValidating: false,
  mutate: async () => Promise.resolve(null),
};

export const mockHttpClient = <T>(data: T) => () => ({
  data,
  ...baseHttpClientMock,
});
