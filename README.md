# SetupZero website

Marketing site for SetupZero, the technology partner for brokers, prop firms and fintechs.
Built with Next.js 16 (App Router), Tailwind CSS v4, React Three Fiber and motion.

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
```

## Where to edit content

- `src/content/*.ts`: all page copy (home, solutions, products, pricing, FAQ, about, legal).
- `src/content/placeholders.ts`: every number shown on the site. Confirm before launch.
- `src/content/images.ts`: photos per card and section (Unsplash, free commercial licence).
- `src/content/blog/*.mdx`: blog articles.
- `src/app/api/lead/route.ts`: receives all form submissions. It currently only logs them; connect email or a CRM here.

## Deploy

Import the repo in Vercel (framework preset: Next.js, no extra settings), then set
`NEXT_PUBLIC_SITE_URL=https://setupzero.com` in Project Settings → Environment Variables.
