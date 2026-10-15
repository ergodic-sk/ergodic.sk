# ergodic.sk

Company site of Ergodic s. r. o. Built from the "C · Cobalt" identity: blueprint sheets, cobalt and paper, signal orange.

## Stack

- Next.js 16 (App Router, Cache Components), fully prerendered
- shadcn/ui on Base UI (`base-lyra` style, components in `src/components/ui`)
- Tailwind CSS 4, brand tokens in `src/app/globals.css`
- next-intl: Slovak at `/`, English at `/en` (`messages/*.json`)
- Hero animation: plain SVG + CSS keyframes, respects `prefers-reduced-motion`
- Contact form: client-side validation, then opens a prefilled `mailto:` to office@ergodic.sk (no server sending for now)

## Develop

```bash
pnpm install
pnpm dev
```

`pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Content

- Copy: `messages/sk.json`, `messages/en.json`
- Company facts, phone, LinkedIn, founder photo: `src/config/site.ts` (`null` hides the item; `showStudio` turns the founder section on)
- Privacy notice: `src/content/privacy.ts`

## Adding shadcn components

`ui.shadcn.com` is reachable from normal machines, so `pnpm dlx shadcn@latest add <name>` works with the committed `components.json`.

## Deploy

Vercel, region `fra1` (`vercel.json`).
