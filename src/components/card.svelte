<script lang="ts">
	import { currentCardHover } from '../store/current-card-hover.store';
	import type { ClientPosition } from '../types/client-position';
	import type { PlayableCard } from '../types/playable-card.type';
	import MediaQuery from './media-query.svelte';

	export let card: PlayableCard,
		style: string = '',
		pictureStyle: string = '',
		onRightClick: ({ clientX, clientY }: ClientPosition) => void = () => {};

	$: pictureDisplayed = card.gameState.faceUp ? card.frontPicture : card.backPicture;
</script>

<MediaQuery query="(max-width: 800px)" let:matches>
	<div
		style="width: 100%; height: 100%; {style}"
		on:mouseover={() => currentCardHover.set({ ...card, gameState: { ...card.gameState, rotation: 0 } })}
		on:focus={() => currentCardHover.set({ ...card, gameState: { ...card.gameState, rotation: 0 } })}
		on:blur={() => (matches ? currentCardHover.set(null) : null)}
		on:mouseleave={() => (matches ? currentCardHover.set(null) : null)}
		tabindex="0"
		role="button"
	>
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
</MediaQuery>
