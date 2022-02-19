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
			file: assets + "/_app/start-5cfcc8a2.js",
			css: [assets + "/_app/assets/start-61d1577b.css",assets + "/_app/assets/vendor-ec9510ad.css"],
			js: [assets + "/_app/start-5cfcc8a2.js",assets + "/_app/chunks/vendor-990f095f.js",assets + "/_app/chunks/preload-helper-ec9aa979.js",assets + "/_app/chunks/singletons-12a22614.js",assets + "/_app/chunks/paths-28a87002.js"]
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
	assets: [{"file":"favicon.png","size":1571,"type":"image/png"},{"file":"images/branching-path.png","size":19028,"type":"image/png"},{"file":"images/default-story.png","size":25332,"type":"image/png"},{"file":"images/delay-append-demo.gif","size":33008,"type":"image/gif"},{"file":"images/delay-text-demo.gif","size":29210,"type":"image/gif"},{"file":"images/delete-passage.png","size":20096,"type":"image/png"},{"file":"images/image-link.png","size":53991,"type":"image/png"},{"file":"images/intro-passage.png","size":21415,"type":"image/png"},{"file":"images/linked-passages.png","size":12128,"type":"image/png"},{"file":"images/new-branch.png","size":21587,"type":"image/png"},{"file":"images/new-passage.png","size":20826,"type":"image/png"},{"file":"images/passage-editor.png","size":13355,"type":"image/png"},{"file":"images/passage-hover.png","size":10390,"type":"image/png"},{"file":"images/planning.png","size":1271038,"type":"image/png"},{"file":"images/play-button.png","size":25809,"type":"image/png"},{"file":"images/publish-to-file.png","size":25768,"type":"image/png"},{"file":"images/second-passage.png","size":20561,"type":"image/png"},{"file":"images/soundcloud-file-select.png","size":23166,"type":"image/png"},{"file":"images/soundcloud-rss.gif","size":41488,"type":"image/gif"},{"file":"images/soundcloud-upload.png","size":7441,"type":"image/png"},{"file":"images/twine-add-story.png","size":18123,"type":"image/png"},{"file":"images/twine-audio-load.png","size":11006,"type":"image/png"},{"file":"images/twine-chapbook.png","size":92036,"type":"image/png"},{"file":"images/twine-edit-stylesheet.png","size":25845,"type":"image/png"},{"file":"images/twine-format.png","size":48103,"type":"image/png"},{"file":"images/twine-go-home.png","size":31293,"type":"image/png"},{"file":"images/twine-home.png","size":1215028,"type":"image/png"},{"file":"images/twine-image-column.png","size":214197,"type":"image/png"},{"file":"images/twine-image-full.png","size":518637,"type":"image/png"},{"file":"images/twine-image-half.png","size":180114,"type":"image/png"},{"file":"images/twine-image.png","size":107979,"type":"image/png"},{"file":"images/twine-new-story.png","size":51453,"type":"image/png"},{"file":"images/twine-red-text-style.png","size":100045,"type":"image/png"},{"file":"images/twine-reveal-link.gif","size":82981,"type":"image/gif"},{"file":"images/twine-reveal-passage.gif","size":130115,"type":"image/gif"},{"file":"images/twine-select-story.png","size":10907,"type":"image/png"},{"file":"images/two-passages-reveal.png","size":9112,"type":"image/png"},{"file":"images/two-passages.png","size":10248,"type":"image/png"},{"file":"images/unsplash-link.png","size":89889,"type":"image/png"},{"file":"images/unsplash-share.png","size":3042,"type":"image/png"},{"file":"robots.txt","size":67,"type":"text/plain"},{"file":"twine-map/LICENSE","size":7048,"type":null},{"file":"twine-map/README.adoc","size":0,"type":null},{"file":"twine-map/locations.rec","size":0,"type":null},{"file":"twine-map/trails.rec","size":892,"type":null}],
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

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"pages/__layout.svelte-8c94bbb9.js","css":["assets/pages/__layout.svelte-3ae29d7b.css","assets/vendor-ec9510ad.css"],"js":["pages/__layout.svelte-8c94bbb9.js","chunks/vendor-990f095f.js"],"styles":[]},"src/routes/__error.svelte":{"entry":"pages/__error.svelte-481c1bc6.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/__error.svelte-481c1bc6.js","chunks/vendor-990f095f.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/index.svelte":{"entry":"pages/index.svelte-458fd5a1.js","css":["assets/pages/index.svelte-133c1041.css","assets/vendor-ec9510ad.css"],"js":["pages/index.svelte-458fd5a1.js","chunks/vendor-990f095f.js","chunks/Nav-a092c854.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/__layout.svelte":{"entry":"pages/locations/__layout.svelte-205c0807.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/locations/__layout.svelte-205c0807.js","chunks/vendor-990f095f.js","chunks/Nav-a092c854.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/locations/index.svelte":{"entry":"pages/locations/index.svelte-96970845.js","css":["assets/pages/locations/index.svelte-858b530f.css","assets/vendor-ec9510ad.css"],"js":["pages/locations/index.svelte-96970845.js","chunks/preload-helper-ec9aa979.js","chunks/vendor-990f095f.js","chunks/paths-28a87002.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"],"styles":[]},"src/routes/locations/story-with-multiple-endings.md":{"entry":"pages/locations/story-with-multiple-endings.md-fef1994d.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/story-with-multiple-endings.md-fef1994d.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/primary-documents-landmark.md":{"entry":"pages/locations/primary-documents-landmark.md-fe5b6f61.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/primary-documents-landmark.md-fe5b6f61.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/oral-history-landmark.md":{"entry":"pages/locations/oral-history-landmark.md-ac725fd9.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/oral-history-landmark.md-ac725fd9.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/hosting-recordings.md":{"entry":"pages/locations/hosting-recordings.md-1fef1992.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/hosting-recordings.md-1fef1992.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/making-recordings.md":{"entry":"pages/locations/making-recordings.md-b7a303c9.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/making-recordings.md-b7a303c9.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js"],"styles":[]},"src/routes/locations/image-formatting.md":{"entry":"pages/locations/image-formatting.md-4a683497.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/image-formatting.md-4a683497.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/branching-paths.md":{"entry":"pages/locations/branching-paths.md-0a078793.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/branching-paths.md-0a078793.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/create-passage.md":{"entry":"pages/locations/create-passage.md-973d1f7c.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/create-passage.md-973d1f7c.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/adding-images.md":{"entry":"pages/locations/adding-images.md-66f5ee45.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/adding-images.md-66f5ee45.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/link-passages.md":{"entry":"pages/locations/link-passages.md-55aa2d71.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/link-passages.md-55aa2d71.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/start-a-story.md":{"entry":"pages/locations/start-a-story.md-d7524ac2.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/start-a-story.md-d7524ac2.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/reveal-text.md":{"entry":"pages/locations/reveal-text.md-0925ae82.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/reveal-text.md-0925ae82.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/delay-text.md":{"entry":"pages/locations/delay-text.md-d5bea501.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/delay-text.md-d5bea501.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/locations/add-audio.md":{"entry":"pages/locations/add-audio.md-56988907.js","css":["assets/vendor-ec9510ad.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/locations/add-audio.md-56988907.js","chunks/vendor-990f095f.js","chunks/Standalone-f5378a1c.js","chunks/paths-28a87002.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/trails/__layout.svelte":{"entry":"pages/trails/__layout.svelte-285ee198.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/trails/__layout.svelte-285ee198.js","chunks/vendor-990f095f.js","chunks/Nav-a092c854.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/trails/index.svelte":{"entry":"pages/trails/index.svelte-7037b601.js","css":["assets/pages/trails/index.svelte-a08cb05e.css","assets/vendor-ec9510ad.css"],"js":["pages/trails/index.svelte-7037b601.js","chunks/preload-helper-ec9aa979.js","chunks/vendor-990f095f.js","chunks/paths-28a87002.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"],"styles":[]},"src/routes/trails/primary-documents.md":{"entry":"pages/trails/primary-documents.md-534207d8.js","css":["assets/vendor-ec9510ad.css","assets/Trail-2c81f256.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/trails/primary-documents.md-534207d8.js","chunks/vendor-990f095f.js","chunks/Trail-8af5629b.js","chunks/preload-helper-ec9aa979.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/paths-28a87002.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/trails/your-first-story.md":{"entry":"pages/trails/your-first-story.md-fa3fb2fc.js","css":["assets/vendor-ec9510ad.css","assets/Trail-2c81f256.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/trails/your-first-story.md-fa3fb2fc.js","chunks/vendor-990f095f.js","chunks/Trail-8af5629b.js","chunks/preload-helper-ec9aa979.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/paths-28a87002.js","chunks/components-feb42a3e.js"],"styles":[]},"src/routes/trails/oral-history.md":{"entry":"pages/trails/oral-history.md-060a3f43.js","css":["assets/vendor-ec9510ad.css","assets/Trail-2c81f256.css","assets/Standalone.svelte_svelte&type=style&lang-515e4cd1.css"],"js":["pages/trails/oral-history.md-060a3f43.js","chunks/vendor-990f095f.js","chunks/Trail-8af5629b.js","chunks/preload-helper-ec9aa979.js","chunks/Standalone.svelte_svelte&type=style&lang-d82c9fda.js","chunks/components-feb42a3e.js","chunks/paths-28a87002.js"],"styles":[]},"src/routes/about.md":{"entry":"pages/about.md-77f3fb45.js","css":["assets/vendor-ec9510ad.css"],"js":["pages/about.md-77f3fb45.js","chunks/vendor-990f095f.js","chunks/Nav-a092c854.js","chunks/paths-28a87002.js"],"styles":[]}};

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