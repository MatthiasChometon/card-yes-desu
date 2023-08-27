<script lang="ts">
	import CardZone from '../components/card-zone.svelte';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';
	import type { PlayableCard } from '../types/playable-card.type';

	export let cardFieldZone: CardFieldZoneType,
		cardMenuItems: ContextMenuCardItem[],
		onSelectMenuItem: (card: PlayableCard, item: ContextMenuCardItem) => void;
</script>

<div style="flex: 1; display: flex; width: 100%;">
	<CardZone
		bind:cards={cardFieldZone.Opponent.FieldSpellZone}
		{cardMenuItems}
		superimposed
		style="margin-left: 2.3%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.SideDeck}
		{cardMenuItems}
		superimposed
		style="margin-left: 1.6%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.MonsterField[0]}
		{cardMenuItems}
		style="margin-left: 2.4%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.MonsterField[1]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.MonsterField[2]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.MonsterField[3]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.MonsterField[4]}
		{cardMenuItems}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.Banished}
		{cardMenuItems}
		superimposed
		style="margin-left: 2.4%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.Graveyard}
		{cardMenuItems}
		superimposed
		style="margin-left: 1.6%;"
	/>
</div>
<div style="flex: 1; display: flex; width: 100%; margin-bottom: 1%;">
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.ExtraDeck}
		{cardMenuItems}
		superimposed
		gameCardState={{ faceUp: false, rotation: 0 }}
		style="margin-left: 2.3%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.SpellTrapZone[0]}
		{cardMenuItems}
		style="margin-left: 12.2%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.SpellTrapZone[1]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.SpellTrapZone[2]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.SpellTrapZone[3]}
		{cardMenuItems}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.SpellTrapZone[4]}
		{cardMenuItems}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		{onSelectMenuItem}
		bind:cards={cardFieldZone.Opponent.Deck}
		{cardMenuItems}
		superimposed
		gameCardState={{ faceUp: false, rotation: 0 }}
		style="margin-left: 12.2%;"
	/>
</div>
