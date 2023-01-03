// import {base} from '$app/paths'
// export const prerender = true;

// export async function load({ fetch, page }) {
//     const { trail } = page.params;
//     const res = await fetch(`${base}/api/locations.json`);
//     if (res.ok) {
//         const obj = await res.json();
//         return { props: { locations: obj.posts } };
//     };
//   return {
//     status: res.status,
//     error: new Error(),
//   };
// }
const locs = import.meta.glob('./*/*.md')

let body = []
let slugs = []
// let locations = []

for (const path in locs) {
    slugs.push(path)
    body.push(locs[path]().then(({metadata}) => metadata))
}
async function load({ url, params, fetch }) {
    let locations = await Promise.all(body)
    for(let i=0; i<locations.length; i++) {
        if(locations[i]) {
            let end = slugs[i].indexOf("/+page.md");
            locations[i].slug = slugs[i].substring(1, end);
        }
    }
    // console.log(locations[0])
    return {
    locations
};
}
export {load}
