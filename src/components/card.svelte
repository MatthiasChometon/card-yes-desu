<script lang="ts">
	import type { CardType } from '../types/card.type';

	let rotation = 0;
	export let menuItems: { onClick: () => void; displayText: string }[] = [
			{
				displayText: 'Defense position',
				onClick: () => {
					rotation = 90;
				}
			},
			{
				displayText: 'Attack position',
				onClick: () => {
					rotation = 0;
				}
			},
			{
				displayText: 'Flip position',
				onClick: () => {
					console.log('clicked');
				}
			}
		],
		card: CardType,
		style: string = '';

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

<div
	style="background-color: {card.color}; color: white; transform: rotate({rotation}deg); {style}"
	role="button"
	tabindex="0"
	on:contextmenu|preventDefault={rightClickContextMenu}
/>
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
