import { writable } from 'svelte/store';
import type { PlayableCard } from '../types/playable-card.type';

export const currentCardHover = writable<PlayableCard | null>(null);
