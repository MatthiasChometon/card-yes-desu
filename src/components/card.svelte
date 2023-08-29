<script lang="ts">
	import { ContextMenu } from '../store/context-menu.store';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import type { PlayableCard } from '../types/playable-card.type';
	import ModalGameMenu from './modal-game-menu.svelte';

	export let card: PlayableCard,
		style: string = '',
		cardMenuItems: ContextMenuCardItem[],
		onSelectMenuItem: (card: PlayableCard, menuItemClicked: ContextMenuCardItem) => void = () => {};

	const contextMenu = ContextMenu();

	$: menuItems = cardMenuItems.map((item) => ({
		...item,
		onClick: () => {
			onSelectMenuItem(card, item);
		}
	}));
	$: pictureDisplayed = card.gameState.faceUp ? card.frontPicture : card.backPicture;
</script>

<div style="width: 100%; height: 100%; {style}">
	<div
		style="
		background-image: url({pictureDisplayed});
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
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
