import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend4shoxrux.pythonanywhere.com'
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => '/api/song/?format=json'
    })
  })
});

export const { useGetTopChartsQuery } = shazamCoreApi;
