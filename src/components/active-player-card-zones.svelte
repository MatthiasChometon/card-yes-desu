<script lang="ts">
	import type { CardZonePlaceType } from '../enums/card-zone-place-type.enum';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuItem } from '../types/context-menu-item.type';
	import CardZone from './card-zone.svelte';

	export let cardFieldZone: CardFieldZoneType,
		deckMenuItems: ContextMenuItem[],
		onCardDrop: () => void,
		onCardChangingPosition: () => void,
		onShuffleDeck: () => void,
		cardZonePlaceType: CardZonePlaceType.HostPlayer | CardZonePlaceType.InvitedPlayer;
</script>

<div style="flex: 1; display: flex; width: 100%;">
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].FieldSpellZone}
		canChangePosition={false}
		superimposed
		style="margin-left: 2.3%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SideDeck}
		canChangePosition={false}
		superimposed
		style="margin-left: 1.6%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[0]}
		style="margin-left: 2.4%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[1]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[2]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[3]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].MonsterField[4]}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].Banished}
		canChangePosition={false}
		superimposed
		style="margin-left: 2.4%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].Graveyard}
		canChangePosition={false}
		superimposed
		style="margin-left: 1.6%;"
	/>
</div>
<div style="flex: 1; display: flex; width: 100%; margin-bottom: 1%;">
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].ExtraDeck}
		superimposed
		canChangePosition={false}
		style="margin-left: 2.3%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[0]}
		style="margin-left: 12.2%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[1]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[2]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[3]}
		style="margin-left: 3.5%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].SpellTrapZone[4]}
		style="margin-left: 3.4%;"
	/>
	<CardZone
		modalGameMenuStyle="top: auto;"
		{onCardChangingPosition}
		{onCardDrop}
		bind:cards={cardFieldZone[cardZonePlaceType].Deck}
		superimposed
		canShuffle
		{onShuffleDeck}
		canChangePosition={false}
		menuItems={deckMenuItems}
		style="margin-left: 12.2%;"
	/>
</div>
