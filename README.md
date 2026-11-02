# Ammily Prain — Portfolio 2026

Personal graphic design portfolio built from the Portfolio 2026 Figma designs.

Live site: https://www.ammilyprain.com

## Files

- `dist/index.html`: Work Index, category filters, newest-first ordering and formatted captions.
- `dist/work/silpacheep/index.html`: Silpacheep project page.
- `dist/work/nakhon-phanom/index.html`: Feel…Nakhon Phanom project page, linked from its Work Index cover.
- `source-assets/nakhon-phanom/`: Eight ordered parts of the supplied original SVG.
- `scripts/build.mjs`: Reassembles the original SVG and verifies its size and SHA-256 before publishing.
- `vercel.json`: Builds and publishes `dist` through the existing GitHub → Vercel connection.
- `dist/assets/`: Project artwork, the four animated states for 13 (un) BELIEF, and fonts.
- `.openai/hosting.json`: Existing Sites deployment configuration.

## Run locally

No dependency installation is needed. Assemble the Nakhon Phanom artwork, then serve `dist` as the website root:

```sh
node scripts/build.mjs
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Serving from `dist` preserves the absolute asset and project URLs.

## Included behavior

- Category filters with projects belonging to multiple categories.
- Projects ordered from 2026 to 2022.
- Caption text and selective bold formatting from the work-status spreadsheet.
- Hover animation for 13 (un) BELIEF using four Figma states.
- Automatic entrance animations and scroll reveals, with reduced-motion support.
- Index-to-Silpacheep navigation and return links.
- GT Ultra Median and Athiti typography on the Silpacheep page.

Spreadsheet edits are not synchronized automatically. Current content is stored in the HTML.

## Deploy

The existing Vercel project `ammilyprain` publishes the GitHub `main` branch to www.ammilyprain.com. `vercel.json` runs the dependency-free build and publishes `dist`.

The Nakhon Phanom page uses the supplied SVG artwork. The eight decorative motifs at the bottom loop through the original Figma opacity sequence every 4.748088 seconds; reduced-motion visitors see all motifs without animation. The build verifies the original file before adding animation wrappers and CSS; it leaves the artwork paths and their order unchanged. Subsequent Figma edits are not synchronized automatically. The SVG is 59.8 MB before HTTP compression. Keep all eight source parts together; do not edit them independently. The generated `dist/assets/nakhon-phanom/project.svg` is intentionally excluded from Git.

The older Sites configuration remains in `.openai/hosting.json` for reference.
