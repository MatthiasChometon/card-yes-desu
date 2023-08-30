<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import type { PlayableCard } from '../types/playable-card.type';
	import type { DragAndDropHoverOrDropEvent } from '../types/drag-and-drop-hover-or-drop-event';
	import Card from './card.svelte';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import { ContextMenu } from '../store/context-menu.store';
	import ModalGameMenu from './modal-game-menu.svelte';
	import { updateSubObject } from '../services/updateSubObject';
	import { updateObjectInArrayById } from '../services/updateObjectInArrayById';
	import { getContextMenuCardPositionItems } from '../services/get-context-menu-card-position-items';
	import { updateGameState } from '../services/update-game-state';
	import type { ClientPosition } from '../types/client-position';
	import { shuffle } from '../services/shuffle-cards';

	export let cards: PlayableCard[] = [],
		boxStyle: string = '';

	let cardClicked: PlayableCard | null = null;

	function onRightClick({ clientX, clientY }: ClientPosition, card: PlayableCard): void {
		contextMenu.rightClickContextMenu({ clientX, clientY });
		cardClicked = card;
	}

	const handleDrop = ({ detail: { items } }: DragAndDropHoverOrDropEvent<PlayableCard[]>) => {
		cards = items;
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
		on:consider={handleDrop}
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
	onClickOutside={contextMenu.onClickOutside}
	showMenu={$contextMenu.showMenu}
	position={$contextMenu.position}
	{menuItems}
/>
