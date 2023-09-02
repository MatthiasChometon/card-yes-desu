<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import Card from './card.svelte';
	import type { PlayableCard } from '../types/playable-card.type';
	import type { GameCardState } from '../types/game-card-state.type';
	import { updateSubObject } from '../services/updateSubObject';
	import type { DragAndDropHoverOrDropEvent } from '../types/drag-and-drop-hover-or-drop-event';
	import ModalGameMenu from './modal-game-menu.svelte';
	import { ContextMenu } from '../store/context-menu.store';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import { getContextMenuCardPositionItems } from '../services/get-context-menu-card-position-items';
	import { updateGameState } from '../services/update-game-state';
	import type { ClientPosition } from '../types/client-position';
	import { shuffle } from '../services/shuffle-cards';
	import CardListModal from './card-list-modal.svelte';

	export let style: string = '',
		cards: PlayableCard[] = [],
		superimposed: boolean = false,
		gameCardState: GameCardState | null = null,
		cardStyle: string = '',
		canChangePosition: boolean = true,
		canShuffle: boolean = false,
		menuItems: ContextMenuItem[] = [];

	let dropTargetStyle = { background: 'rgba(0, 0, 0, 0.2)' };

	const handleDrop = ({ detail: { items } }: DragAndDropHoverOrDropEvent<PlayableCard[]>) => (cards = items);
	const getMarginLeft = (index: number): string => (superimposed ? '0' : `${index * 12}px`);
	const getCard = (card: PlayableCard): PlayableCard =>
		gameCardState === null ? card : updateSubObject(card, 'gameState', gameCardState);

	const contextMenu = ContextMenu();
	let cardClicked: PlayableCard | null = null;
	let showCardListModal: boolean = false;

	function onRightClick({ clientX, clientY }: ClientPosition, card: PlayableCard): void {
		contextMenu.rightClickContextMenu({ clientX, clientY });
		cardClicked = card;
	}

	function getMenuItems(): ContextMenuItem[] {
		const menuItemsWithChangePositions = canChangePosition
			? getContextMenuCardPositionItems().map(({ displayText, newPosition }) => ({
					displayText,
					onClick: () => {
						if (cardClicked === null) return;
						cards = updateGameState(cards, cardClicked, newPosition);
					}
			  }))
			: [];
		const menuWithShuffleDeck = canShuffle
			? [
					{
						displayText: 'Shuffle deck',
						onClick: () => {
							cards = shuffle(cards);
						}
					}
			  ]
			: [];
		return [...menuItemsWithChangePositions, ...menuWithShuffleDeck, ...menuItems];
	}
</script>

<div
	style="width: 8.2%; height: 95%; display: flex; position: relative; {style}"
	use:dndzone={{ items: cards, flipDurationMs: 150, dropTargetStyle }}
	on:consider={handleDrop}
	on:finalize={handleDrop}
	on:dblclick={() => {
		showCardListModal = true;
	}}
	role="button"
	tabindex="0"
>
	{#each cards as card, index (card.id)}
		<Card
			onRightClick={(event) => {
				onRightClick(event, card);
			}}
			card={getCard(card)}
			style="position: absolute; height: 100%; width: 100%; margin-left: {getMarginLeft(index)}; {cardStyle}"
		/>
	{/each}
</div>
<ModalGameMenu
	onClose={contextMenu.onClose}
	showMenu={$contextMenu.showMenu}
	position={$contextMenu.position}
	menuItems={getMenuItems()}
/>
{#if showCardListModal}
	<CardListModal bind:cards bind:showCardListModal />
{/if}
