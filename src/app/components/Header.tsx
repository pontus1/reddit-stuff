import { Typography } from "@material-tailwind/react"

type Props = {
  title: string
}

export const Header = ({ title }: Props) => {
  return (
    <header className="bg-gray-200 p-6 text-center sticky top-0 z-10">
      <Typography variant="h3" color="gray" className="font-bold">
        {title}
      </Typography>
    </header>
  )
}
