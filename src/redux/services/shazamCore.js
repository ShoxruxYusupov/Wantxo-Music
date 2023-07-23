import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://genius-song-lyrics1.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "2bee336dfbmsh2a0ade8214b304dp10f24ejsn15d18b30c7b7"
      );

      return headers;
    },
    paramsSerializer: (params) => {
      params.set();
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () =>
        "chart/songs/?time_period=day&chart_genre=rap&per_page=20&page=1",
    }),
    getSongLyrics: builder.query({
      query: (songid) => `song/lyrics/?id=${songid}`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `song/details/?id=${songid}`,
    }),
    getSongRecomendation: builder.query({
      query: (songid) => `song/recommendations/?id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `artist/details/?id=${artistId}`,
    }),
    getArtistSongs: builder.query({
      query: (artistId) => `artist/songs/?id=${artistId}&per_page=10&page=1`,
    }),
    getSearch: builder.query({
      query: (text) => `search/?q=${text}&per_page=10&page=1`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongLyricsQuery,
  useGetSongRecomendationQuery,
  useGetArtistDetailsQuery,
  useGetArtistSongsQuery,
  useGetSearchQuery,
} = shazamCoreApi;
