import { QueryClient } from '@tanstack/query-core';
import { cache } from 'react';

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60 * 10,
        },
      },
    })
);
export default getQueryClient;
