import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';

// Preserve the supplied Figma SVG byte for byte. GitHub's connected upload API
// cannot accept the complete 59.8 MB artwork in one request, so source control
// stores eight ordered parts. Only the assembled SVG goes into the website.
const source = new URL('../source-assets/nakhon-phanom/', import.meta.url);
const output = new URL('../dist/assets/nakhon-phanom/', import.meta.url);
const parts = [];
for (let i = 0; i < 8; i++) {
  parts.push(await readFile(new URL(`project.svg.part${String(i).padStart(2, '0')}`, source)));
}
const artwork = Buffer.concat(parts);
const digest = createHash('sha256').update(artwork).digest('hex');
if (artwork.length !== 59820199 || digest !== 'b0c29de1b31bc032785ac2ea8e2562cb8187a00cc9367ca36a4792ecf34784df') {
  throw new Error('Nakhon Phanom artwork is incomplete or changed. Verify all eight source parts.');
}
await mkdir(output, { recursive: true });
await writeFile(new URL('project.svg', output), artwork);
console.log(`Verified and assembled Nakhon Phanom artwork (${artwork.length} bytes). Website: dist/`);
