const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/locations/__layout.svelte"),
	() => import("../../../src/routes/locations/index.svelte"),
	() => import("../../../src/routes/locations/story-with-multiple-endings.md"),
	() => import("../../../src/routes/locations/primary-documents-landmark.md"),
	() => import("../../../src/routes/locations/oral-history-landmark.md"),
	() => import("../../../src/routes/locations/hosting-recordings.md"),
	() => import("../../../src/routes/locations/making-recordings.md"),
	() => import("../../../src/routes/locations/image-formatting.md"),
	() => import("../../../src/routes/locations/branching-paths.md"),
	() => import("../../../src/routes/locations/create-passage.md"),
	() => import("../../../src/routes/locations/adding-images.md"),
	() => import("../../../src/routes/locations/link-passages.md"),
	() => import("../../../src/routes/locations/start-a-story.md"),
	() => import("../../../src/routes/locations/reveal-text.md"),
	() => import("../../../src/routes/locations/delay-text.md"),
	() => import("../../../src/routes/locations/add-audio.md"),
	() => import("../../../src/routes/trails/__layout.svelte"),
	() => import("../../../src/routes/trails/index.svelte"),
	() => import("../../../src/routes/trails/primary-documents.md"),
	() => import("../../../src/routes/trails/conversation-web.md"),
	() => import("../../../src/routes/trails/your-first-story.md"),
	() => import("../../../src/routes/trails/oral-history.md"),
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

	// src/routes/locations/primary-documents-landmark.md
	[/^\/locations\/primary-documents-landmark\/?$/, [c[0], c[3], c[6]], [c[1]]],

	// src/routes/locations/oral-history-landmark.md
	[/^\/locations\/oral-history-landmark\/?$/, [c[0], c[3], c[7]], [c[1]]],

	// src/routes/locations/hosting-recordings.md
	[/^\/locations\/hosting-recordings\/?$/, [c[0], c[3], c[8]], [c[1]]],

	// src/routes/locations/making-recordings.md
	[/^\/locations\/making-recordings\/?$/, [c[0], c[3], c[9]], [c[1]]],

	// src/routes/locations/image-formatting.md
	[/^\/locations\/image-formatting\/?$/, [c[0], c[3], c[10]], [c[1]]],

	// src/routes/locations/branching-paths.md
	[/^\/locations\/branching-paths\/?$/, [c[0], c[3], c[11]], [c[1]]],

	// src/routes/locations/create-passage.md
	[/^\/locations\/create-passage\/?$/, [c[0], c[3], c[12]], [c[1]]],

	// src/routes/locations/adding-images.md
	[/^\/locations\/adding-images\/?$/, [c[0], c[3], c[13]], [c[1]]],

	// src/routes/locations/link-passages.md
	[/^\/locations\/link-passages\/?$/, [c[0], c[3], c[14]], [c[1]]],

	// src/routes/locations/start-a-story.md
	[/^\/locations\/start-a-story\/?$/, [c[0], c[3], c[15]], [c[1]]],

	// src/routes/locations/reveal-text.md
	[/^\/locations\/reveal-text\/?$/, [c[0], c[3], c[16]], [c[1]]],

	// src/routes/locations/delay-text.md
	[/^\/locations\/delay-text\/?$/, [c[0], c[3], c[17]], [c[1]]],

	// src/routes/locations/add-audio.md
	[/^\/locations\/add-audio\/?$/, [c[0], c[3], c[18]], [c[1]]],

	// src/routes/trails/index.svelte
	[/^\/trails\/?$/, [c[0], c[19], c[20]], [c[1]]],

	// src/routes/trails/primary-documents.md
	[/^\/trails\/primary-documents\/?$/, [c[0], c[19], c[21]], [c[1]]],

	// src/routes/trails/conversation-web.md
	[/^\/trails\/conversation-web\/?$/, [c[0], c[19], c[22]], [c[1]]],

	// src/routes/trails/your-first-story.md
	[/^\/trails\/your-first-story\/?$/, [c[0], c[19], c[23]], [c[1]]],

	// src/routes/trails/oral-history.md
	[/^\/trails\/oral-history\/?$/, [c[0], c[19], c[24]], [c[1]]],

	// src/routes/about.md
	[/^\/about\/?$/, [c[0], c[25]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];