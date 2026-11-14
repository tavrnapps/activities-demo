# Tavrn Activities Demo

A minimal, deployable example for [`@tavrnapps/activities-sdk`](https://www.npmjs.com/package/@tavrnapps/activities-sdk). It is a shared counter: each participant receives `counter.increment` events in the current Tavrn room or call.

## Run locally

```bash
npm install
npm run dev
```

The local page intentionally displays an “Open this in Tavrn” state because it has no Tavrn parent frame.

## Publish to GitHub Pages

Build the static site, then publish the `dist/` folder through GitHub Pages:

```bash
npm run build
```

Use the final Pages URL when submitting the activity in TavKit. The manifest’s activity ID, version, hosted URL, and exact origin must be reviewed together before Tavrn can embed it.

## What this demonstrates

- A reviewed Activity manifest for room and call placement
- `connectActivityHost` at application startup
- A permission-scoped participant request
- Shared activity events with a React subscription cleanup
- A graceful local-development state
