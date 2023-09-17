<script lang="ts">
	import { onMount } from 'svelte';
	import GameInformation from '../components/game-information.svelte';
	import { getDefaultCardFieldZone } from '../services/get-default-card-field-zone';
	import { PlayersConnection } from '../store/players-connection.store';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { CardSize } from '../types/card-size.type';
	import { CardZonePlaceType } from '../enums/card-zone-place-type.enum';
	import GameZones from '../components/game-zones.svelte';
	import type { PlayableCard } from '../types/playable-card.type';

	const cardSize: CardSize = { height: 13.6, width: 9 };
	const cardRatio: number = cardSize.height / cardSize.width;

	let fieldCards: CardFieldZoneType = getDefaultCardFieldZone();

	function onDataReceived(data: CardFieldZoneType) {
		fieldCards = data;
	}

	let playersConnection = PlayersConnection<CardFieldZoneType>(onDataReceived);

	onMount(async () => {
		await playersConnection.createNewGame();
	});

	function updateOpponentFieldBoard() {
		playersConnection.sendData(fieldCards);
		console.log('update');
	}

	function onHideHand(): void {}
	function onHandReveal(): void {}
	function onCardReveal(card: PlayableCard): void {
		playersConnection.sendData(fieldCards);
	}
</script>

<div style="height: 100vh; width: 100vw; display: flex; justify-content: flex-end;">
	<GameInformation
		bind:playersConnection={$playersConnection}
		connectToCreatedGame={playersConnection.connectToCreatedGame}
		style="flex: 6;"
		bind:fieldCards
	/>
	{#if $playersConnection.isHost !== null}
		<GameZones
			{onHideHand}
			{onHandReveal}
			{onCardReveal}
			opponentGameCardState={{ faceUp: false, rotation: 0 }}
			onCardDraw={updateOpponentFieldBoard}
			onShuffleDeck={updateOpponentFieldBoard}
			onShuffleCard={updateOpponentFieldBoard}
			onCardChangingPosition={updateOpponentFieldBoard}
			onCardDrop={updateOpponentFieldBoard}
			opponentCardZonePlaceType={!$playersConnection.isHost
				? CardZonePlaceType.HostPlayer
				: CardZonePlaceType.InvitedPlayer}
			activePlayerCardZonePlaceType={$playersConnection.isHost
				? CardZonePlaceType.HostPlayer
				: CardZonePlaceType.InvitedPlayer}
			extraMonsterZonesLeftZoneIndex={$playersConnection.isHost ? 0 : 1}
			extraMonsterZonesRightZoneIndex={$playersConnection.isHost ? 1 : 0}
			aspectRatio={cardRatio}
			style="flex: 8;"
			bind:fieldCards
		/>
	{/if}
</div>
