# Birthday Reminder App + AI Orchestrator

This repository contains a static Birthday Book app and a separate seven-stage workflow dashboard. The app includes an offline approved-Q&A chatbot; it has no backend and makes no AI API calls.

## Routes

- `/` — workflow dashboard.
- `/birthday` — Birthday Book app.

`vercel.json` serves the project root as static files with no build step and rewrites these routes to their existing HTML files. The dashboard's **Open Birthday App** link uses `/birthday` after hosting and retains a relative local-file fallback.

## Test

From the project root, run:

```sh
node --test tests/*.test.cjs
```

## Vercel setup

1. Connect the repository to Vercel and keep the project root at the repository root.
2. Use the **Other** framework preset. `vercel.json` sets no build command and uses the repository root as the static output directory.
3. Deploy a preview and verify `/`, `/birthday`, and the dashboard link before promoting it.

For a local CLI deployment after the project is linked:

```sh
npx vercel
```

For a production deployment after review:

```sh
npx vercel --prod
```

## GitHub publishing (after review)

This workspace is not currently a Git repository. After reviewing the files, create a remote repository on GitHub, then run from this directory (replace the placeholder with that repository's URL):

```sh
git init -b main
git add .
git status --short
git commit -m "Prepare Birthday app for static hosting"
git remote add origin <GITHUB_REPOSITORY_URL>
git push -u origin main
```

`.gitignore` excludes environment files from Git, and `.vercelignore` excludes them from Vercel CLI uploads. Both also exclude common local credential files. `.env.example` is allowed only for placeholder values; do not put real keys or credentials in it. No credentials are needed for the static app.
