# PIXEL — English For Tech

A feature-complete, content-light skeleton for an English-for-tech learning
app aimed at Indonesian high school / early college beginners. One real
example of every major feature (landing page, login/sign up, lesson, quiz,
mission simulator, leaderboard, profile, settings with an ID/EN language
toggle); everything else is built to expand without touching the app's
structure — see the comment block at the top of `src/App.jsx`.

Progress (XP, streak, completed lessons/missions, settings) is saved to
the browser's `localStorage`, per device. Accounts are also local (no
backend): usernames/passwords live in `localStorage` under a separate key
— real enough to demo sign up + log in, not meant for production auth.

**Try it without signing up:** on the login screen, tap one of the three
demo account chips (Sari W. / Bagus P. / Rian K.) to auto-fill their
username + password, then log in. Those same three accounts also show up
on the Rank screen, so there's always someone to compete against.

| Demo username | Password  |
|---------------|-----------|
| `sari`        | `sari123` |
| `bagus`       | `bagus123`|
| `rian`        | `rian123` |

## Run it locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Deploy

**Vercel**
1. Push this folder to a GitHub repo.
2. Import the repo in Vercel.
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

**Netlify**
1. Push to GitHub (or drag-and-drop the `dist/` folder after building, for a quick one-off deploy).
2. Build command: `npm run build`. Publish directory: `dist`.

**GitHub Pages**
1. In `vite.config.js`, uncomment `base: "/your-repo-name/"` and set it to your repo's name.
2. `npm run build`, then deploy the `dist/` folder (e.g. with the `gh-pages` package, or GitHub Actions).

## Notes for whoever picks this up next

- Content lives at the top of `src/App.jsx` (`LESSONS`, `LESSON_PASSAGES`,
  `MISSIONS`, `LEVELS`, `BADGES_CONFIG`, `MOCK_ACCOUNTS`, `STRINGS`). Add
  content there — screens read from it, so they don't need to change.
- `l2` and `l3` are intentionally content-less stubs (title + XP only) to
  show the learning path can hold more than one lesson. They render a
  "coming soon" placeholder if opened rather than crashing.
- Auth is real-enough-to-demo but local-only: `loadUsers`/`saveUsers`
  persist a `{ username: { password, displayName, xp } }` table to
  `localStorage`. Swapping in a real backend later means replacing those
  two functions (and the `onAuthSuccess` call in `App()`) with API calls —
  no screen needs to change.
- XP/streak/progress is still one shared blob per browser (not per
  account) — logging in as a different demo user changes the name shown,
  not a separate XP total. Wiring per-account progress is a natural next
  step once there's a real backend.
- Every interactive element (buttons, cards, nav, toggles, chips) shares
  a small set of hover/press CSS utilities (`.pixel-tap`, `.pixel-icon-pop`,
  `.pixel-anim-pop`) defined once in `GlobalStyle` — reuse those classes
  for new UI instead of writing one-off transitions.
