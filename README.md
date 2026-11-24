# Prafulla Kumar Gouda — Portfolio
https://prafulla-kumar-gouda.github.io/prafulla-portfolio-trial/

A single-page portfolio built with React, Vite, TypeScript and Tailwind CSS. No backend, no paid services.

> **Just want to see it running?** Open `START_HERE.txt`: install Node.js, then `npm install` and `npm start`.

## Changing the colours

The whole theme is a short list of variables at the top of `src/styles/index.css` (black background, charcoal sidebar, graphite cards, muted gold accent, soft gold for key figures, a warm hover tint). Change them there and the entire site follows. The share-preview image `public/og-image.png` and the favicon are images, so recreate them if you change the palette.

## Navigation: scroll, or jump with the tabs

The portfolio is one continuous page. You can scroll through it from Home to Contact, or use the navigation tabs (the sidebar on desktop, the menu on phones) to jump straight to a section. Both work together:

- Clicking a tab scrolls smoothly to its section (instantly if the visitor prefers reduced motion). Home goes back to the very top.
- While scrolling, the highlighted tab follows the section on screen. It is driven by an `IntersectionObserver` in `src/hooks/useScrollSpy.ts`.
- The address bar follows too (`/#about`, `/#skills`, ...), without adding history entries, so a refresh or a copied link returns to the same place. The browser's back and forward buttons move between the tabs you clicked.
- The navigation stays on screen: the sidebar is fixed on desktop and the top bar is fixed on phones. Sections are offset so their headings are never hidden under the phone bar (`scroll-padding-top` in `src/styles/index.css`).

| Section | Address |
|---|---|
| Home | `/` or `/#home` |
| About | `/#about` |
| Skills | `/#skills` |
| Projects | `/#projects` |
| Experience | `/#experience` |
| Leadership | `/#leadership` |
| Education | `/#education` |
| Contact | `/#contact` |
| A project's details | `/#project-ai-bi`, `/#project-weather`, `/#project-testing`, `/#project-food` |

**Add a section:** create the section component with `<section id="your-id">`, place it in `src/App.tsx` in the order you want, and add its entry (id, label, icon) to `navItems` in `src/components/Sidebar.tsx`. The scroll-spy and both menus pick it up automatically.

## Scroll animations

Headings, paragraphs, images and cards fade in and move up slightly as they scroll into view, one after another, and play again when you scroll back to them. It works the same when you jump with the navigation tabs. There is no animation library: one `IntersectionObserver` (`src/motion.tsx`) toggles a class and a CSS transition does the rest (the "Scroll reveal" block at the end of `src/styles/index.css`).

- **Use it on an element:** `<div {...reveal(2)}>` (the number is the stagger position, 0 to 6; higher appears later).
- **Tune it:** the duration (`0.7s`), the slide distance (`22px`), the stagger (`70ms`) and the easing (`--ease`) are all in that CSS block.
- **Safety:** the hidden start state only exists while `<html>` has the class `motion-ready`, which a short script in `index.html` adds only when the browser supports `IntersectionObserver` and the visitor has not asked for reduced motion (those visitors see the page unchanged). If nothing has been revealed within 4 seconds, everything is shown.
- **Switch it off:** delete the `<script>` block in `index.html` that adds `motion-ready`.

## Before you publish (2 minutes)

1. **Add your contact details.** Open the ready-made `.env` file (git ignores it; `.env.example` is the blank template) and fill in `VITE_CONTACT_EMAIL` (and `VITE_CONTACT_PHONE` if you want a phone number shown), then run `npm run build`. The email link, copy-email button and feedback form all read this value. Until they are set, those rows and icons are simply not shown (no placeholder text ever appears), and the feedback form is hidden on the live site because it would have nowhere to send to.
2. **Add your resume.** Put your PDF in the `public/` folder named exactly `Prafulla_Kumar_Gouda_Resume.pdf`. The "Download Resume" buttons stay greyed out until that file exists.
3. **Photo.** Your portrait is `src/assets/profile.jpg` (a square crop around the face). Replace that file to change it.
4. **Share preview (after publishing).** Once the site has a public address, set `VITE_SITE_URL=https://...` in `.env` and rebuild. This adds the share image (`public/og-image.png`, already made) so the link looks right on LinkedIn and WhatsApp.
5. **NCC emblem (optional).** Put the official emblem in `public/ncc-logo.png` and it appears on the NCC "B" & "C" card.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Feedback form: how messages reach you

The site has no backend of its own, so the form works in one of two honest modes:

1. **Email app (default).** Once `VITE_CONTACT_EMAIL` is set in `.env`, Send feedback opens the visitor's email app with the message ready. The form says the app was opened, never that the message was delivered.
2. **Direct delivery (optional).** Create a form endpoint that accepts a JSON POST and answers with a normal 200 status when it saves the message (a Google Apps Script web app or a Zoho form fits the Google and Zoho tools you already use). Put its URL in a `.env` file as `VITE_FEEDBACK_ENDPOINT=https://...`, then rebuild. The form then shows "sent" only after a real OK reply, shows an error and keeps the text if it fails, and blocks double submits. No keys or passwords belong in the website code.

## Deploy for free

**GitHub Pages (workflow included)**

**Publishing with GitHub Pages: your email needs one extra step.** The `.env` file is private and is never uploaded to GitHub, so the published site cannot see it. In your repository open Settings, then Secrets and variables, then Actions, then the **Variables** tab, and add a repository variable named `VITE_CONTACT_EMAIL` with your Gmail address as its value (add `VITE_CONTACT_PHONE` too if you want a phone number shown). Then open the Actions tab and run "Deploy portfolio" again. Use Variables, not Secrets: the address is shown on the page anyway.

1. Push this folder to a GitHub repository on the `main` branch.
2. In the repo, open Settings > Pages and set Source to **GitHub Actions**.
3. Every push to `main` rebuilds and publishes the site. The address appears in the Actions run.

**Netlify or Vercel**
Import the repository (or drag the `dist/` folder into Netlify Drop). Build command `npm run build`, output directory `dist`.

## Update the portfolio later

All content lives in `src/data/`, so you rarely touch components.

| To change | Edit |
|---|---|
| Name, links, About cards | `src/data/profile.ts` |
| Email, feedback endpoint | `.env` (see `.env.example`) |
| Skills and categories | `src/data/skills.ts` |
| Projects, filters, the featured case study, screenshots | `src/data/projects.ts` |
| Experience, leadership, education, achievements, languages | the matching file in `src/sections/` |
| Colours (dark and light) | the `:root` blocks in `src/styles/index.css` |

**Link straight to a project's details view:** add `#project-ai-bi`, `#project-weather`, `#project-testing` or `#project-food` to the site address (for example `https://your-site/#project-ai-bi`). The page scrolls to Projects and opens that view.

**Add a project:** add an object to the `projects` array. Give it `categories` from the filter list. Add `github` and `live` only when the links are real. Without them the card shows its note instead of a button.

**Add a certificate:** add a line to `items` in `src/sections/AchievementsSection.tsx`.

**Replace screenshots:** drop a `.webp` or `.png` into `public/screens/` and update the `screens` list in `src/data/projects.ts` (keep width and height accurate to avoid layout shift).

## Accuracy notes

- The featured project description was checked against the public repository. Its "AI insights" are analytical and rule-based. No external LLM API is used, and the site says so.
- Screenshots are the real images from that repository.
- No dates, metrics, grades or ranks beyond the ones you supplied were added. Projects without a public repository have no GitHub button.
- There is no contact form, because there is no backend. Contact uses a `mailto:` link.

## Structure

```
src/
  components/   Navbar, ThemeToggle, ResumeButtons, BackToTop, Footer, SectionHeading, BrandIcons
  sections/     Hero, About, Skills, Projects, FeaturedProject, Experience, Leadership,
                Education, Achievements (with Languages), Contact
  data/         profile.ts, skills.ts, projects.ts
  hooks/        useTheme, useActiveSection, useResumeAvailable
  styles/       index.css (design tokens, buttons, hero animation)
```
