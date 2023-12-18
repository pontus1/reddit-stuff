import { Post } from "@/store/slice/api"
import { decodeHtml, isValidImageUrl } from "@/utils.ts"
import { Button, Card, CardBody, Typography } from "@material-tailwind/react"
import Image from "next/image"
import { format, fromUnixTime } from "date-fns"
import { useState } from "react"

type Props = {
  posts: Post[]
}

export const PostList = ({ posts }: Props) => {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)

  const toggleExpandPost = (postId: string) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null)
    } else {
      setExpandedPostId(postId)
    }
  }

  return (
    <div>
      {posts.map((post) => (
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
                <Button color="teal" onClick={() => toggleExpandPost(post.id)}>
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
  )
}
