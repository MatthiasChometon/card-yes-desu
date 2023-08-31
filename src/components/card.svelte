<script lang="ts">
	import type { ClientPosition } from '../types/client-position';
	import type { PlayableCard } from '../types/playable-card.type';

	export let card: PlayableCard,
		style: string = '',
		pictureStyle: string = '',
		onRightClick: ({ clientX, clientY }: ClientPosition) => void = () => {};

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
		{pictureStyle}
	"
		role="button"
		tabindex="0"
		on:contextmenu|preventDefault={onRightClick}
	/>
</div>
