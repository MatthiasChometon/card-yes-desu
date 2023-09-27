import { writable } from 'svelte/store';

export const notification = writable({
	isVisible: false,
	text: '',
});

export const setNotificationIsVisible = (isVisible: boolean) => notification.update((notification) => ({ ...notification, isVisible }));
export const setNotificationText = (text: string) => notification.update((notification) => ({ ...notification, text }));