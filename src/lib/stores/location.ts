import { writable } from 'svelte/store';

export const userLocation = writable<GeolocationPosition | null>(null);