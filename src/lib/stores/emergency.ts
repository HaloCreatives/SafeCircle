import { writable } from 'svelte/store';

export const isEmergency = writable<boolean>(false);