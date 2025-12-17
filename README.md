# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Switch to the correct folder:

```bash
cd ./portfolio-wendt-milestone-3
```

Make sure to install dependencies:

```bash
# npm
npm install
```

And to migrate with drizzle-kit

```bash
npx drizzle-kit migrate
```

And then to seed the DB

```bash
npx tsx server/seed.ts
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
