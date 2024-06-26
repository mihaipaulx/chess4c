Chess4c is a training tool for chess visualization.

The training method is defined by regular chess puzzles, but moves can only be made by drawing arrows.

This hides the pieces' position on the board, which forces you to keep track of board position at all times.

## Features

- User Authentication: Sign up, sign out, forgot password, email verification, and oAuth. Powered by Supabase Auth.
- Marketing Page with SEO optimization
- Blog engine with rich formatting, RSS and SEO optimization.
- User Dashboard with user profile, user settings, update email/password, billing, and more.
- Subscriptions powered by Stripe Checkout
- Pricing page
- Contact-us form
- Billing portal: self serve to change card, upgrade, cancel, or download receipts
- Onboarding flow after signup: collect user data, and select a payment plan
- Style toolkit: theming and UI components
- Responsive: designed for mobile and desktop.

## Tech Stack

- Web Framework: SvelteKit
- CSS / Styling
  - Framework: TailwindCSS
  - Component library: DaisyUI
- Hosting Stack
  - Authentication: Supabase Auth
  - Database: Supabase Postgres
- Payments
  - Stripe Checkout 
  - Stripe Portal

## Performance

The selected tech stack creates lightning fast websites.

 - Pre-rendering (static generation) for marketing pages, pricing and blog
 - Instant navigation: the best of CSR + SSR in one. SSR for the first page, and for subsequent pages, the content is pre-loaded and rendered with CSR, for instant rendering.
 - CDN optimized, for high edge-cache hit ratios
 - Edge-functions for dynamic APIs/pages
 - Svelte and Tailwind compile out unused HTML, CSS and JS at deploy time for smaller pages
 - Linting to find accessibility and syntax issues

# Quick Start

### Get Started (Local Development)

To get started, fork and run this project!

```
## First fork the project on Github
git pull [Your Fork]
cd chess4c ## or your fork name if different
npm install
## Create an env file. You'll replace the values in this in later steps.
cp local_env_template .env.local
## Run the project locally in dev mode, and launch the browser
npm run dev -- --open
```

### Developer Environment

Installing extensions in your editor can automatically format-on-save, show linting/type issues inline, and run your test cases: 
- Svelte for Svelte and accessibility issues: [VSCode](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) or [other editors](https://sveltesociety.dev/tools#editor-support) 
- ESLint for type checking and linting: [VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [other editors](https://eslint.org/docs/latest/use/integrations)
- Vitest for testing if you add tests: [VSCode](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) or [other editors](https://vitest.dev/guide/ide) 