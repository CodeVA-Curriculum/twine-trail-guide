import { trails } from '$lib/db/trails';

export async function get({ params }) {
    const { trail } = params;

    const obj = trails.find(obj => obj.path == trail);
    // const obj = trails[0];

    return {
      body: {
        obj,
        name: obj.name,
        // : `https://avatars.dicebear.com/api/human/${lastName}.svg`,
        desc: obj.description,
        beginner : obj.beginner,
        locations: obj.locations,
        type: obj.type
        // email: faker.internet.email(),
      },
    };
  }