<script lang="ts">
	import { ContextMenu } from '../store/context-menu.store';
	import type { PlayableCard } from '../types/playable-card.type';
	import ModalGameMenu from './modal-game-menu.svelte';

	export let card: PlayableCard,
		style: string = '';

	const contextMenu = ContextMenu();
	const menuItems = [
		{
			displayText: 'Defense position',
			onClick: () => {
				card.gameState.rotation = 90;
				card.gameState.faceUp = true;
			}
		},
		{
			displayText: 'Attack position',
			onClick: () => {
				card.gameState.rotation = 0;
				card.gameState.faceUp = true;
			}
		},
		{
			displayText: 'Flip position',
			onClick: () => {
				card.gameState.rotation = 90;
				card.gameState.faceUp = false;
			}
		}
	];
	$: pictureDisplayed = card.gameState.faceUp ? card.frontPicture : card.backPicture;
</script>

<div style="width: 100%; height: 100%; {style}">
	<div
		style="
		background-image: url({pictureDisplayed});
		background-size: contain;
		background-repeat: no-repeat;
		color: white;
		width: 100%;
		height: 100%;
		transform: rotate({card.gameState.rotation}deg);
	"
		role="button"
		tabindex="0"
		on:contextmenu|preventDefault={contextMenu.rightClickContextMenu}
	/>
</div>
<ModalGameMenu
	onClickOutside={contextMenu.onClickOutside}
	showMenu={$contextMenu.showMenu}
	position={$contextMenu.position}
	{menuItems}
/>
