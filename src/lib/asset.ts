// Prefixes a public asset path with the deployment base path so plain <img>
// and other absolute URLs resolve correctly when the site is served from a
// sub-path (e.g. GitHub Pages at /hawassa-riverside).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string) => `${BASE}${path}`;
