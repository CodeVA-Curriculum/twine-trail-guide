const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/locations/index.svelte"),
	() => import("../../../src/routes/locations/demo.svelte"),
	() => import("../../../src/routes/trails/__layout.svelte"),
	() => import("../../../src/routes/trails/index.svelte"),
	() => import("../../../src/routes/trails/trail-demo.svelte"),
	() => import("../../../src/routes/trails/[trail].svelte"),
	() => import("../../../src/routes/about.md"),
	() => import("../../../src/routes/map/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/locations/index.svelte
	[/^\/locations\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/locations/demo.svelte
	[/^\/locations\/demo\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/trails/index.svelte
	[/^\/trails\/?$/, [c[0], c[5], c[6]], [c[1]]],

	// src/routes/trails/trail-demo.svelte
	[/^\/trails\/trail-demo\/?$/, [c[0], c[5], c[7]], [c[1]]],

	// src/routes/trails/[trail].svelte
	[/^\/trails\/([^/]+?)\/?$/, [c[0], c[5], c[8]], [c[1]], (m) => ({ trail: d(m[1])})],

	// src/routes/about.md
	[/^\/about\/?$/, [c[0], c[9]], [c[1]]],

	,

	,

	// src/routes/map/index.svelte
	[/^\/map\/?$/, [c[0], c[10]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];