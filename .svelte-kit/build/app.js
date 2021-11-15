import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths, assets } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"","assets":""} };

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
			file: assets + "/_app/start-c15bff19.js",
			css: [assets + "/_app/assets/start-61d1577b.css"],
			js: [assets + "/_app/start-c15bff19.js",assets + "/_app/chunks/vendor-f9fc9992.js",assets + "/_app/chunks/paths-28a87002.js"]
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
	assets: [{"file":"favicon.png","size":1571,"type":"image/png"},{"file":"robots.txt","size":67,"type":"text/plain"},{"file":"twine-map/.git","size":48,"type":null},{"file":"twine-map/LICENSE","size":7048,"type":null},{"file":"twine-map/README.adoc","size":0,"type":null},{"file":"twine-map/locations.rec","size":0,"type":null},{"file":"twine-map/trails.rec","size":892,"type":null}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/create-passage\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/create-passage.md"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/locations\/locations\.json$/,
						params: empty,
						load: () => import("../../src/routes/locations/locations.json.js")
					},
		{
						type: 'page',
						pattern: /^\/locations\/start-a-story\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/start-a-story.md"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/trails\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/trails/__layout.svelte", "src/routes/trails/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/trails\/trail-demo\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/trails/__layout.svelte", "src/routes/trails/trail-demo.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/trails\/([^/]+?)\/?$/,
						params: (m) => ({ trail: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/trails/__layout.svelte", "src/routes/trails/[trail].svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/about\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/about.md"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/api\/trails\/([^/]+?)\/?$/,
						params: (m) => ({ trail: d(m[1])}),
						load: () => import("../../src/routes/api/trails/[trail].js")
					},
		{
						type: 'page',
						pattern: /^\/map\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/map/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
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
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components/error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte"),"src/routes/locations/index.svelte": () => import("../../src/routes/locations/index.svelte"),"src/routes/locations/create-passage.md": () => import("../../src/routes/locations/create-passage.md"),"src/routes/locations/start-a-story.md": () => import("../../src/routes/locations/start-a-story.md"),"src/routes/trails/__layout.svelte": () => import("../../src/routes/trails/__layout.svelte"),"src/routes/trails/index.svelte": () => import("../../src/routes/trails/index.svelte"),"src/routes/trails/trail-demo.svelte": () => import("../../src/routes/trails/trail-demo.svelte"),"src/routes/trails/[trail].svelte": () => import("../../src/routes/trails/[trail].svelte"),"src/routes/about.md": () => import("../../src/routes/about.md"),"src/routes/map/index.svelte": () => import("../../src/routes/map/index.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"pages/__layout.svelte-88b24d20.js","css":[],"js":["pages/__layout.svelte-88b24d20.js","chunks/vendor-f9fc9992.js"],"styles":[]},".svelte-kit/build/components/error.svelte":{"entry":"error.svelte-e1be5e71.js","css":[],"js":["error.svelte-e1be5e71.js","chunks/vendor-f9fc9992.js"],"styles":[]},"src/routes/index.svelte":{"entry":"pages/index.svelte-f5fc8506.js","css":["assets/pages/index.svelte-b1fd161b.css"],"js":["pages/index.svelte-f5fc8506.js","chunks/vendor-f9fc9992.js","chunks/paths-28a87002.js","chunks/Nav-08b0eb70.js"],"styles":[]},"src/routes/locations/index.svelte":{"entry":"pages/locations/index.svelte-9170025d.js","css":[],"js":["pages/locations/index.svelte-9170025d.js","chunks/vendor-f9fc9992.js"],"styles":[]},"src/routes/locations/create-passage.md":{"entry":"pages/locations/create-passage.md-06f1b5ca.js","css":[],"js":["pages/locations/create-passage.md-06f1b5ca.js","chunks/vendor-f9fc9992.js","chunks/MdLayout-5e19fcc0.js","chunks/Nav-08b0eb70.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/start-a-story.md":{"entry":"pages/locations/start-a-story.md-4f406975.js","css":[],"js":["pages/locations/start-a-story.md-4f406975.js","chunks/vendor-f9fc9992.js","chunks/MdLayout-5e19fcc0.js","chunks/Nav-08b0eb70.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/trails/__layout.svelte":{"entry":"pages/trails/__layout.svelte-05814882.js","css":[],"js":["pages/trails/__layout.svelte-05814882.js","chunks/vendor-f9fc9992.js","chunks/Nav-08b0eb70.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/trails/index.svelte":{"entry":"pages/trails/index.svelte-17a2c02e.js","css":["assets/pages/trails/index.svelte-8473b8aa.css"],"js":["pages/trails/index.svelte-17a2c02e.js","chunks/vendor-f9fc9992.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/trails/trail-demo.svelte":{"entry":"pages/trails/trail-demo.svelte-72397e14.js","css":["assets/TrailTimeline-2a350e6f.css"],"js":["pages/trails/trail-demo.svelte-72397e14.js","chunks/vendor-f9fc9992.js","chunks/TrailTimeline-5d71912c.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/trails/[trail].svelte":{"entry":"pages/trails/[trail].svelte-59a54286.js","css":["assets/TrailTimeline-2a350e6f.css"],"js":["pages/trails/[trail].svelte-59a54286.js","chunks/vendor-f9fc9992.js","chunks/paths-28a87002.js","chunks/TrailTimeline-5d71912c.js"],"styles":[]},"src/routes/about.md":{"entry":"pages/about.md-11c5f605.js","css":[],"js":["pages/about.md-11c5f605.js","chunks/vendor-f9fc9992.js","chunks/MdLayout-5e19fcc0.js","chunks/Nav-08b0eb70.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/map/index.svelte":{"entry":"pages/map/index.svelte-a828a820.js","css":[],"js":["pages/map/index.svelte-a828a820.js","chunks/vendor-f9fc9992.js","chunks/Nav-08b0eb70.js","chunks/paths-28a87002.js"],"styles":[]}};

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