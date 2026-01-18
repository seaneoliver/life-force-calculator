# Life Force Calculator - Project Instructions

## Deployment

**Live site:** https://life-force-project.vercel.app/

**Deployed version:** Next.js app (`app/` directory)

Vercel auto-deploys from `main` branch on push.

## Important: Two Versions Exist

This project has TWO implementations:

1. **`life-force-calculator.html`** - Standalone HTML file (not deployed)
2. **`app/page.tsx` + `app/globals.css`** - Next.js app (deployed to Vercel)

**Always update the Next.js version** for changes to appear on the live site.

## After Making Changes

1. Update `app/page.tsx` and/or `app/globals.css`
2. Run `npm run build` to verify no errors
3. Commit and push to `main`
4. Verify deployment at https://life-force-project.vercel.app/

## File Structure

```
app/
  page.tsx       # Main React component
  globals.css    # All styles including dark mode
  layout.tsx     # Root layout with fonts
life-force-calculator.html  # Legacy standalone version (not deployed)
prd.json         # Ralph-format PRD with user stories
progress.txt     # Completed work log
```

## Features

- Income calculator (salary or hourly)
- Time commitment tracking (work, commute, prep, after-hours)
- Life hours cost calculation
- Dark mode toggle (respects system preference)
