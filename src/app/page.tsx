"use client"

import {
  BeforeOrAfter,
  PAGINATION_LIMIT,
  useGetPostsBySubjectQuery,
} from "@/store/slice/api"
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react"
import { useEffect, useState } from "react"

export default function Home() {
  const [pagination, setPagination] = useState<
    {
      count: number
    } & BeforeOrAfter
  >({ before: null, after: null, count: 0 })

  const { data, error, isLoading, isFetching } = useGetPostsBySubjectQuery(
    {
      ...pagination,
    },
    { refetchOnMountOrArgChange: true }
  )

  const handleClickPrev = () => {
    if (data?.before) {
      setPagination(({ count: prevCount }) => {
        return {
          before: data.before,
          after: null,
          // Decrease count by the number of posts loaded
          count: prevCount ? prevCount - PAGINATION_LIMIT : 0,
        }
      })
    }
  }

  const handleClickNext = () => {
    if (data?.after) {
      setPagination(({ count: prevCount }) => ({
        before: null,
        after: data.after,
        // Increase count by the number of posts loaded
        count: prevCount + PAGINATION_LIMIT,
      }))
    }
  }

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-between p-24">
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
        {data && !isLoading && !error && (
          <div>
            {data.posts.map((post) => (
              <Card key={post.id} className="mb-10">
                <CardBody>
                  <Typography variant="h5" className="mb-2">
                    {post.title}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </main>
      <footer className="p-4 bg-gray-200 text-center flex justify-center">
        <ButtonGroup>
          <Button onClick={handleClickPrev} disabled={!data?.before}>
            Previous
          </Button>
          <Button onClick={handleClickNext} disabled={!data?.after}>
            Next
          </Button>
        </ButtonGroup>
      </footer>
    </div>
  )
}
