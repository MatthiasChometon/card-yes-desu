import { writable } from 'svelte/store';
import type { PlayersConnectionType } from '../types/players-connection.type';
import type { Peerjs } from '../types/peerjs.type';
import type { DataConnection } from 'peerjs';

export function PlayersConnection<T> (onDataReceived: (newData: T) => void, onOpenConnection: () => void) {
	const { subscribe, set, update } = writable<PlayersConnectionType>({
		peer: null,
		connection: null,
		opponentPeerId: 'toto',
		playerPeerId: null,
		isConnectedToOpponent: false,
		isHost: null
	});

	async function initializeConnection (): Promise<void> {
		const peerjs: Peerjs = await import('peerjs');
		const peer = new peerjs.Peer();
		update(state => ({ ...state, peer }));
	}

	function openConnection (connection: DataConnection): void {
		connection.on('open', function () {
			update(state => ({ ...state, isConnectedToOpponent: true }));
			onOpenConnection();

			connection.on('data', function (data: unknown) {
				console.log('Received', data);
				onDataReceived(data as T);
			});
		});
	}

	function createNewGame (): void {
		update(state => {
			const { peer } = state
			if (peer === null) throw new Error("peer is null")
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
			return state;
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

	function sendData (data: T): void {
		update(state => {
			const { connection } = state;
			if (connection === null) throw new Error("connection is null");
			connection.send(data);
			return state;
		});
	}

	return {
		subscribe,
		set,
		connectToCreatedGame,
		createNewGame,
		initializeConnection,
		sendData: (data: T) => {
			sendData(data)
		}
	};
};
