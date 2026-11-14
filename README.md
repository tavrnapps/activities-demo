# Tavrn Activities Demo

A minimal, deployable example for [`@tavrnapps/activities-sdk`](https://www.npmjs.com/package/@tavrnapps/activities-sdk). It is a shared counter: each participant receives `counter.increment` events in the current Tavrn room or call.

## Run locally

```bash
npm install
npm run dev
```

The local page intentionally displays an “Open this in Tavrn” state because it has no Tavrn parent frame.

## Deploy to GitHub Pages

Pushing to `main` runs the included GitHub Actions Pages workflow. In the repository settings, set **Pages** to **GitHub Actions** once; the deployed demo will be available at:

`https://tavrnapps.github.io/activities-demo/`

Use that final Pages URL as the hosted URL in TavKit, and use `https://tavrnapps.github.io` as the approved origin. `public/activity.json` and `public/tavicon.png` are served with the build and contain the reviewable manifest metadata. The manifest’s activity ID, version, hosted URL, and exact origin must be reviewed together before Tavrn can embed it.

## What this demonstrates

- A reviewed Activity manifest for room and call placement
- `connectActivityHost` at application startup
- A permission-scoped participant request
- Shared activity events with a React subscription cleanup
- A graceful local-development state
