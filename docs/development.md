# Development

Notes for working on ergodic.sk.

## Run locally

```bash
pnpm install
pnpm dev
```

Checks: `pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Stack

- Next.js 16 (App Router, Cache Components), fully prerendered
- shadcn/ui on Base UI (`base-lyra` style, components in `src/components/ui`)
- Tailwind CSS 4, brand tokens in `src/app/globals.css`
- next-intl: Slovak at `/`, English at `/en`
- Hero animation: plain SVG and CSS keyframes, respects `prefers-reduced-motion`
- Contact form: client-side validation, then opens a prefilled `mailto:` to office@ergodic.sk (no server sending)
- Vercel Web Analytics with custom events in `src/lib/analytics.ts`

## Where content lives

- Copy: `messages/sk.json`, `messages/en.json`
- Company facts, phone, LinkedIn, founder photo: `src/config/site.ts` (`null` hides the item; `showStudio` turns the founder section on)
- Privacy notice: `src/content/privacy.ts`

## Adding shadcn components

`pnpm dlx shadcn@latest add <name>` works with the committed `components.json`.

## Deploy

Vercel, region `fra1` (`vercel.json`). Every merge to `main` goes live.
