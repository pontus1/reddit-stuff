import { Button, ButtonGroup, Spinner } from "@material-tailwind/react"

type Props = {
  isLoading: boolean
  onPrev: () => void
  onNext: () => void
  prevDisabled: boolean
  nextDisabled: boolean
}

export const Footer = ({
  isLoading,
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}: Props) => {
  return (
    <footer className="bg-gray-200 p-4 flex justify-center sticky bottom-0 z-10">
      {isLoading ? (
        <Spinner className="h-10 w-10" />
      ) : (
        <ButtonGroup>
          <Button onClick={onPrev} disabled={prevDisabled}>
            Prev
          </Button>
          <Button onClick={onNext} disabled={nextDisabled}>
            Next
          </Button>
        </ButtonGroup>
      )}
    </footer>
  )
}
