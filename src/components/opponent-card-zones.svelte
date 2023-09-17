<script lang="ts">
	import CardZone from './card-zone.svelte';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { CardZonePlaceType } from '../enums/card-zone-place-type.enum';

	export let cardFieldZone: CardFieldZoneType,
		deckMenuItems: ContextMenuItem[],
		onCardDrop: () => void,
		onCardChangingPosition: () => void,
		onShuffleDeck: () => void,
		cardZonePlaceType: CardZonePlaceType.InvitedPlayer | CardZonePlaceType.HostPlayer;
</script>

<div style="flex: 1; display: flex; width: 100%; margin-top: 1.7%;">
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		menuItems={deckMenuItems}
		canChangePosition={false}
		bind:cards={cardFieldZone[cardZonePlaceType].Deck}
		superimposed
		canShuffle
		{onShuffleDeck}
		gameCardState={{ faceUp: false, rotation: 0 }}
		style="margin-left: 2.1%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[0]}
		style="margin-left: 12.2%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[1]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[2]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[3]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[4]}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].ExtraDeck}
		superimposed
		canChangePosition={false}
		gameCardState={{ faceUp: false, rotation: 0 }}
		style="margin-left: 12.2%;"
	/>
</div>
<div style="flex: 1; display: flex; width: 100%;">
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].Graveyard}
		superimposed
		canChangePosition={false}
		style="margin-left: 2.1%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].Banished}
		superimposed
		canChangePosition={false}
		style="margin-left: 1.8%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[0]}
		style="margin-left: 2.2%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[1]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[2]}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[3]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[4]}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SideDeck}
		superimposed
		canChangePosition={false}
		style="margin-left: 2.5%;"
	/>
	<CardZone
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].FieldSpellZone}
		style="margin-left: 1.6%;"
	/>
</div>
