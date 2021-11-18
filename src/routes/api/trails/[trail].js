import {base} from '$app/paths';
import {get as allTrails} from './all.json.js';

export async function get({ params }) {
    const { trail } = params;

    const res = await allTrails();
    // console.log(res.body.trails);
    const obj = res.body.trails.find(obj => obj.path == trail);

    return {
      body: {
        obj,
        name: obj.name,
        desc: obj.description,
        difficulty : obj.difficulty,
        locations: obj.locations,
        type: obj.type
      },
    };
}