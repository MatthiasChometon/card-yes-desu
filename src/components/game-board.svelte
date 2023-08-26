<script lang="ts">
	import CardZone from '../components/card-zone.svelte';
	import { getContextMenuCardPositionItems } from '../services/get-context-menu-card-position-items';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { ContextMenuCardItem } from '../types/context-menu-card-item.type';

	export let cardFieldZone: CardFieldZoneType,
		cardRatio: number,
		style: string = '';

	let cardMenuItems: ContextMenuCardItem[] = getContextMenuCardPositionItems();
</script>

<div
	style="aspect-ratio: {cardRatio}; width: 100%; height: 100%; position: relative; display: flex; align-items: center; flex-direction: column; {style}"
>
	<img
		style="aspect-ratio: {cardRatio}; height: 100%; position: absolute; z-index: -1;"
		src="yugioh-field.webp"
		alt="yugioh field"
	/>
	<div style="aspect-ratio: {cardRatio}; height: 100%; display: flex; flex-direction: column;">
		<div style="flex: 1; display: flex; width: 100%; margin-top: 1.7%;">
			<CardZone
				bind:cards={cardFieldZone.ActivePlayer.Deck}
				{cardMenuItems}
				superimposed
				gameCardState={{ faceUp: false, rotation: 0 }}
				style="margin-left: 2.1%;"
			/>
			<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[0]} {cardMenuItems} style="margin-left: 12.2%;" />
			<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[1]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[2]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[3]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.ActivePlayer.SpellTrapZone[4]} {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone
				bind:cards={cardFieldZone.ActivePlayer.ExtraDeck}
				{cardMenuItems}
				superimposed
				gameCardState={{ faceUp: false, rotation: 0 }}
				style="margin-left: 12.2%;"
			/>
		</div>
		<div style="flex: 1; display: flex; width: 100%;">
			<CardZone
				bind:cards={cardFieldZone.ActivePlayer.Graveyard}
				{cardMenuItems}
				superimposed
				style="margin-left: 2.1%;"
			/>
			<CardZone
				bind:cards={cardFieldZone.ActivePlayer.Banished}
				{cardMenuItems}
				superimposed
				style="margin-left: 1.8%;"
			/>
			<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[0]} {cardMenuItems} style="margin-left: 2.2%;" />
			<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[1]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[2]} {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[3]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.ActivePlayer.MonsterField[4]} {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone
				bind:cards={cardFieldZone.ActivePlayer.SideDeck}
				{cardMenuItems}
				superimposed
				style="margin-left: 2.5%;"
			/>
			<CardZone bind:cards={cardFieldZone.ActivePlayer.FieldSpellZone} {cardMenuItems} style="margin-left: 1.6%;" />
		</div>
		<div style="flex: 1; display: flex; width: 100%;">
			<CardZone
				bind:cards={cardFieldZone.ExtraMonsterZone[0]}
				{cardMenuItems}
				style="margin-left: 34.4%; margin-top: 0.2%;"
			/>
			<CardZone
				bind:cards={cardFieldZone.ExtraMonsterZone[1]}
				{cardMenuItems}
				style="margin-left: 15.2%; margin-top: 0.2%;"
			/>
		</div>
		<div style="flex: 1; display: flex; width: 100%;">
			<CardZone
				bind:cards={cardFieldZone.Opponent.FieldSpellZone}
				{cardMenuItems}
				superimposed
				style="margin-left: 2.3%;"
			/>
			<CardZone bind:cards={cardFieldZone.Opponent.SideDeck} {cardMenuItems} superimposed style="margin-left: 1.6%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[0]} {cardMenuItems} style="margin-left: 2.4%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[1]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[2]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[3]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.MonsterField[4]} {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.Banished} {cardMenuItems} superimposed style="margin-left: 2.4%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.Graveyard} {cardMenuItems} superimposed style="margin-left: 1.6%;" />
		</div>
		<div style="flex: 1; display: flex; width: 100%; margin-bottom: 1%;">
			<CardZone
				bind:cards={cardFieldZone.Opponent.ExtraDeck}
				{cardMenuItems}
				superimposed
				gameCardState={{ faceUp: false, rotation: 0 }}
				style="margin-left: 2.3%;"
			/>
			<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[0]} {cardMenuItems} style="margin-left: 12.2%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[1]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[2]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[3]} {cardMenuItems} style="margin-left: 3.5%;" />
			<CardZone bind:cards={cardFieldZone.Opponent.SpellTrapZone[4]} {cardMenuItems} style="margin-left: 3.4%;" />
			<CardZone
				bind:cards={cardFieldZone.Opponent.Deck}
				{cardMenuItems}
				superimposed
				gameCardState={{ faceUp: false, rotation: 0 }}
				style="margin-left: 12.2%;"
			/>
		</div>
	</div>
</div>
