<script lang="ts">
	import HandZone from './hand-zone.svelte';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import GameBoardZones from './game-board-zones.svelte';
	import { CardZonePlaceType } from '../enums/card-zone-place-type.enum';

	export let style = '',
		fieldCards: CardFieldZoneType,
		aspectRatio: number,
		onCardDrop: () => void,
		onCardChangingPosition: () => void,
		isHost: boolean;
</script>

<div style="display: flex; justify-content: flex-end; flex-direction: column; position: relative; {style}">
	<HandZone
		{onCardChangingPosition}
		boxStyle="align-items: flex-start;"
		bind:cards={fieldCards[!isHost ? CardZonePlaceType.HostPlayer : CardZonePlaceType.InvitedPlayer].Hand}
		{onCardDrop}
	/>
	<GameBoardZones
		{onCardChangingPosition}
		{aspectRatio}
		bind:cardFieldZone={fieldCards}
		style="flex: 12;"
		{onCardDrop}
		{isHost}
	/>
	<HandZone
		{onCardChangingPosition}
		boxStyle="align-items: flex-end;"
		bind:cards={fieldCards[isHost ? CardZonePlaceType.HostPlayer : CardZonePlaceType.InvitedPlayer].Hand}
		{onCardDrop}
	/>
</div>
