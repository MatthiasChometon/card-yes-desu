<script lang="ts">
	import type { PlayersConnectionType } from '../types/players-connection.type';

	export let playersConnection: PlayersConnectionType, connectToCreatedGame: () => void, closeConnection: () => void;
</script>

<div style="display: flex; flex-direction: column;">
	<p>Share my game: {playersConnection.playerPeerId}</p>
	<div style="display: flex; flex-wrap: wrap;">
		<input type="text" bind:value={playersConnection.opponentPeerId} />
		<button on:click={connectToCreatedGame}>Connect</button>
		<button on:click={closeConnection}>Close connection</button>
	</div>
	<p>Connected with opponent: {playersConnection.isConnectedToOpponent ? 'yes' : 'no'}</p>

	{#if playersConnection.isHost !== null}
		<p>Host: {playersConnection.isHost ? 'you' : 'your opponent'}</p>
	{/if}
</div>
