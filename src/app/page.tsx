"use client"

import { useGetPostsBySubjectQuery } from "@/store/slice/api"
import { Button, ButtonGroup } from "@material-tailwind/react"
import { useEffect } from "react"

export default function Home() {
  const { data, error, isLoading } = useGetPostsBySubjectQuery("")

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
        {!isLoading && !error && <h1>Success!</h1>}
      </main>
      <footer className="p-4 bg-gray-200 text-center flex justify-center">
        <ButtonGroup>
          <Button>Previous</Button>
          <Button>Next</Button>
        </ButtonGroup>
      </footer>
    </div>
  )
}
