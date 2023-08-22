  // export const prerender = true;
  // import {base} from '$app/paths'
  //     export async function load({ fetch, page }) {
  //         const { trail } = page.params;
  //         const res = await fetch(`${base}/api/trails.json`);
  //         if (res.ok) {
  //             const obj = await res.json();
  //             return { props: { trails: obj.posts } };
  //         };
  //       return {
  //         status: res.status,
  //         error: new Error(),
  //       };
  //     }

  const posts = import.meta.glob('./*/*.md')

  let body = []
  let paths = []

  for (const path in posts) {
      paths.push(path);
      body.push(posts[path]().then(({metadata}) => metadata))
  }
//   console.log(body)
  export async function load({ url, params, fetch }) {
        const trails = await Promise.all(body)
        for(let i=0; i<trails.length; i++) {
            if(trails[i]) {
                let end = paths[i].indexOf("/+page.md");
                trails[i].slug = paths[i].substring(1, end);
            }
        }

        // sort the trails into the correct order
        trails.sort((a,b) => {
            // we always want the "Your First Story" trail to be first in the list
            if(a.title == "Your First Story") {
                return -1
            }
            // otherwise, sort by difficulty
            if(a.difficulty > b.difficulty) {
                return 1
            } else {
                return -1
            }
        })
        return {
            trails
        };
  }