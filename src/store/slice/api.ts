import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = "https://api.reddit.com"
export const PAGINATION_LIMIT = 10

// TODO: Add more subjects and ability to select
enum Subject {
  JAVASCRIPT = "javascript",
}

// TODO: Move to types
export type BeforeOrAfter =
  | { before: string; after: null }
  | { before: null; after: string }
  | { before: null; after: null }

type PostsQueryArgs = {
  count: number
} & BeforeOrAfter

export type Post = {
  id: string
  name: string
  created: number
  num_comments: number
  thumbnail: string
  thumbnail_width: number
  thumbnail_height: number
  author: string
  score: number
  permalink: string
  title: string
  selftext: string
  selftext_html: string | null
}

type PostsApiResponse = {
  data: {
    children: {
      data: Post
    }[]
    before: string | null
    after: string | null
  }
}

type TransformedResponse = {
  posts: Post[]
  before: string | null
  after: string | null
}

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPostsBySubject: builder.query<TransformedResponse, PostsQueryArgs>({
      query: ({ before, after, count }) => {
        let q = `/r/${Subject.JAVASCRIPT}.json?limit=${PAGINATION_LIMIT}&count=${count}`

        if (after) {
          q += `&after=${after}`
        }

        if (before) {
          q += `&before=${before}`
        }

        return q
      },
      transformResponse: (res: PostsApiResponse) => {
        // Get rid of children above pagination limit since api don't respect limit
        const posts = res.data.children.slice(0, PAGINATION_LIMIT)
        const lastPostName = posts.slice(-1)[0]?.data?.name ?? null

        // TODO: handle errors
        // TODO: cache responses until res.data.before is null (first page)
        const transformedPosts = posts.map(({ data }) => ({
          id: data.id,
          name: data.name,
          created: data.created,
          num_comments: data.num_comments,
          thumbnail: data.thumbnail,
          thumbnail_width: data.thumbnail_width,
          thumbnail_height: data.thumbnail_height,
          author: data.author,
          score: data.score,
          permalink: `https://www.reddit.com${data.permalink}`,
          title: data.title,
          selftext: data.selftext,
          selftext_html: data.selftext_html,
        }))

        return {
          posts: transformedPosts,
          before: res.data.before,
          after: lastPostName,
        }
      },
    }),
  }),
})

export const { useGetPostsBySubjectQuery } = redditApi
