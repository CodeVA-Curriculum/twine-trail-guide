import Image from './Image.svelte';
import Pre from './Pre.svelte'
import Paragraph from './Paragraph.svelte'
import aside from './Aside.svelte';
import Doc from './DocumentationPage.svelte';
import trailmap from './TrailMap.svelte';
import location from './MapLocation.svelte';
import timeline from './TrailTimeline.svelte';
import Link from './Link.svelte'
import Passage from './Passage.svelte'
import Columns from './Columns.svelte'
import Download from './Download.svelte'

const img = Image;
const pre = Pre;
const p = Paragraph;
// const blockquote = Aside;
const documentation = Doc;
const a = Link;
const passage = Passage;
const foursquare = Columns
const download = Download

export { img, pre, p, aside, location, trailmap, timeline, a, passage, foursquare, download };