<script lang="ts">
	import { CardZoneType } from '../enums/card-zone-type.enum';
	import type { DeckType } from '../types/deck.type';

	export let selectedDeckName: string | null = null,
		playerDecks: DeckType[],
		deck: DeckType | null = {
			name: '',
			[CardZoneType.Deck]: [],
			[CardZoneType.ExtraDeck]: [],
			[CardZoneType.SideDeck]: []
		},
		style: string = '',
		disabled: boolean = false;

	function onSelect({ target: { value } }: { target: { value: string } }): void {
		const foundDeck = playerDecks.find((playerDeck) => playerDeck.name === value);
		if (foundDeck === undefined) throw new Error('Deck not found');
		deck = foundDeck;
	}
</script>

<select
	{disabled}
	style="margin-left: 1%; margin-top: 0.5%; width: 20%; padding: 0.3%; font-size: 1.2rem; {style}"
	bind:value={selectedDeckName}
	on:change={onSelect}
>
	{#each playerDecks as playerDeck (playerDeck.name)}
		<option value={playerDeck.name}>{playerDeck.name}</option>
	{/each}
</select>
