// Code from here: https://cass.moe/blog/svelte-kit-mdsvex

import pMap from "p-map"
import { basename } from "path"

export async function get({ params }) {
	// Import all .md files in the directory
	const modules = import.meta.glob("../locations/*.md")

	// Run a map over each module

	// Check out the docs for p-map if this looks confusing, it's  basically
	// Array.map(...) but for promises
	const posts = await pMap(
		Object.entries(modules),
		async function ([filename, module]) {
			// Import the component. The metadata here is added by MDSveX and mirrors
			// the front matter.
			const { metadata } = await module()
            
			return {
				title: metadata.title,
				short: metadata.short,
				description: metadata.description,
                type: metadata.type,
				video: metadata.video,
				slug: basename(filename, ".md") // Generate a slug we can link to
			}
		}
	)

	return {
		body: { posts }
	}
}