<script lang="ts">
	import ConnectPlayersOnline from './connect-players-online.svelte';
	import type { PlayersConnectionType } from '../types/players-connection.type';
	import { currentCardHover } from '../store/current-card-hover.store';
	import Card from './card.svelte';
	import RedirectionList from './redirection-list.svelte';
	import SelectDeck from './select-deck.svelte';
	import type { DeckType } from '../types/deck.type';

	export let style = '',
		playersConnection: PlayersConnectionType,
		connectToCreatedGame: () => void,
		playerDecks: DeckType[],
		deck: DeckType | null,
		disableSelectDeck: boolean;
</script>

<div {style}>
	<SelectDeck
		disabled={disableSelectDeck}
		{playerDecks}
		bind:deck
		style="margin-left: 0%; margin-top: 0%; padding: 0%;"
	/>
	<RedirectionList />
	<ConnectPlayersOnline bind:playersConnection {connectToCreatedGame} />
	{#if $currentCardHover !== null}
		<Card card={$currentCardHover} style="position: relative; padding: 2%; height: auto; aspect-ratio: 0.69;" />
	{/if}
</div>
