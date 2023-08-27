<script lang="ts">
	import CardZone from './card-zone.svelte';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import type { PlayableCard } from '../types/playable-card.type';

	export let cardFieldZone: CardFieldZoneType,
		cardMenuItems: ContextMenuCardItem[],
		onSelectMenuItem: (card: PlayableCard, item: ContextMenuCardItem) => void;
</script>

<div style="flex: 1; display: flex; width: 100%;">
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ExtraMonsterZone[0]}
		{cardMenuItems}
		style="margin-left: 34.4%; margin-top: 0.2%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ExtraMonsterZone[1]}
		{cardMenuItems}
		style="margin-left: 15.2%; margin-top: 0.2%;"
	/>
</div>
