<script lang="ts">
	import type { PlayersConnectionType } from '../types/players-connection.type';

	export let playersConnection: PlayersConnectionType, connectToCreatedGame: () => void;
</script>

<div style="display: flex; flex-direction: column;">
	<p>Share my game: {playersConnection.playerPeerId}</p>
	<div style="display: flex;">
		<input type="text" bind:value={playersConnection.opponentPeerId} />
		<button on:click={connectToCreatedGame}>Connect</button>
	</div>
	<p>Connected with opponent: {playersConnection.isConnectedToOpponent ? 'yes' : 'no'}</p>
</div>
