# Caleb Rong — Portfolio

A static portfolio featuring SignSpeak, Locus, and Cognify. Plain HTML and CSS: no JavaScript, dependencies, or build step.

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

The entry point is `index.html`. Keep `styles.css` and the `assets/` folder beside it. The site uses system fonts and follows the visitor's light or dark mode setting.
