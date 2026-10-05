# Caleb Rong — Portfolio

A static portfolio with a home page and a page for each project: SignSpeak, Locus and Cognify. Plain HTML and CSS, plus a few lines of JavaScript for scroll animations. No dependencies or build step.

```
index.html            Home page
signspeak/index.html  SignSpeak project page
locus/index.html      Locus project page
cognify/index.html    Cognify project page
404.html              Not-found page
styles.css            Shared styles
assets/img/           Screenshots of each app (WebP)
assets/fonts/         Inter (SIL Open Font License); Apple devices use SF Pro instead
assets/site.js        Scroll fade-in
```

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
