<script lang="ts">
	import { clickOutside } from '../services/click-outside';
	import type { ContextMenuItem } from '../types/context-menu-item.type';

	export let menuItems: ContextMenuItem[], onClose: () => void, showMenu: boolean, position: { x: number; y: number };
</script>

{#if showMenu && menuItems.length > 0}
	<nav
		style="position: fixed; top:{position.y}px; left:{position.x}px; z-index: 1000;"
		use:clickOutside
		on:outsideClick={() => {
			onClose();
		}}
	>
		<div class="navbar">
			<ul>
				{#each menuItems as item}
					<li>
						<button
							on:click={() => {
								item.onClick();
								onClose();
							}}><i />{item.displayText}</button
						>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
{/if}

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
