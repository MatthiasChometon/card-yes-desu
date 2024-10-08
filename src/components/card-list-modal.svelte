<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import { clickOutside } from '../services/click-outside';
	import type { PlayableCard } from '../types/playable-card.type';
	import Card from './card.svelte';
	import type { DragAndDropHoverOrDropEvent } from '../types/drag-and-drop-hover-or-drop-event';
	import ModalGameMenu from './modal-game-menu.svelte';
	import { ContextMenu } from '../store/context-menu.store';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import { getContextMenuCardPositionItems } from '../services/get-context-menu-card-position-items';
	import { updateGameState } from '../services/update-game-state';
	import type { ClientPosition } from '../types/client-position';

	export let showCardListModal: boolean,
		cards: PlayableCard[],
		customCardFaceUp: boolean | null = null,
		hasModalGameMenu: boolean = true;
	const contextMenu = ContextMenu();
	let cardClicked: PlayableCard | null = null;

	let handleDrop = ({
		detail: {
			info: { id }
		}
	}: DragAndDropHoverOrDropEvent<PlayableCard[]>) => {
		cards = cards.filter((card) => card.id !== id);
		showCardListModal = false;
	};

	function onRightClick({ clientX, clientY }: ClientPosition, card: PlayableCard): void {
		contextMenu.rightClickContextMenu({ clientX, clientY });
		cardClicked = card;
	}

	function getMenuItems(): ContextMenuItem[] {
		return getContextMenuCardPositionItems().map(({ displayText, newPosition }) => ({
			displayText,
			onClick: () => {
				if (cardClicked === null) return;
				cards = updateGameState(cards, cardClicked, newPosition);
			}
		}));
	}

	function getCardFaceUp(faceUp: boolean): boolean {
		return customCardFaceUp === null ? faceUp : customCardFaceUp;
	}
</script>

<div
	style="position: fixed; z-index: 1000; top: 0px; left: 0px; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"
>
	<div
		use:clickOutside
		use:dndzone={{ items: cards, flipDurationMs: 150 }}
		on:consider={handleDrop}
		on:finalize={handleDrop}
		on:outsideClick={() => {
			showCardListModal = false;
		}}
		role="button"
		tabindex="0"
		style=" padding: 10px; flex-wrap: wrap; display: flex; width: 80%; height: 80%; background-color: rgba(0, 0, 0, 0.7); overflow-y: scroll;"
	>
		{#each cards as card (card.id)}
			<Card
				card={{ ...card, gameState: { ...card.gameState, faceUp: getCardFaceUp(card.gameState.faceUp) } }}
				onRightClick={(event) => {
					onRightClick(event, card);
				}}
				style="aspect-ratio: 0.7; height: 50%; max-width: 200px; margin: 5px;"
				pictureStyle="aspect-ratio: 0.7; height: auto;"
			/>
		{/each}
	</div>
	{#if !hasModalGameMenu}
		<ModalGameMenu
			onClose={() => {
				contextMenu.onClose();
			}}
			showMenu={$contextMenu.showMenu}
			position={$contextMenu.position}
			menuItems={getMenuItems()}
		/>
	{/if}
</div>
