<script lang="ts">
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import CardZone from './card-zone.svelte';

	export let cardFieldZone: CardFieldZoneType, deckMenuItems: ContextMenuItem[];
</script>

<div style="flex: 1; display: flex; width: 100%;">
	<CardZone
		bind:cards={cardFieldZone.Opponent.FieldSpellZone}
		canChangePosition={false}
		superimposed
		style="margin-left: 2.3%;"
	/>
	<CardZone
		bind:cards={cardFieldZone.Opponent.SideDeck}
		canChangePosition={false}
		superimposed
		style="margin-left: 1.6%;"
	/>
	<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[0]} style="margin-left: 2.4%;" />
	<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[1]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[2]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[3]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[4]} style="margin-left: 3.4%;" />
	<CardZone
		bind:cards={cardFieldZone.Opponent.Banished}
		canChangePosition={false}
		superimposed
		style="margin-left: 2.4%;"
	/>
	<CardZone
		bind:cards={cardFieldZone.Opponent.Graveyard}
		canChangePosition={false}
		superimposed
		style="margin-left: 1.6%;"
	/>
</div>
<div style="flex: 1; display: flex; width: 100%; margin-bottom: 1%;">
	<CardZone
		bind:cards={cardFieldZone.Opponent.ExtraDeck}
		superimposed
		canChangePosition={false}
		gameCardState={{ faceUp: false, rotation: 0 }}
		style="margin-left: 2.3%;"
	/>
	<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[0]} style="margin-left: 12.2%;" />
	<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[1]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[2]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[3]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[4]} style="margin-left: 3.4%;" />
	<CardZone
		bind:cards={cardFieldZone.Opponent.Deck}
		superimposed
		canShuffle
		canChangePosition={false}
		menuItems={deckMenuItems}
		gameCardState={{ faceUp: false, rotation: 0 }}
		style="margin-left: 12.2%;"
	/>
</div>
