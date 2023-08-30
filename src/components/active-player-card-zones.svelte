<script lang="ts">
	import CardZone from './card-zone.svelte';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';

	export let cardFieldZone: CardFieldZoneType;
</script>

<div style="flex: 1; display: flex; width: 100%; margin-top: 1.7%;">
	<CardZone
		canChangePosition={false}
		bind:cards={cardFieldZone.ActivePlayer.Deck}
		superimposed
		canShuffle
		gameCardState={{ faceUp: true, rotation: 0 }}
		style="margin-left: 2.1%;"
	/>
	<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[0]} style="margin-left: 12.2%;" />
	<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[1]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[2]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[3]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[4]} style="margin-left: 3.4%;" />
	<CardZone
		bind:cards={cardFieldZone.ActivePlayer.ExtraDeck}
		superimposed
		canChangePosition={false}
		gameCardState={{ faceUp: false, rotation: 0 }}
		style="margin-left: 12.2%;"
	/>
</div>
<div style="flex: 1; display: flex; width: 100%;">
	<CardZone
		bind:cards={cardFieldZone.ActivePlayer.Graveyard}
		superimposed
		canChangePosition={false}
		style="margin-left: 2.1%;"
	/>
	<CardZone
		bind:cards={cardFieldZone.ActivePlayer.Banished}
		superimposed
		canChangePosition={false}
		style="margin-left: 1.8%;"
	/>
	<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[0]} style="margin-left: 2.2%;" />
	<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[1]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[2]} style="margin-left: 3.4%;" />
	<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[3]} style="margin-left: 3.5%;" />
	<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[4]} style="margin-left: 3.4%;" />
	<CardZone
		bind:cards={cardFieldZone.ActivePlayer.SideDeck}
		superimposed
		canChangePosition={false}
		style="margin-left: 2.5%;"
	/>
	<CardZone bind:cards={cardFieldZone.ActivePlayer.FieldSpellZone} style="margin-left: 1.6%;" />
</div>
