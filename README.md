# Caleb Rong — Portfolio

A static portfolio featuring SignSpeak, Locus, and Cognify. Built with HTML, CSS, a little JavaScript for the case-study dialog, and original SVG illustrations. No dependencies or build step are required.

## Preview locally

From the repository root, run:

```sh
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Deploy on Vercel

Import the repository and use:

- Framework preset: **Other**
- Build command: leave empty
- Output directory: **.** (the repository root), if required

The entry point is `index.html`. Keep `styles.css`, `app.js`, and the `assets/` folder beside it. Fonts (Geist and Geist Mono, SIL Open Font License) are self-hosted in `assets/fonts/`, so the site makes no third-party requests.
