import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = "https://api.reddit.com"
const PAGINATION_LIMIT = 10
enum Subject {
  JAVASCRIPT = "javascript",
}

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPostsBySubject: builder.query({
      query: () => `/r/${Subject.JAVASCRIPT}.json?limit=${PAGINATION_LIMIT}`,
    }),
  }),
})

export const { useGetPostsBySubjectQuery } = redditApi
