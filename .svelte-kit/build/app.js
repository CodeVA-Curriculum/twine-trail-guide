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
			file: assets + "/_app/start-732e6b3d.js",
			css: [assets + "/_app/assets/start-61d1577b.css",assets + "/_app/assets/vendor-ec9510ad.css"],
			js: [assets + "/_app/start-732e6b3d.js",assets + "/_app/chunks/vendor-7717ecd8.js",assets + "/_app/chunks/preload-helper-ec9aa979.js",assets + "/_app/chunks/singletons-12a22614.js",assets + "/_app/chunks/paths-28a87002.js"]
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
	assets: [{"file":"favicon.png","size":1571,"type":"image/png"},{"file":"images/branching-path.png","size":19028,"type":"image/png"},{"file":"images/default-story.png","size":25332,"type":"image/png"},{"file":"images/delay-append-demo.gif","size":33008,"type":"image/gif"},{"file":"images/delay-text-demo.gif","size":29210,"type":"image/gif"},{"file":"images/delete-passage.png","size":20096,"type":"image/png"},{"file":"images/intro-passage.png","size":21415,"type":"image/png"},{"file":"images/linked-passages.png","size":12128,"type":"image/png"},{"file":"images/new-branch.png","size":21587,"type":"image/png"},{"file":"images/new-passage.png","size":20826,"type":"image/png"},{"file":"images/passage-editor.png","size":13355,"type":"image/png"},{"file":"images/passage-hover.png","size":10390,"type":"image/png"},{"file":"images/planning.png","size":1271038,"type":"image/png"},{"file":"images/play-button.png","size":25809,"type":"image/png"},{"file":"images/publish-to-file.png","size":25768,"type":"image/png"},{"file":"images/second-passage.png","size":20561,"type":"image/png"},{"file":"images/soundcloud-file-select.png","size":23166,"type":"image/png"},{"file":"images/soundcloud-rss.gif","size":41488,"type":"image/gif"},{"file":"images/soundcloud-upload.png","size":7441,"type":"image/png"},{"file":"images/twine-add-story.png","size":18123,"type":"image/png"},{"file":"images/twine-audio-load.png","size":11006,"type":"image/png"},{"file":"images/twine-chapbook.png","size":92036,"type":"image/png"},{"file":"images/twine-format.png","size":48103,"type":"image/png"},{"file":"images/twine-go-home.png","size":31293,"type":"image/png"},{"file":"images/twine-home.png","size":1215028,"type":"image/png"},{"file":"images/twine-new-story.png","size":51453,"type":"image/png"},{"file":"images/twine-select-story.png","size":10907,"type":"image/png"},{"file":"images/two-passages.png","size":10248,"type":"image/png"},{"file":"robots.txt","size":67,"type":"text/plain"},{"file":"twine-map/LICENSE","size":7048,"type":null},{"file":"twine-map/README.adoc","size":0,"type":null},{"file":"twine-map/locations.rec","size":0,"type":null},{"file":"twine-map/trails.rec","size":892,"type":null}],
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
						pattern: /^\/locations\/primary-documents-landmark\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/primary-documents-landmark.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/oral-history-landmark\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/oral-history-landmark.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/hosting-recordings\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/hosting-recordings.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/making-recordings\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/making-recordings.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/image-formatting\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/image-formatting.md"],
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
						pattern: /^\/locations\/adding-images\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/adding-images.md"],
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
						pattern: /^\/locations\/reveal-text\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/reveal-text.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/delay-text\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/delay-text.md"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/locations\/add-audio\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/add-audio.md"],
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
						pattern: /^\/trails\/primary-documents\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/trails/__layout.svelte", "src/routes/trails/primary-documents.md"],
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
						pattern: /^\/trails\/oral-history\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/trails/__layout.svelte", "src/routes/trails/oral-history.md"],
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
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),"src/routes/__error.svelte": () => import("../../src/routes/__error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte"),"src/routes/locations/__layout.svelte": () => import("../../src/routes/locations/__layout.svelte"),"src/routes/locations/index.svelte": () => import("../../src/routes/locations/index.svelte"),"src/routes/locations/story-with-multiple-endings.md": () => import("../../src/routes/locations/story-with-multiple-endings.md"),"src/routes/locations/primary-documents-landmark.md": () => import("../../src/routes/locations/primary-documents-landmark.md"),"src/routes/locations/oral-history-landmark.md": () => import("../../src/routes/locations/oral-history-landmark.md"),"src/routes/locations/hosting-recordings.md": () => import("../../src/routes/locations/hosting-recordings.md"),"src/routes/locations/making-recordings.md": () => import("../../src/routes/locations/making-recordings.md"),"src/routes/locations/image-formatting.md": () => import("../../src/routes/locations/image-formatting.md"),"src/routes/locations/branching-paths.md": () => import("../../src/routes/locations/branching-paths.md"),"src/routes/locations/create-passage.md": () => import("../../src/routes/locations/create-passage.md"),"src/routes/locations/adding-images.md": () => import("../../src/routes/locations/adding-images.md"),"src/routes/locations/link-passages.md": () => import("../../src/routes/locations/link-passages.md"),"src/routes/locations/start-a-story.md": () => import("../../src/routes/locations/start-a-story.md"),"src/routes/locations/reveal-text.md": () => import("../../src/routes/locations/reveal-text.md"),"src/routes/locations/delay-text.md": () => import("../../src/routes/locations/delay-text.md"),"src/routes/locations/add-audio.md": () => import("../../src/routes/locations/add-audio.md"),"src/routes/trails/__layout.svelte": () => import("../../src/routes/trails/__layout.svelte"),"src/routes/trails/index.svelte": () => import("../../src/routes/trails/index.svelte"),"src/routes/trails/primary-documents.md": () => import("../../src/routes/trails/primary-documents.md"),"src/routes/trails/your-first-story.md": () => import("../../src/routes/trails/your-first-story.md"),"src/routes/trails/oral-history.md": () => import("../../src/routes/trails/oral-history.md"),"src/routes/about.md": () => import("../../src/routes/about.md")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"pages/__layout.svelte-9179bb48.js","css":["assets/pages/__layout.svelte-3ae29d7b.css","assets/vendor-ec9510ad.css"],"js":["pages/__layout.svelte-9179bb48.js","chunks/vendor-7717ecd8.js"],"styles":[]},"src/routes/__error.svelte":{"entry":"pages/__error.svelte-34388c13.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/__error.svelte-34388c13.js","chunks/vendor-7717ecd8.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/index.svelte":{"entry":"pages/index.svelte-c0982060.js","css":["assets/pages/index.svelte-133c1041.css","assets/vendor-ec9510ad.css"],"js":["pages/index.svelte-c0982060.js","chunks/vendor-7717ecd8.js","chunks/Nav-dc8ee0c5.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/__layout.svelte":{"entry":"pages/locations/__layout.svelte-81df4b13.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/locations/__layout.svelte-81df4b13.js","chunks/vendor-7717ecd8.js","chunks/Nav-dc8ee0c5.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/index.svelte":{"entry":"pages/locations/index.svelte-4d52b0e3.js","css":["assets/pages/locations/index.svelte-9d04a8a6.css","assets/vendor-ec9510ad.css"],"js":["pages/locations/index.svelte-4d52b0e3.js","chunks/preload-helper-ec9aa979.js","chunks/vendor-7717ecd8.js","chunks/paths-28a87002.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"],"styles":[]},"src/routes/locations/story-with-multiple-endings.md":{"entry":"pages/locations/story-with-multiple-endings.md-30701894.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/story-with-multiple-endings.md-30701894.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/primary-documents-landmark.md":{"entry":"pages/locations/primary-documents-landmark.md-6f9a8bc9.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/primary-documents-landmark.md-6f9a8bc9.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/oral-history-landmark.md":{"entry":"pages/locations/oral-history-landmark.md-60a4ce56.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/oral-history-landmark.md-60a4ce56.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/hosting-recordings.md":{"entry":"pages/locations/hosting-recordings.md-00d348e3.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/hosting-recordings.md-00d348e3.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/making-recordings.md":{"entry":"pages/locations/making-recordings.md-1452dead.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/making-recordings.md-1452dead.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/image-formatting.md":{"entry":"pages/locations/image-formatting.md-edaae63f.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/image-formatting.md-edaae63f.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/branching-paths.md":{"entry":"pages/locations/branching-paths.md-603ee54f.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/branching-paths.md-603ee54f.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/create-passage.md":{"entry":"pages/locations/create-passage.md-1b93ecdf.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/create-passage.md-1b93ecdf.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/adding-images.md":{"entry":"pages/locations/adding-images.md-d9f544ae.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/adding-images.md-d9f544ae.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/link-passages.md":{"entry":"pages/locations/link-passages.md-f4d5bb96.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/link-passages.md-f4d5bb96.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/start-a-story.md":{"entry":"pages/locations/start-a-story.md-24fa0d78.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/start-a-story.md-24fa0d78.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/reveal-text.md":{"entry":"pages/locations/reveal-text.md-d761c931.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/reveal-text.md-d761c931.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/delay-text.md":{"entry":"pages/locations/delay-text.md-6f811c9e.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/delay-text.md-6f811c9e.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/locations/add-audio.md":{"entry":"pages/locations/add-audio.md-551a8804.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Standalone-ec789132.css"],"js":["pages/locations/add-audio.md-551a8804.js","chunks/vendor-7717ecd8.js","chunks/Standalone-3bb057b2.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/trails/__layout.svelte":{"entry":"pages/trails/__layout.svelte-26e81ed8.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/trails/__layout.svelte-26e81ed8.js","chunks/vendor-7717ecd8.js","chunks/Nav-dc8ee0c5.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/trails/index.svelte":{"entry":"pages/trails/index.svelte-fd478955.js","css":["assets/pages/trails/index.svelte-ecbc8621.css","assets/vendor-ec9510ad.css"],"js":["pages/trails/index.svelte-fd478955.js","chunks/preload-helper-ec9aa979.js","chunks/vendor-7717ecd8.js","chunks/paths-28a87002.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"],"styles":[]},"src/routes/trails/primary-documents.md":{"entry":"pages/trails/primary-documents.md-3d2a8d9d.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Trail-a9d0542f.css"],"js":["pages/trails/primary-documents.md-3d2a8d9d.js","chunks/vendor-7717ecd8.js","chunks/Trail-6cc2787f.js","chunks/preload-helper-ec9aa979.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/trails/your-first-story.md":{"entry":"pages/trails/your-first-story.md-efc9ff0d.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Trail-a9d0542f.css"],"js":["pages/trails/your-first-story.md-efc9ff0d.js","chunks/vendor-7717ecd8.js","chunks/Trail-6cc2787f.js","chunks/preload-helper-ec9aa979.js","chunks/paths-28a87002.js","chunks/components-7107bac2.js"],"styles":[]},"src/routes/trails/oral-history.md":{"entry":"pages/trails/oral-history.md-4bcb5e50.js","css":["assets/LocationNode.svelte_svelte&type=style&lang-74364a12.css","assets/vendor-ec9510ad.css","assets/Trail-a9d0542f.css"],"js":["pages/trails/oral-history.md-4bcb5e50.js","chunks/vendor-7717ecd8.js","chunks/Trail-6cc2787f.js","chunks/preload-helper-ec9aa979.js","chunks/components-7107bac2.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/about.md":{"entry":"pages/about.md-151ed956.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/about.md-151ed956.js","chunks/vendor-7717ecd8.js","chunks/Nav-dc8ee0c5.js","chunks/paths-28a87002.js"],"styles":[]}};

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