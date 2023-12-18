[Reddit stuff]

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

Node.js version >= v18.17.0 is required

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Issues

As of December 17, 2023, this project uses a specific version of `@types/react` (v18.2.42) as a temporary fix due to a known issue with `@material-tailwind/react`. This version is necessary to avoid TypeScript errors related to some of the components e.g `Button`.

For more details on this issue and ongoing discussions, please refer to the GitHub issue: [here](https://github.com/creativetimofficial/material-tailwind/issues/528).
