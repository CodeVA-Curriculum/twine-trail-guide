import preprocess from "svelte-preprocess";
const dev = process.env.NODE_ENV === 'development';
import adapter from '@sveltejs/adapter-static';
import {mdsvex} from 'mdsvex';
import { join } from "path";
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.md', '.svelte.md', '.svx'],
	preprocess: [
	  mdsvex({
		extensions: ['.svelte.md', '.md', '.svx'],
		layout: {
		  _: './src/lib/components/MdLayout.svelte',
		  location: './src/lib/components/Standalone.svelte',
		  trail: './src/lib/components/Trail.svelte'
		},
		remarkPlugins: [remarkParse, remarkFrontmatter, remarkGfm, remarkDirective, remarkDirectiveRehype]
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
	  paths: {
		base: '/twine-trail-guide', // uncomment this before deployment
	  },
	  prerender: {
		default: true
	  }
	}
  };
  
  export default config;
