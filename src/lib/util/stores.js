import { writable } from 'svelte/store';

export const locations = writable([]);
export const position = writable(0);
export const selected = writable("")
export const locationData = writable([])