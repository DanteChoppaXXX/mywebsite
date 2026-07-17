# Portfolio — Systems & Network Programmer

## Stack
React 19 + Vite, React Router 7, Tailwind CSS v4, Framer Motion, React Icons.

## Step 1: Foundation

### Folder structure
```
src/
  components/
    ui/         reusable primitives (Button, Card, Badge...) — built in Step 2
    layout/      Navbar, Footer — shell components used on every page
    sections/    page-specific composed sections (Hero, FeaturedProjects...) — Step 3+
  layouts/       route-level layout wrappers (MainLayout = Navbar + Outlet + Footer)
  pages/         one component per route, composed from sections
  routes/        centralized router config (routes/index.jsx)
  data/          content as data (projects.js, skills.js, blog.js, resume.js)
  constants/     nav links, social links — anything referenced in multiple places
  hooks/         custom hooks (useTerminal, useScrollSpy, etc.) — added as needed
  context/       React context providers, if/when global state is needed
  utils/         small pure helpers (cn.js for classnames)
  assets/        images, icons
```

**Why this shape:** pages stay thin (they only compose sections), sections stay
reusable (they don't know which page they're on), and content lives in `data/`
so adding a project or blog post later is a data edit, not a component edit.
This mirrors the separation you'd want in a backend service — presentation,
business logic, and data kept in distinct layers so each can change
independently.

### Design tokens (`src/index.css`)
Every color, font, and radius is defined once as a CSS variable under
`@theme`, then consumed through Tailwind utilities (`bg-background`,
`text-accent`, `font-mono`). Nothing in a component should ever hardcode a
hex value — this is what makes a future rebrand or dark/light toggle a
one-file change instead of a find-and-replace across the codebase.

Tailwind v4 was used deliberately over v3: it reads theme tokens straight
from CSS (no `tailwind.config.js` indirection), which keeps the token system
in one place and slightly reduces build tooling surface.

### Routing
`react-router-dom`'s `createBrowserRouter` with one shared `MainLayout`
wrapping all pages via `<Outlet />`. Project and blog detail pages use
`:slug` params (`/projects/:slug`, `/blog/:slug`) rather than numeric IDs —
slugs are readable, stable, and SEO-friendly.

### Firebase
`firebase.json` is configured with a catch-all rewrite to `index.html`
(required for client-side routing to work on refresh/deep-link) and
long-cache headers for hashed static assets. `.firebaserc` has a placeholder
project ID — swap in your real Firebase project ID before deploying.

## Commands
```
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally

# Deploy (after `npm install -g firebase-tools` and `firebase login`)
firebase deploy
```

