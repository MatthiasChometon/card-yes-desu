<script lang="ts">
	import { onMount } from 'svelte';
	import type { Peerjs } from '../types/Peerjs.type';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';

	export let fieldCards: CardFieldZoneType;

	let peer: Peerjs['Peer']['prototype'];
	let connection: Peerjs['DataConnection']['prototype'];
	let opponentPeerId: string;
	let playerPeerId: string | null = null;
	let isConnectedToOpponent: boolean = false;

	async function getNewPeer(): Promise<Peerjs['Peer']['prototype']> {
		const peerjs: Peerjs = await import('peerjs');
		return new peerjs.Peer();
	}

	function setNewDataFromOtherPlayer(newData: string): void {
		isConnectedToOpponent = true;
		fieldCards = JSON.parse(String(newData));
	}

	function onNewDataFromOtherPlayer(
		connection: Peerjs['DataConnection']['prototype'],
		setNewDataFromOtherPlayer: (newDate: string) => void
	): void {
		connection.on('open', function () {
			connection.on('data', function (data: unknown) {
				setNewDataFromOtherPlayer(String(data));
			});
		});
	}

	async function createNewGame(): Promise<void> {
		peer = await getNewPeer();

		peer.on('open', function (id) {
			playerPeerId = id;

			peer.on('connection', function (conn) {
				connection = conn;
				onNewDataFromOtherPlayer(connection, setNewDataFromOtherPlayer);
			});
		});
	}

	onMount(async () => {
		await createNewGame();
	});

	function connect(): void {
		connection = peer.connect(opponentPeerId);
		onNewDataFromOtherPlayer(connection, setNewDataFromOtherPlayer);
	}
</script>

<div style="display: flex; flex-direction: column;">
	<p>Share my game: {playerPeerId}</p>
	<div style="display: flex;">
		<input type="text" bind:value={opponentPeerId} />
		<button on:click={connect}>Connect</button>
	</div>
	<p>Connected with opponent: {isConnectedToOpponent ? 'yes' : 'no'}</p>
</div>
