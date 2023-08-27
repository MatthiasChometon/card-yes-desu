<script lang="ts">
	import CardZone from './card-zone.svelte';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import type { PlayableCard } from '../types/playable-card.type';

	export let cardFieldZone: CardFieldZoneType,
		cardMenuItems: ContextMenuCardItem[],
		onSelectMenuItem: (card: PlayableCard, item: ContextMenuCardItem) => void;
</script>

<div style="flex: 1; display: flex; width: 100%; margin-top: 1.7%;">
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.Deck}
		{cardMenuItems}
		superimposed
		gameCardState={{ faceUp: false, rotation: 0 }}
		style="margin-left: 2.1%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[0]}
		{cardMenuItems}
		style="margin-left: 12.2%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[1]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[2]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[3]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[4]}
		{cardMenuItems}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.ExtraDeck}
		{cardMenuItems}
		superimposed
		gameCardState={{ faceUp: false, rotation: 0 }}
		style="margin-left: 12.2%;"
	/>
</div>
<div style="flex: 1; display: flex; width: 100%;">
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.Graveyard}
		{cardMenuItems}
		superimposed
		style="margin-left: 2.1%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.Banished}
		{cardMenuItems}
		superimposed
		style="margin-left: 1.8%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.MonsterField[0]}
		{cardMenuItems}
		style="margin-left: 2.2%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.MonsterField[1]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.MonsterField[2]}
		{cardMenuItems}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.MonsterField[3]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.MonsterField[4]}
		{cardMenuItems}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.SideDeck}
		{cardMenuItems}
		superimposed
		style="margin-left: 2.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.ActivePlayer.FieldSpellZone}
		{cardMenuItems}
		style="margin-left: 1.6%;"
	/>
</div>
