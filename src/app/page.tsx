"use client"
import { Button, Typography, Spinner } from "@material-tailwind/react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { PostList } from "./components/PostList"
import { usePostsBySubject } from "./hooks/usePostsBySubject"

export default function Home() {
  const {
    posts,
    error,
    isLoading,
    isFetching,
    prevDisabled,
    nextDisabled,
    handleNext,
    handlePrev,
    reload,
  } = usePostsBySubject()

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Reddit Stuff" />
      <main className="flex flex-1 flex-col items-center justify-between p-24">
        {isLoading ? (
          <Spinner className="h-12 w-12" data-testid="home-spinner" />
        ) : error ? (
          <>
            <Typography variant="h4">Oops, something went wrong...</Typography>
            <Button onClick={reload}>Reload</Button>
          </>
        ) : (
          <PostList posts={posts} />
        )}
      </main>
      <Footer
        isLoading={isLoading || isFetching}
        onPrev={handlePrev}
        onNext={handleNext}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
      />
    </div>
  )
}
