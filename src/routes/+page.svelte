<script lang="ts">
	import CardZone from '../components/card-zone.svelte';
	import type { CardType } from '../types/card.type';

	let cards: CardType[] = [
		{ id: '1', color: 'blue' },
		{ id: '2', color: 'yellow' },
		{ id: '3', color: 'green' },
		{ id: '4', color: 'red' }
	];
</script>

<div style="height: 100vh; width: 100vw; display: flex; justify-content: center;">
	<div
		style="aspect-ratio: 16 / 9; width: 100%; height: 100%; position: relative; display: flex; align-items: center; flex-direction: column;"
	>
		<img
			style="aspect-ratio: 16 / 9; height: 100%; position: absolute; z-index: -1;"
			src="yugioh-field.webp"
			alt="yugioh field"
		/>
		<div style="aspect-ratio: 16 / 9; height: 100%; display: flex; flex-direction: column;">
			<div style="flex: 1; display: flex; width: 100%; margin-top: 1.5%;">
				<CardZone {cards} style="margin-left: 2.1%;" />
				<CardZone style="margin-left: 12.2%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone style="margin-left: 12.2%;" />
			</div>
			<div style="flex: 1; display: flex; width: 100%;">
				<CardZone style="margin-left: 2.1%;" />
				<CardZone style="margin-left: 2%;" />
				<CardZone style="margin-left: 2.1%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone style="margin-left: 2.5%;" />
				<CardZone style="margin-left: 1.6%;" />
			</div>
			<div style="flex: 1; display: flex; width: 100%;">
				<CardZone style="margin-left: 34.4%;" />
				<CardZone style="margin-left: 15.2%;" />
			</div>
			<div style="flex: 1; display: flex; width: 100%;">
				<CardZone style="margin-left: 2.3%;" />
				<CardZone style="margin-left: 1.6%;" />
				<CardZone style="margin-left: 2.4%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone style="margin-left: 2.4%;" />
				<CardZone style="margin-left: 1.6%;" />
			</div>
			<div style="flex: 1; display: flex; width: 100%; margin-bottom: 1%;">
				<CardZone style="margin-left: 2.3%;" />
				<CardZone style="margin-left: 12.2%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.5%;" />
				<CardZone style="margin-left: 3.4%;" />
				<CardZone style="margin-left: 12.2%;" />
			</div>
		</div>
	</div>
</div>
