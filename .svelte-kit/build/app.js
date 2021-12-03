import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths, assets } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"/twine-trail-guide","assets":""} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	const hooks = get_hooks(user_hooks);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: assets + "/_app/start-b64affc7.js",
			css: [assets + "/_app/assets/start-61d1577b.css",assets + "/_app/assets/vendor-ec9510ad.css"],
			js: [assets + "/_app/start-b64affc7.js",assets + "/_app/chunks/vendor-7f52b8a8.js",assets + "/_app/chunks/preload-helper-b1093eef.js",assets + "/_app/chunks/singletons-12a22614.js",assets + "/_app/chunks/paths-28a87002.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => assets + "/_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: (error, request) => {
			hooks.handleError({ error, request });
			error.stack = options.get_stack(error);
		},
		hooks,
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		prerender: true,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

// input has already been decoded by decodeURI
// now handle the rest that decodeURIComponent would do
const d = s => s
	.replace(/%23/g, '#')
	.replace(/%3[Bb]/g, ';')
	.replace(/%2[Cc]/g, ',')
	.replace(/%2[Ff]/g, '/')
	.replace(/%3[Ff]/g, '?')
	.replace(/%3[Aa]/g, ':')
	.replace(/%40/g, '@')
	.replace(/%26/g, '&')
	.replace(/%3[Dd]/g, '=')
	.replace(/%2[Bb]/g, '+')
	.replace(/%24/g, '$');

const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon.png","size":1571,"type":"image/png"},{"file":"images/branching-path.png","size":19028,"type":"image/png"},{"file":"images/default-story.png","size":25332,"type":"image/png"},{"file":"images/delete-passage.png","size":20096,"type":"image/png"},{"file":"images/intro-passage.png","size":21415,"type":"image/png"},{"file":"images/linked-passages.png","size":12128,"type":"image/png"},{"file":"images/new-branch.png","size":21587,"type":"image/png"},{"file":"images/new-passage.png","size":20826,"type":"image/png"},{"file":"images/passage-editor.png","size":13355,"type":"image/png"},{"file":"images/passage-hover.png","size":10390,"type":"image/png"},{"file":"images/planning.png","size":1271038,"type":"image/png"},{"file":"images/play-button.png","size":25809,"type":"image/png"},{"file":"images/publish-to-file.png","size":25768,"type":"image/png"},{"file":"images/second-passage.png","size":20561,"type":"image/png"},{"file":"images/twine-add-story.png","size":18123,"type":"image/png"},{"file":"images/twine-chapbook.png","size":92036,"type":"image/png"},{"file":"images/twine-format.png","size":48103,"type":"image/png"},{"file":"images/twine-go-home.png","size":31293,"type":"image/png"},{"file":"images/twine-home.png","size":1215028,"type":"image/png"},{"file":"images/twine-new-story.png","size":51453,"type":"image/png"},{"file":"images/twine-select-story.png","size":10907,"type":"image/png"},{"file":"images/two-passages.png","size":10248,"type":"image/png"},{"file":"robots.txt","size":67,"type":"text/plain"},{"file":"twine-map/LICENSE","size":7048,"type":null},{"file":"twine-map/README.adoc","size":0,"type":null},{"file":"twine-map/locations.rec","size":0,"type":null},{"file":"twine-map/trails.rec","size":892,"type":null}],
	layout: "src/routes/__layout.svelte",
	error: "src/routes/__error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/index.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/story-with-multiple-endings\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/story-with-multiple-endings.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/branching-paths\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/branching-paths.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/create-passage\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/create-passage.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/link-passages\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/link-passages.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/start-a-story\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/start-a-story.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/trails\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/trails/__layout.svelte", "src/routes/trails/index.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/trails\/your-first-story\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/trails/__layout.svelte", "src/routes/trails/your-first-story.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/about\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/about.md"],
						b: ["src/routes/__error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	handleError: hooks.handleError || (({ error }) => console.error(error.stack)),
	externalFetch: hooks.externalFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),"src/routes/__error.svelte": () => import("../../src/routes/__error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte"),"src/routes/locations/__layout.svelte": () => import("../../src/routes/locations/__layout.svelte"),"src/routes/locations/index.svelte": () => import("../../src/routes/locations/index.svelte"),"src/routes/locations/story-with-multiple-endings.md": () => import("../../src/routes/locations/story-with-multiple-endings.md"),"src/routes/locations/branching-paths.md": () => import("../../src/routes/locations/branching-paths.md"),"src/routes/locations/create-passage.md": () => import("../../src/routes/locations/create-passage.md"),"src/routes/locations/link-passages.md": () => import("../../src/routes/locations/link-passages.md"),"src/routes/locations/start-a-story.md": () => import("../../src/routes/locations/start-a-story.md"),"src/routes/trails/__layout.svelte": () => import("../../src/routes/trails/__layout.svelte"),"src/routes/trails/index.svelte": () => import("../../src/routes/trails/index.svelte"),"src/routes/trails/your-first-story.md": () => import("../../src/routes/trails/your-first-story.md"),"src/routes/about.md": () => import("../../src/routes/about.md")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"pages/__layout.svelte-8c31879f.js","css":["assets/pages/__layout.svelte-3ae29d7b.css","assets/vendor-ec9510ad.css"],"js":["pages/__layout.svelte-8c31879f.js","chunks/vendor-7f52b8a8.js"],"styles":[]},"src/routes/__error.svelte":{"entry":"pages/__error.svelte-bfc5fcb1.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/__error.svelte-bfc5fcb1.js","chunks/vendor-7f52b8a8.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/index.svelte":{"entry":"pages/index.svelte-9db3bc97.js","css":["assets/pages/index.svelte-133c1041.css","assets/vendor-ec9510ad.css"],"js":["pages/index.svelte-9db3bc97.js","chunks/vendor-7f52b8a8.js","chunks/Nav-fbf9f809.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/__layout.svelte":{"entry":"pages/locations/__layout.svelte-6144a5b1.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/locations/__layout.svelte-6144a5b1.js","chunks/vendor-7f52b8a8.js","chunks/Nav-fbf9f809.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/index.svelte":{"entry":"pages/locations/index.svelte-f6d3ab12.js","css":["assets/pages/locations/index.svelte-9d04a8a6.css","assets/vendor-ec9510ad.css"],"js":["pages/locations/index.svelte-f6d3ab12.js","chunks/preload-helper-b1093eef.js","chunks/vendor-7f52b8a8.js","chunks/paths-28a87002.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"],"styles":[]},"src/routes/locations/story-with-multiple-endings.md":{"entry":"pages/locations/story-with-multiple-endings.md-57cb084e.js","css":["assets/vendor-ec9510ad.css","assets/Standalone-f63679d0.css"],"js":["pages/locations/story-with-multiple-endings.md-57cb084e.js","chunks/vendor-7f52b8a8.js","chunks/Standalone-9fd73395.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/branching-paths.md":{"entry":"pages/locations/branching-paths.md-212a2057.js","css":["assets/vendor-ec9510ad.css","assets/Standalone-f63679d0.css"],"js":["pages/locations/branching-paths.md-212a2057.js","chunks/vendor-7f52b8a8.js","chunks/Standalone-9fd73395.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/create-passage.md":{"entry":"pages/locations/create-passage.md-da18b7b5.js","css":["assets/vendor-ec9510ad.css","assets/Standalone-f63679d0.css"],"js":["pages/locations/create-passage.md-da18b7b5.js","chunks/vendor-7f52b8a8.js","chunks/Standalone-9fd73395.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/link-passages.md":{"entry":"pages/locations/link-passages.md-0570e611.js","css":["assets/vendor-ec9510ad.css","assets/Standalone-f63679d0.css"],"js":["pages/locations/link-passages.md-0570e611.js","chunks/vendor-7f52b8a8.js","chunks/Standalone-9fd73395.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/start-a-story.md":{"entry":"pages/locations/start-a-story.md-61e0f53d.js","css":["assets/vendor-ec9510ad.css","assets/Standalone-f63679d0.css"],"js":["pages/locations/start-a-story.md-61e0f53d.js","chunks/vendor-7f52b8a8.js","chunks/Standalone-9fd73395.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/trails/__layout.svelte":{"entry":"pages/trails/__layout.svelte-f771d0b7.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/trails/__layout.svelte-f771d0b7.js","chunks/vendor-7f52b8a8.js","chunks/Nav-fbf9f809.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/trails/index.svelte":{"entry":"pages/trails/index.svelte-7080c608.js","css":["assets/pages/trails/index.svelte-ecbc8621.css","assets/vendor-ec9510ad.css"],"js":["pages/trails/index.svelte-7080c608.js","chunks/preload-helper-b1093eef.js","chunks/vendor-7f52b8a8.js","chunks/paths-28a87002.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"],"styles":[]},"src/routes/trails/your-first-story.md":{"entry":"pages/trails/your-first-story.md-c0e84246.js","css":["assets/pages/trails/your-first-story.md-3fadfa43.css","assets/vendor-ec9510ad.css"],"js":["pages/trails/your-first-story.md-c0e84246.js","chunks/vendor-7f52b8a8.js","chunks/preload-helper-b1093eef.js"],"styles":[]},"src/routes/about.md":{"entry":"pages/about.md-c8491366.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/about.md-c8491366.js","chunks/vendor-7f52b8a8.js","chunks/Nav-fbf9f809.js","chunks/paths-28a87002.js"],"styles":[]}};

async function load_component(file) {
	const { entry, css, js, styles } = metadata_lookup[file];
	return {
		module: await module_lookup[file](),
		entry: assets + "/_app/" + entry,
		css: css.map(dep => assets + "/_app/" + dep),
		js: js.map(dep => assets + "/_app/" + dep),
		styles
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}