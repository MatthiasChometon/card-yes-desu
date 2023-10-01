import { get, writable } from 'svelte/store';
import type { PlayersConnectionType } from '../types/players-connection.type';
import type Peer from 'peerjs';
import type { Peerjs } from '../types/peerjs.type';
import type { DataConnection } from 'peerjs';
import { onMount } from 'svelte';

type NewData<T> = T & { hasToDisconnectPlayers: boolean }

export function PlayersConnection<T> (onDataReceived: (newData: T) => void) {
	const defaultPlayersConnection: PlayersConnectionType = {
		peer: null,
		connection: null,
		opponentPeerId: null,
		playerPeerId: null,
		isConnectedToOpponent: false,
		isHost: null
	}
	const playersConnection = writable<PlayersConnectionType>(defaultPlayersConnection);
	const { subscribe, set, update } = playersConnection

	async function getNewPeer (): Promise<Peer> {
		const peerjs: Peerjs = await import('peerjs');
		return new peerjs.Peer('toto');
	}

	function openConnection (connection: DataConnection): void {
		connection.on('open', function () {
			update(state => ({ ...state, isConnectedToOpponent: true }));

			connection.on('data', async function (data: unknown) {
				console.log('Received', data);
				const { hasToDisconnectPlayers } = data as NewData<T>;
				if (hasToDisconnectPlayers) {
					await createNewGame();
					return
				}
				onDataReceived(data as T);
			});
		});

		connection.on('close', () => { disconnectPlayers(); });
	}

	function openGame (peer: Peer): void {
		peer.on('open', function (playerPeerId: string) {
			update(state => ({ ...state, playerPeerId }));

			peer.on('connection', function (connection: DataConnection) {
				console.log('an opponent connected to your game')
				update(state => {
					openConnection(connection);
					return { ...state, connection, isHost: true }
				});
			});
		});
	}

	function connectToCreatedGame (): void {
		update(state => {
			const { peer, opponentPeerId } = state;
			if (opponentPeerId === null || peer === null) throw new Error("opponentPeerId or peer is null");
			const connection = peer.connect(opponentPeerId);
			console.log('connected to player game')
			openConnection(connection);
			return { ...state, connection, isHost: false }
		}
		);
	}

	function disconnectPlayers (): void {
		update(state => {
			const { connection, peer, playerPeerId } = state;
			if (connection !== null) connection.close();
			return { ...defaultPlayersConnection, peer, playerPeerId }
		})
	}

	function sendData (data: T): void {
		update(state => {
			const { connection } = state;
			if (connection === null) throw new Error("connection is null");
			connection.send(data);
			return state;
		});
	}

	async function createNewGame (): Promise<void> {
		disconnectPlayers();
		const { peer } = get(playersConnection)
		if (peer === null) throw new Error("peer is null")
		openGame(peer);
	}

	onMount(async () => {
		const peer = await getNewPeer();
		update(state => ({ ...state, peer }));
		openGame(peer);
	});

	return {
		subscribe,
		set,
		connectToCreatedGame,
		createNewGame,
		sendData
	};
};