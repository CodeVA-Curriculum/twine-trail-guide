import preprocess from "svelte-preprocess";
const dev = process.env.NODE_ENV === 'development';
import adapter from '@sveltejs/adapter-static';
import {mdsvex} from 'mdsvex';
import { join } from "path";


/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  extensions: ['.svelte', '.md', '.svelte.md'],
  preprocess: [
    mdsvex({
      extensions: ['.svelte.md', '.md', '.svx'],
      layout: './src/lib/components/MdLayout.svelte'
    }),
    preprocess(),
  ],

  kit: {
    adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
    // paths: {
    //   base: '/twine-trail-guide',
    //   assets: '/twine-trail-guide'
    // },
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
};

export default config;