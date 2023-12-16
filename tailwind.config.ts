import withMT from "@material-tailwind/react/utils/withMT"
import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default withMT(config)
