import { writable } from 'svelte/store';
import type { PlayersConnectionType } from '../types/players-connection.type';
import type Peer from 'peerjs';
import type { Peerjs } from '../types/peerjs.type';
import type { DataConnection } from 'peerjs';

export function PlayersConnection<T> (onDataReceived: (newData: T) => void) {
	const { subscribe, set, update } = writable<PlayersConnectionType>({
		peer: null,
		connection: null,
		opponentPeerId: null,
		playerPeerId: null,
		isConnectedToOpponent: false
	});

	async function getNewPeer (): Promise<Peer> {
		const peerjs: Peerjs = await import('peerjs');
		return new peerjs.Peer();
	}

	function parseReceivedData<T> (newData: unknown): T {
		console.log(JSON.parse(String(newData)));
		return JSON.parse(String(newData))
	}

	function openConnection (connection: DataConnection): void {
		connection.on('open', function () {
			update(state => ({ ...state, isConnectedToOpponent: true }));

			connection.on('data', function (data: unknown) {
				const parsedData: T = parseReceivedData(data);
				onDataReceived(parsedData);
			});
		});
	}

	async function openGame (peer: Peer): Promise<void> {
		peer = await getNewPeer();

		peer.on('open', function (playerPeerId: string) {
			update(state => ({ ...state, playerPeerId }));

			peer.on('connection', function (connection: DataConnection) {
				update(state => {
					openConnection(connection);
					return { ...state, connection }
				});
			});
		});
	}

	function connectToCreatedGame (): void {
		update(state => {
			const { peer, opponentPeerId } = state;
			if (opponentPeerId === null || peer === null) return state;
			const connection = peer.connect(opponentPeerId);
			openConnection(connection);
			return { ...state, connection }
		}
		);
	}

	return {
		subscribe,
		set,
		connectToCreatedGame: () => {
			connectToCreatedGame();
		},
		createNewGame: async () => {
			const peer = await getNewPeer();
			update(state => ({ ...state, peer }));
			openGame(peer);
		}
	};
};
