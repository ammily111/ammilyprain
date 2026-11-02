// Figma frame 2239:4266: eight sequential opacity tracks, 4748.088 ms.
// These ranges were verified against the original SVG's rendered bounding boxes.
// Group the existing paths without changing their geometry or stacking order.
const tracks = [
  { id: '4270', first: 1596, last: 1601, start: 0, end: 10.531 },
  { id: '4282', first: 1602, last: 1627, start: 12.637, end: 23.167 },
  { id: '4313', first: 1628, last: 1653, start: 25.273, end: 35.804 },
  { id: '4344', first: 1654, last: 1731, start: 37.91, end: 48.441 },
  { id: '4427', first: 1732, last: 1739, start: 50.547, end: 61.077 },
  { id: '4440', first: 1740, last: 1759, start: 63.183, end: 73.714 },
  { id: '4465', first: 1760, last: 1793, start: 75.82, end: 86.351 },
  { id: '4504', first: 1794, last: 1803, start: 88.457, end: 98.987 },
];

export function addNakhonMotion(artwork) {
  const svg = artwork.toString('utf8');
  const elements = [];
  let depth = 0;
  let childStart;
  // The source SHA is checked before this runs. Its SVG attributes contain no
  // literal angle brackets, so scanning tag boundaries leaves all bytes intact.
  for (const match of svg.matchAll(/<[^>]*>/g)) {
    const tag = match[0];
    if (tag.startsWith('</')) {
      depth--;
      if (depth === 2 && childStart !== undefined) {
        elements.push({ start: childStart, end: match.index + tag.length });
        childStart = undefined;
      }
      if (depth === 1) break; // End of the main clipped artwork group.
    } else {
      if (depth === 2) childStart = match.index;
      if (tag.endsWith('/>')) {
        if (depth === 2) {
          elements.push({ start: childStart, end: match.index + tag.length });
          childStart = undefined;
        }
      } else depth++;
    }
  }
  if (elements.length !== 1803) throw new Error('Unexpected SVG layer structure; recheck the motion mapping.');

  const changes = [];
  let css = '';
  for (const track of tracks) {
    changes.push({ at: elements[track.first - 1].start, text: `<g data-motion="${track.id}" data-node-id="2239:${track.id}">` });
    changes.push({ at: elements[track.last - 1].end, text: '</g>' });
    css += `[data-motion="${track.id}"]{animation:reveal-${track.id} 4.748088s linear infinite}`;
    css += `@keyframes reveal-${track.id}{0%{opacity:0}${track.start}%{opacity:0;animation-timing-function:ease-in-out}${track.end}%,100%{opacity:1}}`;
  }
  css += '@media(prefers-reduced-motion:reduce){[data-motion]{animation:none!important;opacity:1!important}}';
  changes.push({ at: svg.indexOf('>') + 1, text: `<style>${css}</style>` });
  changes.sort((a, b) => a.at - b.at);
  let result = '';
  let cursor = 0;
  for (const change of changes) {
    result += svg.slice(cursor, change.at) + change.text;
    cursor = change.at;
  }
  return result + svg.slice(cursor);
}
