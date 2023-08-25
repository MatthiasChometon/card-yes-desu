<script lang="ts">
	import type { PlayableCard } from '../types/playable-card.type';

	export let card: PlayableCard,
		style: string = '';

	const menuItems: { onClick: () => void; displayText: string }[] = [
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
	let position = { x: 0, y: 0 };
	let showMenu = false;

	function rightClickContextMenu(e: { clientX: number; clientY: number }) {
		showMenu = true;
		position.y = e.clientY;
		position.x = e.clientX;
	}
	function onClickOutside() {
		showMenu = false;
	}
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
		transform: rotate({card.gameState.rotation}deg) !important;
	"
		role="button"
		tabindex="0"
		on:contextmenu|preventDefault={rightClickContextMenu}
	/>
</div>

{#if showMenu}
	<nav style="position: fixed; top:{position.y}px; left:{position.x}px; z-index: 1000;">
		<div class="navbar" id="navbar">
			<ul>
				{#each menuItems as item}
					<li><button on:click={item.onClick}><i />{item.displayText}</button></li>
				{/each}
			</ul>
		</div>
	</nav>
{/if}

<svelte:window on:click={onClickOutside} />

<style>
	.navbar {
		display: inline-flex;
		border: 1px #999 solid;
		width: 170px;
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		flex-direction: column;
	}
	.navbar ul {
		margin: 6px;
	}
	ul li button {
		font-size: 1rem;
		color: #222;
		width: 100%;
		height: 30px;
		text-align: left;
		border: 0px;
		background-color: #fff;
	}
	ul li button:hover {
		color: #000;
		text-align: left;
		border-radius: 5px;
		background-color: #eee;
	}
</style>
