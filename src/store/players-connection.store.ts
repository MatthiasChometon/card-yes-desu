import { writable } from 'svelte/store';
import type { PlayersConnectionType } from '../types/players-connection.type';
import type Peer from 'peerjs';
import type { Peerjs } from '../types/peerjs.type';
import type { DataConnection } from 'peerjs';

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
		disconnectPlayers();
		const peerjs: Peerjs = await import('peerjs');
		return new peerjs.Peer();
	}

	function openConnection (connection: DataConnection): void {
		connection.on('open', function () {
			update(state => ({ ...state, isConnectedToOpponent: true }));

			connection.on('data', function (data: unknown) {
				console.log('Received', data);
				const { hasToDisconnectPlayers } = data as NewData<T>;
				if (hasToDisconnectPlayers) {
					disconnectPlayers();
					return
				}
				onDataReceived(data as T);
			});
		});
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
			const { connection } = state;
			if (connection === null) return state;
			connection.send({ hasToDisconnectPlayers: true });
			return defaultPlayersConnection
		})
	}

	function sendData (data: T): void {
		update(state => {
			const { connection } = state;
			if (connection === null) throw new Error("connection is null");
			const dataWithDisconnected = { ...data, hasToDisconnectPlayers: false };
			connection.send(dataWithDisconnected);
			return state;
		});
	}

	return {
		subscribe,
		set,
		connectToCreatedGame,
		createNewGame: async () => {
			const peer = await getNewPeer();
			update(state => ({ ...state, peer }));
			openGame(peer);
		},
		sendData: (data: T) => {
			sendData(data)
		}
	};
};