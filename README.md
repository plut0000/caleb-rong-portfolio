# Caleb Rong — Portfolio

A static portfolio with a home page and a page for each project: SignSpeak, Locus, Cognify and CallCheck. Plain HTML and CSS with no JavaScript, dependencies or build step.

```
index.html            Home page
signspeak/index.html  SignSpeak project page
locus/index.html      Locus project page
cognify/index.html    Cognify project page
callcheck/index.html  CallCheck project page
404.html              Not-found page
styles.css            Shared styles
assets/img/           Screenshots of each app (WebP)
assets/og/            Link preview images (1200×630) for each page
assets/fonts/         Atkinson Hyperlegible Next (SIL Open Font License)
```

## Design

- **Type:** one family, Atkinson Hyperlegible Next, a typeface the Braille Institute designed for readers with low vision. Its slashed zero is part of the design.
- **Color:** navy ink (`#18213a`) on white. Each project has a key color taken from its own app, set by a class on `<body>` or on any element: `.signspeak`, `.locus`, `.cognify`, `.callcheck`. The class sets `--key` (buttons, links, focus rings), `--band` (the background behind screenshots) and `--tint` (screenshot sections).
- **Screenshots:** each one sits in a frame whose address bar shows where the app runs.

## Preview locally

Pages use root-relative paths (`/styles.css`), so serve the folder instead of opening the files directly:

```sh
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Deploy on Vercel

Import the repository with framework preset **Other**, no build command, and the repository root as the output directory. Vercel serves `signspeak/index.html` at `/signspeak/` and uses `404.html` for missing pages.

## Updating screenshots

The images in `assets/img/` were captured from each app running locally at 1440×900 with 2× pixel density and saved as WebP. Replace a file with the same name and dimensions to update it.

## Link previews

Each page has Open Graph and Twitter card tags, so pasting a link into iMessage, LinkedIn, Slack or Discord shows a preview image from `assets/og/`. The images use the site's own type and colors. The tags use absolute URLs on `https://www.caleb-rong.com`; update them if the domain changes. Some apps cache previews, so a change can take a while to show up for a link that was already shared.
