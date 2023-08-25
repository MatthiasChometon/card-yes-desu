import { writable } from 'svelte/store';

export const ContextMenu = () => {
	const { subscribe, set, update } = writable({
		showMenu: false,
		position: { x: 0, y: 0 },
	});

	return {
		subscribe,
		rightClickContextMenu: ({ clientX, clientY }: { clientX: number; clientY: number }) => {
			set({ showMenu: true, position: { x: clientX, y: clientY } });
		},
		onClickOutside: () => {
			update(state => ({ ...state, showMenu: false }));
		},
	};
};
