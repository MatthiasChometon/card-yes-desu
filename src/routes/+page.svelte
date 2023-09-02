<script lang="ts">
	import GameInformation from '../components/game-information.svelte';
	import GameZones from '../components/game-zones.svelte';
	import { getDefaultCardFieldZone } from '../services/get-default-card-field-zone';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { CardSize } from '../types/card-size.type';

	const cardSize: CardSize = { height: 13.6, width: 9 };
	const cardRatio: number = cardSize.height / cardSize.width;

	let fieldCards: CardFieldZoneType = getDefaultCardFieldZone();
</script>

<div style="height: 100vh; width: 100vw; display: flex; justify-content: flex-end;">
	<GameInformation style="flex: 6;" bind:fieldCards />
	<GameZones aspectRatio={cardRatio} style="flex: 8; " bind:fieldCards />
</div>
