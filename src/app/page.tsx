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
import { format, fromUnixTime } from "date-fns"
import Image from "next/image"

export const decodeHtml = (html: string) => {
  const textArea = document.createElement("textarea")
  textArea.innerHTML = html
  return textArea.value
}

export const isValidImageUrl = (url: string) => {
  return url.startsWith("http")
}

export default function Home() {
  const [pagination, setPagination] = useState<
    {
      count: number
    } & BeforeOrAfter
  >({ before: null, after: null, count: 0 })
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)

  const { data, error, isLoading, isFetching } = useGetPostsBySubjectQuery(
    {
      ...pagination,
    },
    { refetchOnMountOrArgChange: true }
  )

  const toggleExpandPost = (postId: string) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null)
    } else {
      setExpandedPostId(postId)
    }
  }

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

  const prevDisabled = !data?.before || isFetching
  const nextDisabled = !data?.after || isFetching

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-200 p-6 text-center sticky top-0 z-10">
        <Typography variant="h3" color="gray" className="font-bold">
          Reddit Stuff
        </Typography>
      </header>
      <main className="flex flex-1 flex-col items-center justify-between p-24">
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
        {data && !isLoading && !error && (
          <div>
            {data.posts.map((post) => (
              <Card key={post.id} className="mb-10">
                <CardBody>
                  {isValidImageUrl(post.thumbnail) && (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={post.thumbnail_width / 2}
                      height={post.thumbnail_height / 2}
                      className="mb-6 rounded-md"
                    />
                  )}
                  <Typography variant="h5" className="mb-2" color="teal">
                    {post.title}
                  </Typography>
                  <Typography>
                    Posted by {post.author} |{" "}
                    {format(fromUnixTime(post.created), "PPpp")}
                  </Typography>
                  <Typography>
                    {post.num_comments} Comments | Score: {post.score}
                  </Typography>
                  <div className="mt-5 flex justify-between">
                    {post.selftext_html && expandedPostId !== post.id ? (
                      <Button
                        color="teal"
                        onClick={() => toggleExpandPost(post.id)}
                      >
                        More
                      </Button>
                    ) : (
                      <div />
                    )}
                    <div>
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outlined" color="teal">
                          View on Reddit
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div>
                    {post.selftext_html && expandedPostId === post.id && (
                      <div className="mt-5">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: decodeHtml(post.selftext_html),
                          }}
                        />
                        <Button
                          className="mt-6"
                          color="teal"
                          onClick={() => toggleExpandPost(post.id)}
                        >
                          Less
                        </Button>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </main>
      {/* <footer className="p-4 bg-gray-200 text-center flex justify-center">
        <ButtonGroup>
          <Button onClick={handleClickPrev} disabled={prevDisabled}>
            Previous
          </Button>
          <Button onClick={handleClickNext} disabled={nextDisabled}>
            Next
          </Button>
        </ButtonGroup>
      </footer> */}
      <footer className="bg-gray-200 p-4 flex justify-center sticky bottom-0 z-10">
        <ButtonGroup>
          <Button onClick={handleClickPrev} disabled={prevDisabled}>
            Previous
          </Button>
          <Button onClick={handleClickNext} disabled={nextDisabled}>
            Next
          </Button>
        </ButtonGroup>
      </footer>
    </div>
  )
}
