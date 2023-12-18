import { useState, useCallback } from "react"
import {
  useGetPostsBySubjectQuery,
  PAGINATION_LIMIT,
  BeforeOrAfter,
} from "@/store/slice/api"

type PaginationState = { count: number } & BeforeOrAfter
const initialPaginationState = { before: null, after: null, count: 0 }

export const usePostsBySubject = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    before: null,
    after: null,
    count: 0,
  })
  const { data, error, isLoading, isFetching } = useGetPostsBySubjectQuery(
    pagination,
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const handleNext = useCallback(() => {
    if (data?.after) {
      setPagination(({ count: prevCount }) => ({
        before: null,
        after: data.after,
        count: prevCount + PAGINATION_LIMIT,
      }))
    }
  }, [data?.after])

  const handlePrev = useCallback(() => {
    if (data?.before) {
      setPagination(({ count: prevCount }) => ({
        before: data.before,
        after: null,
        count: prevCount ? prevCount - PAGINATION_LIMIT : 0,
      }))
    }
  }, [data?.before])

  const reload = useCallback(() => {
    setPagination(initialPaginationState)
  }, [])

  const prevDisabled = !data?.before
  const nextDisabled = !data?.after

  return {
    posts: data?.posts || [],
    error,
    isLoading,
    isFetching,
    prevDisabled,
    nextDisabled,
    handleNext,
    handlePrev,
    reload,
  }
}
