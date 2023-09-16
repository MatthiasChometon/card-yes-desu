<script lang="ts">
	import HandZone from './hand-zone.svelte';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import GameBoardZones from './game-board-zones.svelte';
	import type { CardZonePlaceType } from '../enums/card-zone-place-type.enum';

	export let style = '',
		fieldCards: CardFieldZoneType,
		aspectRatio: number,
		onCardDrop: () => void,
		onCardChangingPosition: () => void,
		opponentCardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer,
		activePlayerCardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer,
		extraMonsterZonesLeftZoneIndex: 0 | 1,
		extraMonsterZonesRightZoneIndex: 0 | 1;
</script>

<div style="display: flex; justify-content: flex-end; flex-direction: column; position: relative; {style}">
	<HandZone
		{onCardChangingPosition}
		boxStyle="align-items: flex-start;"
		bind:cards={fieldCards[opponentCardZonePlaceType].Hand}
		{onCardDrop}
	/>
	<GameBoardZones
		{onCardChangingPosition}
		{aspectRatio}
		bind:cardFieldZone={fieldCards}
		style="flex: 12;"
		{onCardDrop}
		{opponentCardZonePlaceType}
		{activePlayerCardZonePlaceType}
		{extraMonsterZonesLeftZoneIndex}
		{extraMonsterZonesRightZoneIndex}
	/>
	<HandZone
		{onCardChangingPosition}
		boxStyle="align-items: flex-end;"
		bind:cards={fieldCards[activePlayerCardZonePlaceType].Hand}
		{onCardDrop}
	/>
</div>
