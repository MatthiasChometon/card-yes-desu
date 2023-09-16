<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import type { PlayableCard } from '../types/playable-card.type';
	import type { ClientPosition } from '../types/client-position';
	import type { DragAndDropHoverOrDropEvent } from '../types/drag-and-drop-hover-or-drop-event';
	import { ContextMenu } from '../store/context-menu.store';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import { shuffle } from '../services/shuffle-cards';
	import { getContextMenuCardPositionItems } from '../services/get-context-menu-card-position-items';
	import { updateGameState } from '../services/update-game-state';
	import Card from './card.svelte';
	import ModalGameMenu from './modal-game-menu.svelte';
	import { DragEvent } from '../enums/drag-event';

	export let cards: PlayableCard[] = [],
		boxStyle: string = '',
		onCardDrop: () => void = () => {};

	let cardClicked: PlayableCard | null = null;

	function onRightClick({ clientX, clientY }: ClientPosition, card: PlayableCard): void {
		contextMenu.rightClickContextMenu({ clientX, clientY });
		cardClicked = card;
	}

	const handleConsider = ({ detail: { items } }: DragAndDropHoverOrDropEvent<PlayableCard[]>) => {
		cards = items;
	};

	const handleDrop = ({
		detail: {
			items,
			info: { id }
		}
	}: DragAndDropHoverOrDropEvent<PlayableCard[]>) => {
		cards = items;
		const cardFounded = cards.find((card) => card.id === id);
		if (cardFounded !== undefined) onCardDrop();
	};

	const contextMenu = ContextMenu();
	const menuItems: ContextMenuItem[] = [
		{
			displayText: 'Shuffle hand',
			onClick: () => {
				cards = shuffle(cards);
			}
		},
		...getContextMenuCardPositionItems().map(({ displayText, newPosition }) => ({
			displayText,
			onClick: () => {
				if (cardClicked === null) return;
				cards = updateGameState(cards, cardClicked, newPosition);
			}
		}))
	];
</script>

<div style="width: 100%; height: 100%; flex: 3; display: flex; {boxStyle}">
	<div
		style="width: 100%; height: 20%; display: flex; justify-content: center; position: absolute;"
		use:dndzone={{ items: cards, flipDurationMs: 150, dropTargetStyle: { background: 'rgba(0, 0, 0, 0.2)' } }}
		on:consider={handleConsider}
		on:finalize={handleDrop}
	>
		{#each cards as card (card.id)}
			<Card
				bind:card
				onRightClick={(event) => {
					onRightClick(event, card);
				}}
				style="height: 100%; width: 9%; margin-left: 0.5%; margin-right: 0.5%; background-position: center;"
			/>
		{/each}
	</div>
</div>
<ModalGameMenu
	onClose={contextMenu.onClose}
	showMenu={$contextMenu.showMenu}
	position={$contextMenu.position}
	{menuItems}
/>
