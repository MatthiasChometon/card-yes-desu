<script lang="ts">
	import { onMount } from 'svelte';
	import type { CardFieldZoneType } from '../types/card-field-zone.type';
	import type { Peerjs } from '../types/peerjs.type';

	export let fieldCards: CardFieldZoneType;

	let peer: Peerjs['Peer']['prototype'];
	let connection: Peerjs['DataConnection']['prototype'] | null = null;
	let opponentPeerId: string;
	let playerPeerId: string | null = null;
	let isConnectedToOpponent: boolean = false;

	async function getNewPeer(): Promise<Peerjs['Peer']['prototype']> {
		const peerjs: Peerjs = await import('peerjs');
		return new peerjs.Peer();
	}

	function setNewDataFromOtherPlayer(newData: string): void {
		fieldCards = JSON.parse(String(newData));
	}

	function onNewDataFromOtherPlayer(setNewDataFromOtherPlayer: (newDate: string) => void): void {
		if (connection === null) return;

		connection.on('open', function () {
			isConnectedToOpponent = true;

			if (connection === null) return;
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
				onNewDataFromOtherPlayer(setNewDataFromOtherPlayer);
			});
		});
	}

	function connect(): void {
		connection = peer.connect(opponentPeerId);
		onNewDataFromOtherPlayer(setNewDataFromOtherPlayer);
	}

	onMount(async () => {
		await createNewGame();
	});

	$: {
		if (connection !== null && isConnectedToOpponent) {
			console.log(fieldCards);
			connection.send(JSON.stringify(fieldCards));
		}
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
