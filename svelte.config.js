import preprocess from "svelte-preprocess";
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
    preprocess({
      scss: {
        prependData: '@import "src/variables.scss";',
      },
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "src/variables.scss";',
          },
        },
      },
    },
  },
};

export default config;
