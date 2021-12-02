const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/locations/__layout.svelte"),
	() => import("../../../src/routes/locations/index.svelte"),
	() => import("../../../src/routes/locations/story-with-multiple-endings.md"),
	() => import("../../../src/routes/locations/branching-paths.md"),
	() => import("../../../src/routes/locations/create-passage.md"),
	() => import("../../../src/routes/locations/link-passages.md"),
	() => import("../../../src/routes/locations/start-a-story.md"),
	() => import("../../../src/routes/trails/__layout.svelte"),
	() => import("../../../src/routes/trails/index.svelte"),
	() => import("../../../src/routes/trails/your-first-story.md"),
	() => import("../../../src/routes/trails/[trail].svelte"),
	() => import("../../../src/routes/about.md")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/locations/index.svelte
	[/^\/locations\/?$/, [c[0], c[3], c[4]], [c[1]]],

	// src/routes/locations/story-with-multiple-endings.md
	[/^\/locations\/story-with-multiple-endings\/?$/, [c[0], c[3], c[5]], [c[1]]],

	// src/routes/locations/branching-paths.md
	[/^\/locations\/branching-paths\/?$/, [c[0], c[3], c[6]], [c[1]]],

	// src/routes/locations/create-passage.md
	[/^\/locations\/create-passage\/?$/, [c[0], c[3], c[7]], [c[1]]],

	// src/routes/locations/link-passages.md
	[/^\/locations\/link-passages\/?$/, [c[0], c[3], c[8]], [c[1]]],

	// src/routes/locations/start-a-story.md
	[/^\/locations\/start-a-story\/?$/, [c[0], c[3], c[9]], [c[1]]],

	// src/routes/trails/index.svelte
	[/^\/trails\/?$/, [c[0], c[10], c[11]], [c[1]]],

	// src/routes/trails/your-first-story.md
	[/^\/trails\/your-first-story\/?$/, [c[0], c[10], c[12]], [c[1]]],

	// src/routes/trails/[trail].svelte
	[/^\/trails\/([^/]+?)\/?$/, [c[0], c[10], c[13]], [c[1]], (m) => ({ trail: d(m[1])})],

	// src/routes/about.md
	[/^\/about\/?$/, [c[0], c[14]], [c[1]]],

	,

	,

	
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];